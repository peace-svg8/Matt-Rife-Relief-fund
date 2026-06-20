import React from 'react';
import { Quote } from 'lucide-react';
import './FounderSpotlight.css';

const FounderSpotlight = () => {
  return (
    <section className="founder-section section-padding">
      <div className="container">
        <div className="founder-grid">
          {/* Portrait Side */}
          <div className="founder-image-wrap reveal-on-scroll">
            <div className="founder-image-frame">
              <img
                src="/matt-portrait.webp"
                alt="Matt Rife — Founder of the Relief Fund"
                className="founder-img"
                loading="lazy"
              />
            </div>
            <div className="founder-accent-shape"></div>
          </div>

          {/* Text Side */}
          <div className="founder-text">
            <div className="section-badge">
              <Quote size={14} /> Meet The Founder
            </div>
            <h2 className="section-title">Matt Rife</h2>
            <p className="founder-role">Founder & Humanitarian</p>

            <blockquote className="founder-quote">
              "I've seen firsthand the impact that even the smallest act of kindness can have on someone's life. This fund exists because every person deserves dignity, safety, and a chance to rebuild. We're not just raising money — we're showing up, getting our hands dirty, and standing beside the people who need it most."
            </blockquote>

            <div className="founder-signature">
              <div className="signature-line"></div>
              <span>Matt Rife</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
