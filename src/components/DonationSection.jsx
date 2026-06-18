import React, { useState } from 'react';
import { BookOpen, Utensils, Home, HeartPulse, Construction, Globe2, Gift, PartyPopper, Heart, CheckCircle2, CreditCard } from 'lucide-react';
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
              className={`payment-option ${paymentMethod === 'cashapp' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cashapp')}
            >
              <span className="pay-logo cashapp-logo"><span>$</span> Cash App</span>
            </div>
            <div
              className={`payment-option ${paymentMethod === 'giftcard' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('giftcard')}
            >
              <span className="pay-logo giftcard-logo"><Gift size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Gift Card</span>
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
            className="btn btn-pink btn-lg donate-final-btn"
            disabled={selectedTier === null}
          >
            {selectedTier !== null
              ? `Donate $${donationTiers[selectedTier].amount.toLocaleString()} Now `
              : 'Select an Amount Above'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
