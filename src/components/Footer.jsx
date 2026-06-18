import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo" style={{ fontSize: '1.2rem' }}>Matt Rife Relief <span>Fund</span></a>
            <p>Matt Rife Relief Fund for Orphaned Children and War-Affected — dedicated to providing humanitarian assistance to orphaned children and war-affected communities worldwide.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#mission">About</a>
            <a href="#campaigns">Campaigns</a>
            <a href="#projects">Projects</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#donate">Donate</a>
            <a href="#volunteer">Volunteer</a>
            <a href="#impact">Impact Report</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Matt Rife Relief Fund for Orphaned Children and War-Affected. All rights reserved.</p>
          <a href="#donate" className="btn btn-pink">Donate Now ❤</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
