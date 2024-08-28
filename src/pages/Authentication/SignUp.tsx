import React from 'react';
import { FiCalendar, FiBox, FiStar } from 'react-icons/fi';
import { NewProductionDataProps } from './type';
import { motion } from 'framer-motion';

interface CardProps extends Omit<NewProductionDataProps, 'redirectTo'> {
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ productionDate, productionQte, productionTitle, onClick }) => {
  return (
    <div className="relative w-full p-6 rounded border-[1px] border-slate-300 overflow-hidden group bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#2563EB] opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
      <div className="relative z-10 mb-4 flex items-center">
        <FiCalendar className="mr-2 text-2xl text-[#2563EB] group-hover:text-white transition-colors duration-300" />
        <div>
          <h3 className="font-medium text-lg text-slate-950 group-hover:text-white transition-colors duration-300">
            Date de production
          </h3>
          <p className="text-slate-400 group-hover:text-[#A7C1F7] transition-colors duration-300">
            {productionDate}
          </p>
        </div>
      </div>
      <div className="relative z-10 flex items-center mb-4">
        <FiBox className="mr-2 text-2xl text-[#2563EB] group-hover:text-white transition-colors duration-300" />
        <div>
          <h3 className="font-medium text-lg text-slate-950 group-hover:text-white transition-colors duration-300">
            Quantité produite
          </h3>
          <p className="text-slate-400 group-hover:text-[#A7C1F7] transition-colors duration-300">
            {productionQte}
          </p>
        </div>
      </div>
      <div className="relative z-10 flex items-center mb-4">
        <FiStar className="mr-2 text-2xl text-[#2563EB] group-hover:text-white transition-colors duration-300" />
        <div>
          <h3 className="font-medium text-lg text-slate-950 group-hover:text-white transition-colors duration-300">
            Nom de la Production
          </h3>
          <p className="text-slate-400 group-hover:text-[#A7C1F7] transition-colors duration-300">
            {productionTitle}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={onClick}
          className="px-4 py-2 bg-white text-[#2563EB] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View More
        </motion.button>
      </div>
    </div>
  );
};

export default Card;
