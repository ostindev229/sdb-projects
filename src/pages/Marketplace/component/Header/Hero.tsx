import React from 'react';
import bio from '../../../../images/bio.png'
import { Sprout } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      <img
      src={bio}
        alt="Candles with leaves"
        className="w-full h-['705px'] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      <div className=" absolute inset-0 flex items-center justify-center">
        <div className=" backdrop-blur-sm bg-white/80 p-8 rounded-lg w-[695px] h-[316px] mx-4 text-center">
          <div className="flex justify-center mb-4">
          <Sprout className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The nature candle</h1>
          <p className="font-inter text-base leading-[26px] text-[#1D252C]/80 mb-8 max-w-[480px] mx-auto">
            All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-colors">
            Discovery our collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;