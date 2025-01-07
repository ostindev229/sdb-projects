import React from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import { Product } from './types';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DetailProduct: React.FC = () => {
  let query = useQuery();

  const product: Product = {
    name: query.get('name') || '',
    price: Number(query.get('price')) || 0,
  };

  return (
    <div>
      <div className="mt-[47px]"></div>
      <div className="lg:flex gap-[31px]">
        <div className="lg:w-[540px] lg:h-[433px] bg-[#F7F8FA]"></div>
        <div>
          <h3 className="font-medium text-[26px]  text-black leading-[57.6px] tracking-[-0.9px]">
            {product.name}
          </h3>
          <h3 className="font-semibold text-[26px]  text-[#56B280] leading-[57.6px] tracking-[-0.9px] mb-[23px]">
            {product.price}
          </h3>
          <h4 className="font-normal text-lg text-black mb-[6px]">Quantité</h4>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
