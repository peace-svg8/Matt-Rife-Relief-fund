const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const paypal = require('@paypal/checkout-server-sdk');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

// Stripe webhook must use raw body to verify security signatures
app.post('/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Note: The real endpoint secret comes from Stripe Dashboard when adding a webhook endpoint
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the successful payment intent!
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      // Securely log the successful donation to Firestore Database!
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

  res.json({received: true});
});

// Use standard JSON parsing for all other normal endpoints
app.use(express.json());

// Setup PayPal Environment
function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID || 'sb-dummy-client-id';
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'sb-dummy-secret';
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

// 1. Stripe Payment Intent Endpoint
app.post('/create-stripe-payment-intent', async (req, res) => {
  try {
    const { amount, projectId, paymentMethodType } = req.body;
    
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amounts in cents
      currency: 'usd',
      // For Apple Pay/Google Pay and standard cards
      payment_method_types: paymentMethodType ? [paymentMethodType] : ['card'],
      metadata: { projectId: projectId || 'general' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. PayPal Create Order Endpoint
app.post('/create-paypal-order', async (req, res) => {
  try {
    const { amount, projectId } = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        },
        custom_id: projectId || 'general'
      }]
    });

    const order = await client().execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    console.error('PayPal Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. PayPal Capture Order Endpoint
app.post('/capture-paypal-order', async (req, res) => {
  try {
    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);
    res.json(capture.result);
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    res.status(500).json({ error: error.message });
  }
});

exports.api = functions.https.onRequest(app);
