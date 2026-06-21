import React, { useState } from 'react';
import { Mailbox, Mail, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mattriferelieffund@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Contact Form Message from ${formData.name}`
        })
      });
      
      if (response.ok) {
        alert('Thank you for reaching out! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Oops! There was a problem submitting your form. Please try again.');
      }
    } catch (error) {
      alert('Oops! There was a problem submitting your form. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-badge"><Mailbox size={14} style={{ display: 'inline', marginRight: '4px' }} /> Get In Touch</div>
            <h2 className="section-title">Contact Us</h2>
            <p className="contact-desc">Have questions about our work or want to get involved? We'd love to hear from you.</p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon"><Mail size={24} color="var(--pink)" /></span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:mattriferelieffund@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>mattriferelieffund@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><MapPin size={24} color="var(--pink)" /></span>
                <div>
                  <strong>Location</strong>
                  <p>Serving communities worldwide</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Clock size={24} color="var(--pink)" /></span>
                <div>
                  <strong>Hours</strong>
                  <p>Mon – Fri, 9AM – 6PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form card" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Tell us more..." required></textarea>
            </div>
            <button type="submit" className="btn btn-pink btn-lg" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
