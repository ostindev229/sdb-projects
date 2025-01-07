import React from 'react';
import Hero from './component/Header/Hero';
import Testimonials from './component/Testimonials/Testimonials';
import ProductSection from './Products/ProductSection';
import Footer from './component/Footer/Footer';
import { Navbar } from './component/Header/Navbar';
import AdvantagesSection from './Advantages/AdvantagesSection';
import { Outlet } from 'react-router-dom';

const Marketplace: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductSection />

      <Testimonials />
      <AdvantagesSection />
    </>
  );
};

const MarketplacePageLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export { MarketplacePageLayout };
export default Marketplace;
