import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

interface AddedCartStateProps {
  onClose: () => void;
}

const AddedCartState: React.FC<AddedCartStateProps> = ({ onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const price = 10;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-[220px] py-[80px]">
      <h1 className="text-[32px] font-medium mb-6">Your cart items</h1>
      
      <div className="flex items-center gap-2 text-green-600">
        <ShoppingBag className="w-5 h-5" />
        <span className="font-medium">1 items</span>
      </div>

      <button 
        onClick={onClose}
        className="inline-flex items-center text-[#56B280] hover:text-green-700 transition-colors gap-2 mt-4 mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to shopping
      </button>

      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr] gap-4 border-b border-[#E2E2E2] pb-6">
          <div className="text-[#1D1D1D] font-medium">Product</div>
          <div className="text-right text-[#1D1D1D] font-medium">Price</div>
          <div className="text-right text-[#1D1D1D] font-medium">Quantity</div>
          <div className="text-right text-[#1D1D1D] font-medium">Total</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr] gap-4 items-center py-8 border-b border-[#E2E2E2]">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="w-full md:w-[159px] h-[159px] bg-[#F4F4F4] rounded-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=60" 
                alt="Spiced Mint Candle" 
                className="w-[123px] object-cover rounded"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-[20px] font-medium mb-2">Spiced Mint Candle</h3>
              <button
                className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"   
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
          
          <div className="text-right">$ {price.toFixed(2)}</div>
          
          <div className="flex justify-end">
            <div className="inline-flex border border-[#E2E2E2] rounded">
              <button 
                className="w-8 h-8 flex items-center justify-center border-r border-[#E2E2E2] hover:bg-gray-50 transition-colors"
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                -
              </button>
              <span className="w-12 h-8 flex items-center justify-center">
                {quantity}
              </span>
              <button 
                className="w-8 h-8 flex items-center justify-center border-l border-[#E2E2E2] hover:bg-gray-50 transition-colors"
                onClick={() => setQuantity(Math.min(quantity + 1, 99))}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="text-right">$ {(price * quantity).toFixed(2)}</div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-[20px] font-medium">Sub-total</div>
            <div className="text-[#616161] mt-1">
              Tax and shipping cost will be calculated later
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
            <div className="text-[20px] font-medium">
              $ {(price * quantity).toFixed(2)}
            </div>
            <button className="w-full md:w-auto bg-[#56B280] text-white px-16 py-3 rounded hover:bg-green-600 transition-colors">
              Check-out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedCartState;
