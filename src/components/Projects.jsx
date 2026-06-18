import React from 'react';
import { BookOpen, Droplets, HeartPulse, Wheat, Home, GraduationCap, MapPin, Globe2 } from 'lucide-react';
import './Projects.css';

const projects = [
  { icon: <BookOpen size={40} color="var(--pink)" />, title: 'School Building Initiative', location: 'East Africa', status: 'Ongoing', desc: 'Constructing safe learning spaces and providing educational resources to communities in need.' },
  { icon: <Droplets size={40} color="var(--pink)" />, title: 'Clean Water Program', location: 'South Asia', status: 'Active', desc: 'Installing water purification systems and wells to provide clean drinking water.' },
  { icon: <HeartPulse size={40} color="var(--pink)" />, title: 'Mobile Health Clinics', location: 'Middle East', status: 'Active', desc: 'Bringing medical care directly to war-affected communities through mobile clinics.' },
  { icon: <Wheat size={40} color="var(--pink)" />, title: 'Agricultural Support', location: 'West Africa', status: 'Planned', desc: 'Empowering families with farming tools, seeds, and training for food security.' },
  { icon: <Home size={40} color="var(--pink)" />, title: 'Housing Reconstruction', location: 'Syria', status: 'Ongoing', desc: 'Rebuilding homes for families displaced by conflict and natural disasters.' },
  { icon: <GraduationCap size={40} color="var(--pink)" />, title: 'Teacher Training Program', location: 'Southeast Asia', status: 'Active', desc: 'Training local educators to provide quality education in underserved areas.' },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge"><Globe2 size={14} style={{ display: 'inline', marginRight: '4px' }} /> Our Projects</div>
          <h2 className="section-title">Community Projects</h2>
          <p className="section-subtitle">Our active and planned initiatives creating lasting change around the world.</p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card card">
              <div className="project-icon">{p.icon}</div>
              <span className={`project-status ${p.status.toLowerCase()}`}>{p.status}</span>
              <h3>{p.title}</h3>
              <p className="project-location"><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> {p.location}</p>
              <p className="project-desc">{p.desc}</p>
              <a href="#donate" className="project-link">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
