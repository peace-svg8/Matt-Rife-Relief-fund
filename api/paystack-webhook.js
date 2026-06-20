import admin from './_firebase.js';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Unauthorized');
  }

  const event = req.body;
  console.log("Paystack Webhook payload received:", event);

  if (event.event === 'charge.success') {
    try {
      const db = admin.firestore();
      await db.collection('donations').add({
        amount: event.data.amount / 100, // Convert back from cents
        currency: event.data.currency,
        projectId: event.data.metadata ? event.data.metadata.projectId : 'general',
        status: 'succeeded',
        transactionId: event.data.reference,
        customerName: event.data.metadata ? event.data.metadata.name : '',
        customerEmail: event.data.customer.email,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('✅ Securely saved Paystack donation to Firestore!');
    } catch (dbError) {
      console.error('Error saving to Firestore:', dbError);
    }
  }

  res.status(200).send('Webhook received successfully');
}
