import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

const PaystackCheckout = ({ amount, projectId, onBack }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const config = {
    reference: `tx-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    email: email,
    amount: amount * 100, // Paystack amounts are in kobo/cents
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_dummy',
    currency: 'USD',
    metadata: {
      name,
      projectId: projectId || 'general'
    }
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    // Redirect to success URL to trigger the App.jsx success popup
    window.location.href = window.location.origin + '/?payment_status=success';
  };

  const onClose = () => {
    // Modal closed
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Please enter your name and email to continue.");
      return;
    }
    setError(null);
    initializePayment(onSuccess, onClose);
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
      <h4 style={{ marginBottom: '1rem' }}>Donor Details</h4>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="John Doe"
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="john@example.com"
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={onBack} className="btn btn-outline-pink" style={{ flex: 1 }}>
            Cancel
          </button>
          <button type="submit" className="btn btn-pink" style={{ flex: 2 }}>
            Pay ${amount.toLocaleString()}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaystackCheckout;
