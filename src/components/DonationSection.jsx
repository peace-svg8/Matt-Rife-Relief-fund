import React, { useState } from 'react';
import { BookOpen, Utensils, Home, HeartPulse, Construction, Globe2, PartyPopper, Heart, CheckCircle2, CreditCard, Smartphone, X } from 'lucide-react';
import PaystackCheckout from './PaystackCheckout';
import PayPalCheckout from './PayPalCheckout';
import './Donation.css';

const donationTiers = [
  { amount: 1500, impact: 'School supplies and educational support for children', icon: <BookOpen size={32} color="var(--pink)" /> },
  { amount: 3000, impact: 'Food and nutrition assistance for vulnerable families', icon: <Utensils size={32} color="var(--pink)" /> },
  { amount: 5000, impact: 'Emergency shelter and relief materials', icon: <Home size={32} color="var(--pink)" /> },
  { amount: 7500, impact: 'Medical assistance and healthcare support', icon: <HeartPulse size={32} color="var(--pink)" /> },
  { amount: 10000, impact: 'Community rebuilding and educational programs', icon: <Construction size={32} color="var(--pink)" /> },
  { amount: 15000, impact: 'Major humanitarian and long-term recovery projects', icon: <Globe2 size={32} color="var(--pink)" /> },
];

const DonationSection = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [fundedProject, setFundedProject] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState(false);

  React.useEffect(() => {
    const handleFund = (e) => {
      setFundedProject(e.detail);
    };
    window.addEventListener('fundProject', handleFund);
    return () => window.removeEventListener('fundProject', handleFund);
  }, []);

  const goal = 500000;
  const raised = 325000;
  const pct = Math.min((raised / goal) * 100, 100);

  return (
    <section id="donate" className="section-padding donate-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge"><Heart size={14} fill="currentColor" /> Make a Donation</div>
          <h2 className="section-title">What Your Donation Supports</h2>
          <p className="section-subtitle">Each amount directly funds a specific area of impact. Choose how you'd like to help.</p>
        </div>

        {fundedProject && (
          <div className="funded-project-banner" style={{ background: 'rgba(233, 30, 99, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: 'var(--pink)', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Directly Funding:</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{fundedProject.title}</span>
            </div>
            <button onClick={() => setFundedProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="donate-progress-wrap">
          <div className="donate-progress-stats">
            <span className="raised-amount">${raised.toLocaleString()} <small>raised</small></span>
            <span className="goal-amount">Goal: ${goal.toLocaleString()}</span>
          </div>
          <div className="progress-bar" style={{ height: '12px' }}>
            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <p className="donate-donors-text"><PartyPopper size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} color="var(--pink)" /> Join <strong>2,450+</strong> generous donors who have already contributed</p>
        </div>

        {!checkoutMode ? (
          <>
            {/* Tiers */}
            <div className="tiers-grid">
              {donationTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`tier-card ${selectedTier === i ? 'selected' : ''}`}
                  onClick={() => setSelectedTier(i)}
                >
                  <div className="tier-icon">{tier.icon}</div>
                  <h3 className="tier-amount">${tier.amount.toLocaleString()}</h3>
                  <p className="tier-impact">{tier.impact}</p>
                  <div className="tier-check">{selectedTier === i ? <CheckCircle2 size={24} /> : ''}</div>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div className="payment-section-wrap">
              <h3 className="payment-title">Choose Payment Method</h3>
              <div className="payment-options">
                <div
                  className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <span className="pay-logo paypal-logo">Pay<span>Pal</span></span>
                </div>
                <div
                  className={`payment-option ${paymentMethod === 'wallet' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <span className="pay-logo giftcard-logo"><Smartphone size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Apple / Google Pay</span>
                </div>
                <div
                  className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span className="pay-logo card-logo"><CreditCard size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Visa / Mastercard</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-pink btn-lg donate-final-btn"
                disabled={selectedTier === null || paymentMethod === null}
                onClick={() => {
                  setCheckoutMode(true);
                  // On mobile, the UI changes size which can pull the footer up.
                  // Smoothly scroll to the top of the donation section to prevent jumping to contact/footer!
                  setTimeout(() => {
                    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
              >
                {selectedTier !== null && paymentMethod !== null
                  ? `Donate $${donationTiers[selectedTier].amount.toLocaleString()} Now `
                  : 'Select Amount & Payment Method'}
              </button>
            </div>
          </>
        ) : (
          <div className="checkout-container" style={{ background: '#fff', padding: '3rem', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Complete Your Donation</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              You are donating <strong>${donationTiers[selectedTier].amount.toLocaleString()}</strong> via <strong>{paymentMethod.toUpperCase()}</strong>.
            </p>
            
            <div style={{ padding: '2rem', border: '2px dashed var(--pink-light)', borderRadius: '8px', marginBottom: '2rem', background: 'var(--bg-light)' }}>
              {paymentMethod === 'paypal' ? (
                <PayPalCheckout 
                  amount={donationTiers[selectedTier].amount} 
                  projectId={fundedProject ? fundedProject.title : 'general'} 
                  onBack={() => setCheckoutMode(false)}
                />
              ) : (
                <PaystackCheckout 
                  amount={donationTiers[selectedTier].amount} 
                  projectId={fundedProject ? fundedProject.title : 'general'} 
                  onBack={() => setCheckoutMode(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationSection;
