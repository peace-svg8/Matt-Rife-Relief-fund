import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = ({ amount, projectId, onBack }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async (data, actions) => {
    // Fetch from the secure Vercel backend to create an order:
    const backendUrl = '/api/create-paypal-order';
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, projectId })
    });
    const orderData = await response.json();
    return orderData.id;
  };

  const onApprove = async (data, actions) => {
    // Fetch from the secure Vercel backend to capture the order:
    const backendUrl = '/api/capture-paypal-order';
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID })
    });
    const captureData = await response.json();
    
    // Check if the capture was successful
    if (captureData.status === 'COMPLETED') {
      alert(`Transaction completed securely via backend by ${captureData.payer.name.given_name}`);
      window.location.href = '/?payment_status=success';
    } else {
      setErrorMessage('Payment could not be captured.');
    }
  };

  const onError = (err) => {
    setErrorMessage("PayPal is currently unavailable or missing a valid Client ID.");
    console.error("PayPal Checkout onError", err);
  };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <PayPalScriptProvider options={initialOptions}>
        {errorMessage && <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</div>}
        <PayPalButtons 
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={{ layout: "vertical", shape: "rect", color: "gold" }}
        />
      </PayPalScriptProvider>
      <button onClick={onBack} className="btn btn-outline-pink" style={{ marginTop: '1rem', width: '100%' }}>
        Cancel
      </button>
    </div>
  );
};

export default PayPalCheckout;
