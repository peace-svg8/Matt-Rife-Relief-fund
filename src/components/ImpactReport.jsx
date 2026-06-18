import React, { useState, useEffect, useRef } from 'react';
import './ImpactReport.css';

const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const ImpactReport = () => {
  return (
    <section id="impact" className="impact-section">
      <div className="impact-overlay"></div>
      <div className="container impact-content">
        <div className="impact-text">
          <div className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>♥ Impact Report</div>
          <h2>
            Through your support, we've provided food, shelter, and medical aid to <span>thousands of families</span> worldwide
          </h2>
          <a href="#donate" className="btn btn-white btn-lg">Join the Cause →</a>
        </div>

        <div className="impact-stats">
          <div className="impact-stat-card">
            <h3><Counter end={50000} suffix="+" /></h3>
            <p>Children Fed &amp; Sheltered</p>
          </div>
          <div className="impact-stat-card">
            <h3><Counter end={10000} suffix="+" /></h3>
            <p>Medical Checkups Provided</p>
          </div>
          <div className="impact-stat-card">
            <h3><Counter end={5000} /></h3>
            <p>Children Enrolled in Schools</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactReport;
