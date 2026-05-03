require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Stripe Webhook MUST use raw body parser
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Standard Middleware
app.use(cors());
app.use(express.json());

// --- Setup Multer for File Uploads (Bank Receipts) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure an 'uploads' folder exists in your backend directory!
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// --- 1. Updated MongoDB Schema ---
const RegistrationSchema = new mongoose.Schema({
  // Personal Details
  fullName: { type: String, required: true },
  nameWithInitials: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  country: { type: String, required: true },
  
  // Research Details
  researchTitle: { type: String, required: true },
  articleNumber: { type: String, required: true },
  researchTrack: { type: String, required: true },
  category: { type: String, required: true },
  
  // Pricing
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  
  // Payment tracking
  paymentMethod: { type: String, enum: ['online', 'bank_transfer'], required: true },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed', 'under_review'] },
  
  // Specific to Stripe Online Payments
  stripeSessionId: { type: String },
  
  // Specific to Bank Transfers
  receiptFileUrl: { type: String }, 
  
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// ==========================================
// ROUTE 1: Handle Bank Transfer Registration
// ==========================================
app.post('/api/register-bank', upload.single('receipt'), async (req, res) => {
  try {
    // Destructure all fields sent via FormData from the frontend
    const { 
      fullName, nameWithInitials, email, contactNumber, country, 
      researchTitle, articleNumber, researchTrack, category, amount, currency 
    } = req.body;
    
    // Ensure file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Receipt file is required for bank transfer." });
    }

    // Save to Database
    const newRegistration = new Registration({
      fullName,
      nameWithInitials,
      email,
      contactNumber,
      country,
      researchTitle,
      articleNumber,
      researchTrack,
      category,
      amount,
      currency,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'under_review', // Needs manual verification by conference staff
      receiptFileUrl: req.file.path
    });

    await newRegistration.save();
    res.status(200).json({ message: "Registration successful. Receipt is under review." });

  } catch (error) {
    console.error("Bank Transfer Registration Error:", error);
    res.status(500).json({ error: "Failed to submit bank registration." });
  }
});


// ==========================================
// ROUTE 2: Handle Online Payment (Stripe)
// ==========================================
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    // Destructure all fields sent via JSON from the frontend
    const { 
      fullName, nameWithInitials, email, contactNumber, country, 
      researchTitle, articleNumber, researchTrack, category, amount, currency 
    } = req.body;

    // Save pending registration to database first
    const newRegistration = new Registration({ 
      fullName, nameWithInitials, email, contactNumber, country, 
      researchTitle, articleNumber, researchTrack, category, amount, currency,
      paymentMethod: 'online',
      paymentStatus: 'pending'
    });
    
    await newRegistration.save();

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      client_reference_id: newRegistration._id.toString(), // Link Stripe event to MongoDB document
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `IMPETUS 2026 - ${category}`,
              description: `Article #${articleNumber}: ${researchTitle}`,
            },
            unit_amount: amount * 100, // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/registration`,
    });

    // Update DB with the Stripe session ID
    newRegistration.stripeSessionId = session.id;
    await newRegistration.save();

    // Send Stripe hosted URL back to frontend for redirection
    res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// ==========================================
// ROUTE 3: Stripe Webhook (Auto-updates DB)
// ==========================================
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify the event is securely coming from Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      // Find the pending user in DB by the ID we passed earlier and mark as paid
      await Registration.findByIdAndUpdate(session.client_reference_id, {
        paymentStatus: 'paid'
      });
      console.log(`✅ Online payment confirmed and updated for database ID: ${session.client_reference_id}`);
    } catch (dbError) {
      console.error("Database update failed during webhook processing", dbError);
    }
  }

  res.json({ received: true });
}

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));