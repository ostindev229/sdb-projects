import React from 'react';
import { Leaf } from 'lucide-react';
import FooterColumn from './FooterColumn';

const Footer: React.FC = () => {
  const footerColumns = [
    {
      title: 'Discovery',
      links: ['New season', 'Most searched', 'Most selled']
    },
    {
      title: 'About',
      links: ['Help', 'Shipping', 'Affiliate']
    },
    {
      title: 'Info',
      links: ['Contact us', 'Privacy Policies', 'Terms & Conditions']
    }
  ];

  return (
    <footer className="bg-[#272727] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-white" />
              <span className="text-2xl font-semibold">Candleaf</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your natural candle made for your home and for your wellness.
            </p>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>©Candleaf All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Designed with 
            <span className="text-red-500">❤</span>
            by Ostino & Imo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;