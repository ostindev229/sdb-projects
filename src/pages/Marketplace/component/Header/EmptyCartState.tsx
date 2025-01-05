import { ShoppingBasket } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyCartStateProps {
  onClose: () => void;
}

export function EmptyCartState({ onClose }: EmptyCartStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="bg-gray-50 rounded-full p-6 mb-6">
        <ShoppingBasket className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 text-center mb-8 max-w-[280px]">
        Looks like you haven't added any items to your cart yet. Start shopping to
        fill it up!
      </p>
      <Button
        variant="default"
        className="w-full max-w-[200px] bg-green-400 text-white"
        onClick={onClose}
      >
        Continue Shopping
      </Button>
    </div>
  );
}