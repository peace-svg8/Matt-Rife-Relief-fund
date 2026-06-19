import React from 'react';
import { Heart, Users } from 'lucide-react';
import './Campaigns.css';

const campaigns = [
  {
    image: '/campaign-education.webp',
    title: 'Help Children Access Education',
    description: 'School supplies and educational support for children in war-affected regions.',
    raised: 12500,
    goal: 25000,
    donors: 184,
  },
  {
    image: '/campaign-food.webp',
    title: 'Food & Nutrition for Families',
    description: 'Food and nutrition assistance for vulnerable families displaced by conflict.',
    raised: 18000,
    goal: 30000,
    donors: 256,
  },
  {
    image: '/campaign-shelter.webp',
    title: 'Emergency Shelter & Relief',
    description: 'Providing emergency shelter and relief materials to displaced communities.',
    raised: 9800,
    goal: 20000,
    donors: 132,
  },
];

const Campaigns = () => {
  return (
    <section id="campaigns" className="section-padding campaigns-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge"><Heart size={14} fill="currentColor" /> Active Campaigns</div>
          <h2 className="section-title">Introduce Our Campaign</h2>
          <p className="section-subtitle">Support these critical initiatives and make a difference in the lives of children and families.</p>
        </div>

        <div className="campaigns-grid">
          {campaigns.map((c, i) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <div key={i} className="card campaign-card">
                <div className="campaign-img-wrap">
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <div className="campaign-tag">Active</div>
                </div>
                <div className="campaign-body">
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="campaign-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="campaign-progress-info">
                      <span><strong>${c.raised.toLocaleString()}</strong> raised</span>
                      <span className="campaign-goal">${c.goal.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="campaign-footer">
                    <span className="campaign-donors"><Users size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {c.donors} donors</span>
                    <a href="#donate" className="btn btn-pink">Donate →</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center" style={{ marginTop: '2.5rem' }}>
          <a href="#donate" className="btn btn-outline-pink">View All Campaigns →</a>
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
