import admin from './_firebase.js';

// Disable Vercel's default body parser so we can get the raw buffer if needed, 
// but Flutterwave just requires the JSON body and a secret hash header.
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Flutterwave webhook signature verification
  const secretHash = process.env.FLW_SECRET_HASH;
  const signature = req.headers['verif-hash'];

  if (!signature || (signature !== secretHash)) {
    // This request isn't from Flutterwave; discard
    return res.status(401).send('Unauthorized');
  }

  // Handle the event
  const payload = req.body;
  console.log("Webhook payload received:", payload);

  // Check if it's a successful transaction
  if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
    try {
      const db = admin.firestore();
      await db.collection('donations').add({
        amount: payload.data.amount,
        currency: payload.data.currency,
        projectId: payload.data.meta ? payload.data.meta.projectId : 'general',
        status: 'succeeded',
        transactionId: payload.data.id,
        customerName: payload.data.customer.name,
        customerEmail: payload.data.customer.email,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('✅ Securely saved Flutterwave donation to Firestore!');
    } catch (dbError) {
      console.error('Error saving to Firestore:', dbError);
    }
  }

  res.status(200).send('Webhook received successfully');
}
