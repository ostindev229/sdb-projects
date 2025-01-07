import { Product } from './types';
import { useNavigate } from 'react-router-dom';

const ProductCard: React.FC<Product> = ({ name, price }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/detail-product?name=' + name + '&price=' + price);
  }

  return (
    <div
      className="bg-white min-w-[255px] min-h-[230px] shadow-productCardShadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full h-[70%] bg-[#F7F8FA]"></div>
      <div>
        <h3 className="font-medium text-base text-[#1D293F] tracking-[-0.9px] mt-[10px] ml-[26px]">
          {name}
        </h3>
        <h3 className="text-right mr-[26px] font-medium text-xl text-[#56B280]">
          {price}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
