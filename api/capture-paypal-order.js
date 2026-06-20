import paypal from '@paypal/checkout-server-sdk';

function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID || 'sb-dummy-client-id';
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'sb-dummy-secret';
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);
    res.status(200).json(capture.result);
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    res.status(500).json({ error: error.message });
  }
}
