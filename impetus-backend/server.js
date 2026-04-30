require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Webhook must be raw body
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Standard Middleware
app.use(cors());
app.use(express.json());

// --- Setup Multer for File Uploads (Bank Receipts) ---
// This will save uploaded receipts to an 'uploads' folder on the server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your backend root!
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// --- MongoDB Schema ---
const RegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String },
  
  // Payment tracking
  paymentMethod: { type: String, enum: ['online', 'bank_transfer'], required: true },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed', 'under_review'] },
  
  // Specific to Stripe
  stripeSessionId: { type: String },
  
  // Specific to Bank Transfer
  receiptFileUrl: { type: String }, 
  
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));


// ==========================================
// ROUTE 1: Handle Bank Transfer Registration
// ==========================================
// We use upload.single('receipt') to catch the file named 'receipt' from the frontend
app.post('/api/register-bank', upload.single('receipt'), async (req, res) => {
  try {
    const { fullName, email, phone, category, amount, currency } = req.body;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Receipt file is required for bank transfer." });
    }

    const newRegistration = new Registration({
      fullName,
      email,
      phone,
      category,
      amount,
      currency,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'under_review', // Needs manual admin check
      receiptFileUrl: req.file.path // Save the path to the uploaded file
    });

    await newRegistration.save();
    res.status(200).json({ message: "Registration successful. Receipt is under review." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit bank registration." });
  }
});


// ==========================================
// ROUTE 2: Handle Online Payment (Stripe)
// ==========================================
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { fullName, email, phone, category, amount, currency } = req.body;

    // Save pending registration
    const newRegistration = new Registration({ 
      fullName, email, phone, category, amount, currency, 
      paymentMethod: 'online',
      paymentStatus: 'pending'
    });
    await newRegistration.save();

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      client_reference_id: newRegistration._id.toString(),
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `IMPETUS 2026 - ${category}`,
              description: `Registration for ${fullName} (${phone})`,
            },
            unit_amount: amount * 100, // cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/registration`,
    });

    // Update with session ID
    newRegistration.stripeSessionId = session.id;
    await newRegistration.save();

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
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
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      await Registration.findByIdAndUpdate(session.client_reference_id, {
        paymentStatus: 'paid'
      });
      console.log(`Online payment successful for: ${session.client_reference_id}`);
    } catch (dbError) {
      console.error("Database update failed", dbError);
    }
  }

  res.json({ received: true });
}

const PORT = process.env.PORT || 5000;
// Make sure to create the 'uploads' folder before starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));