
import React from 'react';
import Hero from './component/Header/Hero';
import Testimonials from './component/Testimonials/Testimonials';
import ProductSection from './Products/ProductSection';
import Footer from './component/Footer/Footer';
import { Navbar } from './component/Header/Navbar';

const Marketplace: React.FC = () => {

    return (
        <>
            
      <Navbar />
      <Hero />
      <ProductSection />

        <Testimonials />
        <Footer />
   
        
        </>
    );
};

export default Marketplace;
