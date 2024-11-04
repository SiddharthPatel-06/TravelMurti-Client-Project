import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import DealOfTheDay from './DealOfTheDay';
import SpiritualSubPackages from './SpiritualSubPackages';
import UnescoWorldHeritageSites from './UnescoWorldHeritageSites';
import ContactForm from './ContactUs';
import Footer from './Footer';
import LatestTourPackages from './LatestTourPackages ';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <DealOfTheDay />
      <SpiritualSubPackages />
      <LatestTourPackages/>
      <UnescoWorldHeritageSites />
      <Testimonials/> 
      {/* <ContactForm /> */}
    </div>
  );
};

export default Home;
