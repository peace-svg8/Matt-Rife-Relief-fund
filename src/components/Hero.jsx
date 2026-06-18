import React, { useState } from 'react';
import { Heart, Backpack } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <div className="section-badge light-badge"><Heart size={14} fill="currentColor" /> Matt Rife Relief Fund</div>
          <h1 className="hero-classic-title">
            Fund<br />
            <span className="text-pink">for</span><br />
            Others
          </h1>
          <p className="hero-desc">
            Providing humanitarian assistance, education, shelter, healthcare, and emotional support to orphaned children and families affected by conflict worldwide.
          </p>
          <div className="hero-btns">
            <a href="#donate" className="btn btn-pink btn-lg">Donate Now →</a>
            <a href="#mission" className="btn btn-outline-pink btn-lg">Our Mission</a>
          </div>
          <div className="hero-stats-mini">
            <div className="hero-stat">
              <strong>120K+</strong>
              <span>People Reached</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <strong>45+</strong>
              <span>Countries</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <strong>98%</strong>
              <span>Goes to Aid</span>
            </div>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-image-frame">
            <img src="/hero-child.png" alt="Child we are helping" className="hero-img" />
          </div>
          <div className="hero-float-card">
            <span className="float-icon"><Backpack size={20} color="var(--pink)" /></span>
            <div>
              <strong>5,000+</strong>
              <span>Children in School</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
