import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);
import admin from './_firebase.js';

// Disable Vercel's default body parser so we can get the raw buffer for Stripe security verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the successful payment intent!
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      const db = admin.firestore();
      await db.collection('donations').add({
        amount: paymentIntent.amount / 100, // convert back to dollars
        currency: paymentIntent.currency,
        projectId: paymentIntent.metadata ? paymentIntent.metadata.projectId : 'general',
        status: 'succeeded',
        paymentIntentId: paymentIntent.id,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('✅ Securely saved donation to Firestore!');
    } catch (dbError) {
      console.error('Error saving to Firestore:', dbError);
    }
  }

  res.status(200).json({received: true});
}
