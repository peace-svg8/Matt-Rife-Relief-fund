import React from 'react';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';
import './Volunteer.css';

const Volunteer = () => {
  return (
    <section id="volunteer" className="volunteer-section">
      <div className="container volunteer-inner">
        <div className="volunteer-content">
          <div className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}><HeartHandshake size={14} style={{ display: 'inline', marginRight: '4px' }} /> Volunteer With Us</div>
          <h2>Join Our Community and Be Part of Something Bigger</h2>
          <p>
            Whether you can give your time, skills, or voice — every volunteer makes a difference. Help us reach more children and families in need around the world.
          </p>
          <div className="volunteer-perks">
            <div className="perk"><CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Flexible remote &amp; on-ground roles</div>
            <div className="perk"><CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Make real, measurable impact</div>
            <div className="perk"><CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Join a global community of changemakers</div>
          </div>
          <a href="#contact" className="btn btn-white btn-lg">Become a Volunteer →</a>
        </div>
        <div className="volunteer-counter">
          <div className="counter-big">120,597+</div>
          <span>People Already Joined</span>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
