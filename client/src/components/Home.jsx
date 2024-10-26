import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import DealOfTheDay from './DealOfTheDay';
import JaipurTempleTour from './JaipurTempleTour';
import SpiritualSubPackages from './SpiritualSubPackages';
import ContactForm from './ContactUs';
import Footer from './Footer';
import LatestTourPackages from './LatestTourPackages ';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <DealOfTheDay />
      <JaipurTempleTour />
      <LatestTourPackages/>
      <SpiritualSubPackages />
      <Testimonials/> 
      {/* <ContactForm /> */}
    </div>
  );
};

export default Home;
