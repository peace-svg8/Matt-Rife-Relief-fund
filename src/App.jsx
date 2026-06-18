import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMission from './components/AboutMission';
import Campaigns from './components/Campaigns';
import ImpactReport from './components/ImpactReport';
import Projects from './components/Projects';
import DonationSection from './components/DonationSection';
import Volunteer from './components/Volunteer';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMission />
      <Campaigns />
      <ImpactReport />
      <Projects />
      <DonationSection />
      <Volunteer />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
