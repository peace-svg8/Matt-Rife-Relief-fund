import React from 'react';
import { BookOpen, HeartPulse, Home, Utensils, Heart } from 'lucide-react';
import './AboutMission.css';

const AboutMission = () => {
  return (
    <section id="mission" className="section-padding about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-badge"><Heart size={14} fill="currentColor" /> Our Mission</div>
            <h2 className="section-title">Bringing Hope to Those Who Need It Most</h2>
            <p className="about-text">
              The Matt Rife Relief Fund is dedicated to providing humanitarian assistance, education, shelter, healthcare, and emotional support to orphaned children and families affected by conflict and humanitarian crises worldwide.
            </p>
            <p className="about-text">
              Every contribution helps provide hope, safety, education, and essential resources to orphaned children and communities rebuilding after conflict. Your generosity helps create opportunities for a brighter future.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="feature-icon"><BookOpen size={28} color="var(--pink)" /></div>
                <div>
                  <h4>Education</h4>
                  <p>School supplies and learning opportunities</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-icon"><HeartPulse size={28} color="var(--pink)" /></div>
                <div>
                  <h4>Healthcare</h4>
                  <p>Medical assistance and wellness support</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-icon"><Home size={28} color="var(--pink)" /></div>
                <div>
                  <h4>Shelter</h4>
                  <p>Emergency shelter and relief materials</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-icon"><Utensils size={28} color="var(--pink)" /></div>
                <div>
                  <h4>Nutrition</h4>
                  <p>Food assistance for vulnerable families</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-image-stack">
              <img src="/happy-children.webp" alt="Happy children reaching out with joy" className="about-img-main" loading="lazy" />
              <img src="/relief-work-new.webp" alt="Volunteers doing relief work" className="about-img-overlay" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
