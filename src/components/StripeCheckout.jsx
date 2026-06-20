import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe with the publishable key. 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Tk4NnIIR1gFFUQjrqfTuZm2j4JmaIgRCN7bVAfx9V35e2SUtVt5nSCpT4JrHowPMiTSY8iI3r1B7GEuw6CgtYjN00WZLz7AFk');

const CheckoutForm = ({ amount, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Required for Stripe React Elements before confirming
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setIsProcessing(false);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/?payment_status=success',
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Stripe confirm error:", err);
      setErrorMessage(err.message || 'An unexpected error occurred during payment.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <PaymentElement />
      {errorMessage && <div style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</div>}
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="button" onClick={onBack} className="btn btn-outline-pink" style={{ flex: 1 }} disabled={isProcessing}>
          Cancel
        </button>
        <button type="submit" className="btn btn-pink" style={{ flex: 2 }} disabled={!stripe || isProcessing}>
          {isProcessing ? 'Processing...' : `Pay $${amount.toLocaleString()}`}
        </button>
      </div>
    </form>
  );
};

const StripeCheckout = ({ amount, projectId, paymentMethodType, onBack }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // We are restoring the secure backend connection!
    // Using Vercel Serverless Functions, the API lives right alongside our frontend!
    const backendUrl = '/api/create-stripe-payment-intent';
    
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, projectId, paymentMethodType })
        });
        const data = await response.json();
        if(data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch(err) {
        console.error("Could not reach secure backend.", err);
      }
    };
    
    fetchClientSecret();
  }, [amount, projectId, paymentMethodType]);

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  if (!clientSecret) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--pink)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Securely connecting to Server...</p>
        <button onClick={onBack} className="btn btn-outline-pink" style={{ marginTop: '1rem' }}>Cancel</button>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} onBack={onBack} />
    </Elements>
  );
};

export default StripeCheckout;
