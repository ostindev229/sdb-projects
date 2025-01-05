
import React from 'react';
import Navbar from './component/Header/Navbar';
import Hero from './component/Header/Hero';
import Testimonials from './component/Testimonials/Testimonials';

const Marketplace: React.FC = () => {

    return (
             <div>
      <Navbar />
      <Hero />
        <Testimonials />
    </div>
    );
};

export default Marketplace;
