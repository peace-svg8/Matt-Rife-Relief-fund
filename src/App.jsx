import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMission from './components/AboutMission';
import FounderSpotlight from './components/FounderSpotlight';
import Campaigns from './components/Campaigns';
import ImpactReport from './components/ImpactReport';
import Projects from './components/Projects';
import DonationSection from './components/DonationSection';

import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <AboutMission />
      <FounderSpotlight />
      <Campaigns />
      <ImpactReport />
      <Projects />
      <DonationSection />

      <Contact />
      <Footer />
    </>
  );
}

export default App;
