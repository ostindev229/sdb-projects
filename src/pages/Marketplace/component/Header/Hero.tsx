import React from 'react';
import bio from '../../../../images/bio.png';
import { Sprout } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={bio}
        alt="Candles with leaves"
        className="w-full h-[705px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-sm bg-white/80 p-8 rounded-lg w-[695px] h-auto mx-4 text-center flex flex-col items-center">
          {/* Icon */}
          <div className="mb-4">
            <Sprout className="h-8 w-8 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The Nature Candle
          </h1>

          {/* Description */}
          <p className="font-inter text-base leading-[26px] text-[#1D252C]/80 mb-2 max-w-[480px]">
            Découvrez nos savons artisanaux, fabriqués avec passion au Bénin.
            Des produits naturels pour votre bien-être quotidien.
          </p>

          {/* Features */}
          <div className=" flex py-3 mb-3">
            <div className="flex items-center gap-2 px-4 justify-center ">
              <div className="bg-green-500 rounded-full p-1">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-900">100% Naturel</span>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <div className="bg-green-500 rounded-full p-1">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-900">Fait au Bénin</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <button className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-colors">
            Discover Our Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
