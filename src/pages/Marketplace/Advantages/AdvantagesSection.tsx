import React from 'react';
import BlackCircle from '../../../images/icon/black-circle.svg';

interface AdvantageProps {
  advantage: string;
}

const AdvantageDisplay: React.FC<AdvantageProps> = ({ advantage }) => {
  return (
    <div className="flex items-center mb-[10px]">
      <img src={BlackCircle} alt="black-circle" className="mr-[10px]" />
      <p className="text-black text-base">{advantage}</p>
    </div>
  );
};

const advantages = [
  "Fabriqué à partir d'ingrédients naturels, 100% fait maison",
  'Parfum agréable',
  'Efficace contre les bactéries',
  "Respectueux de l'environnement",
  'Disponible en différentes tailles',
];

const AdvantagesSection: React.FC = () => {
  return (
    <div className="bg-[#F7F8FA] pt-[133px] pb-[209px] px-[165px] flex justify-between items-center">
      <div>
        <h3 className="font-medium text-[40px] leading-[46.6px] tracking-[-0.9px] text-[#1D252C] lg:w-[390px] mb-[15px]">
          Savon efficace, de qualité et parfumé
        </h3>
        <p className="text-base text-[#56B280] mb-[38px]">
          Conçu pour tout vos besoins
        </p>
        {advantages.map((advantage, index) => (
          <AdvantageDisplay key={index} advantage={advantage} />
        ))}
      </div>
      <div className="w-[540px] h-[377px] bg-white"></div>
    </div>
  );
};

export default AdvantagesSection;
