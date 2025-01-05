import React from 'react';
import Navbar from './component/Header/Navbar';
import Hero from './component/Header/Hero';
import Testimonials from './component/Testimonials/Testimonials';
import ProductSection from './Products/ProductSection';
import AdvantagesSection from './Advantages/AdvantagesSection';

const Marketplace: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductSection />
      <AdvantagesSection />
      <Testimonials />
    </>
  );
};

export default Marketplace;
