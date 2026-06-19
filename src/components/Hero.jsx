import React, { useState } from 'react';
import { Heart, Backpack, Users, Globe2, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-shapes">
        <div className="hero-bg-image"></div>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="container hero-grid">
        {/* Left Side: Text Content */}
        <div className="hero-text">
          <div className="section-badge light-badge slide-in">
            <Heart size={14} fill="var(--pink)" color="var(--pink)" />
            Matt Rife Relief Fund
          </div>

          <h1 className="hero-title slide-in-delay-1">
            Hope <br />
            <span className="text-pink flex-inline items-center gap-2">
              Starts Here <Sparkles size={40} />
            </span>
          </h1>

          <p className="hero-desc slide-in-delay-2">
            We are dedicated to providing humanitarian assistance, education, and shelter to children and families affected by conflict worldwide. Every contribution builds a better tomorrow.
          </p>

          <div className="hero-btns slide-in-delay-3">
            <a href="#donate" className="btn btn-pink btn-lg hero-btn-main">
              Donate Now →
            </a>
            <a href="#mission" className="btn btn-outline-pink btn-lg">
              Our Mission
            </a>
          </div>

          <div className="hero-stats-row slide-in-delay-4">
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

        {/* Right Side: Image Mosaic */}
        <div className="hero-visual">
          <div className="mosaic-grid">
            {/* Main large image */}
            <div className="mosaic-item mosaic-item-large pop-in">
              <img src="/hero-child.webp" alt="Child we are helping" />
              <div className="mosaic-overlay"></div>
            </div>

            {/* Top right smaller image */}
            <div className="mosaic-item mosaic-item-small pop-in-delay-1">
              <img src="/campaign-food.webp" alt="Providing food" />
            </div>

            {/* Bottom right smaller image */}
            <div className="mosaic-item mosaic-item-medium pop-in-delay-2">
              <img src="/campaign-education.webp" alt="Education initiatives" />
              <div className="hero-float-card float-anim">
                <span className="float-icon-bg">
                  <Backpack size={18} color="var(--pink)" />
                </span>
                <div className="float-card-text">
                  <strong>5,000+</strong>
                  <span>In School</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
