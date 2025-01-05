
import React from 'react';
import Navbar from './component/Header/Navbar';
import Hero from './component/Header/Hero';
import Testimonials from './component/Testimonials/Testimonials';
import ProductSection from './Products/ProductSection';

const Marketplace: React.FC = () => {

    return (
        <>
             <div>
      <Navbar />
      <Hero />
        <Testimonials />
    </div>
        <div>
            <h1>Ecommerce</h1>
            <ProductSection />
        </div>
        </>
    );
};

export default Marketplace;
