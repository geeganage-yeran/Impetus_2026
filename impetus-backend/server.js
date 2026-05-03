require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { AzureOpenAI } = require("openai"); // <-- Added OpenAI

const app = express();

// Stripe Webhook MUST use raw body parser
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Standard Middleware
app.use(cors());
app.use(express.json());

// --- Initialize Azure OpenAI Client ---
const aiClient = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey: process.env.AZURE_OPENAI_KEY,
  apiVersion: "2024-05-01-preview",
});

// --- Setup Multer for File Uploads (Bank Receipts) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure an 'uploads' folder exists!
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// --- 1. Updated MongoDB Schema ---
const RegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  nameWithInitials: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  country: { type: String, required: true },
  researchTitle: { type: String, required: true },
  articleNumber: { type: String, required: true },
  researchTrack: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  paymentMethod: { type: String, enum: ['online', 'bank_transfer'], required: true },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed', 'under_review'] },
  stripeSessionId: { type: String },
  receiptFileUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// ==========================================
// ROUTE 1: Handle Bank Transfer Registration
// ==========================================
app.post('/api/register-bank', upload.single('receipt'), async (req, res) => {
  try {
    const {
      fullName, nameWithInitials, email, contactNumber, country,
      researchTitle, articleNumber, researchTrack, category, amount, currency
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Receipt file is required for bank transfer." });
    }

    const newRegistration = new Registration({
      fullName, nameWithInitials, email, contactNumber, country,
      researchTitle, articleNumber, researchTrack, category, amount, currency,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'under_review',
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
    const {
      fullName, nameWithInitials, email, contactNumber, country,
      researchTitle, articleNumber, researchTrack, category, amount, currency
    } = req.body;

    const newRegistration = new Registration({
      fullName, nameWithInitials, email, contactNumber, country,
      researchTitle, articleNumber, researchTrack, category, amount, currency,
      paymentMethod: 'online',
      paymentStatus: 'pending'
    });

    await newRegistration.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      client_reference_id: newRegistration._id.toString(),
      line_items: [{
        price_data: {
          currency: currency,
          product_data: {
            name: `IMPETUS 2026 - ${category}`,
            description: `Article #${articleNumber}: ${researchTitle}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/registration`,
    });

    newRegistration.stripeSessionId = session.id;
    await newRegistration.save();
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
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
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


// ==========================================
// ROUTE 4: Azure AI Chatbot (IMPETUS Support)
// ==========================================
app.post('/api/chat', async (req, res) => {
  const { userId, userQuery } = req.body;

  try {
    // 1. Create Embedding for User Query
    const embeddingResponse = await aiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: userQuery
    });
    const queryVector = embeddingResponse.data[0].embedding;

    // 2. Vector Search using the existing Mongoose DB connection
    // 2. Vector Search using the existing Mongoose DB connection
    const db = mongoose.connection.db;
    const documents = await db.collection("knowledge_base").aggregate([
      {
        "$vectorSearch": {
          "index": "vector_index",
          "path": "embedding",
          "queryVector": queryVector,
          "numCandidates": 10,
          "limit": 5 // Increased limit to 5 so it can grab more context!
        }
      }
    ]).toArray();

    // --- UPDATED LOGIC HERE ---
    // Convert the found documents back into readable JSON strings for the AI
    const contextText = documents.length > 0
      ? documents.map(doc => {
        const { _id, embedding, ...usefulData } = doc;
        return JSON.stringify(usefulData);
      }).join("\n\n")
      : "No additional context found.";

    // 3. Get Chat Response from Azure
    const completion = await aiClient.chat.completions.create({
      model: "my-chatbot-model",
      messages: [
        {
          role: "system",
          content: `You are the official, highly helpful, and friendly support chatbot for IMPETUS 2026, the IEEE Research Symposium of Uva Wellassa University.
          
          Guidelines for your responses:
          1. Be warm, enthusiastic, and welcoming.
          2. Use relevant emojis naturally (e.g., 🎓, 📅, 💻, ✨) to make the chat engaging.
          3. Use Markdown formatting (bullet points, **bold text**) to make information easy to read and scannable.
          4. Keep answers concise, clear, and professional.
          5. Answer strictly using the provided context. If asked something outside the context, politely reply: "I only have information regarding the IMPETUS 2026 symposium. For other inquiries, please email us at impetus@uwu.ac.lk! 📧"
          
          Context: ${contextText}`
        },
        { role: "user", content: userQuery }
      ],
      temperature: 0.2 // Slightly increased to allow a more natural, friendly tone
    });

    const reply = completion.choices[0].message.content;

    // 4. Save Chat to History
    await db.collection("chat_history").insertOne({
      userId: userId || "anonymous",
      userQuery,
      reply,
      timestamp: new Date()
    });

    res.json({ success: true, reply });

  } catch (error) {
    console.error("Chatbot Server Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      code: error.code
    });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




