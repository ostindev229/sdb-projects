import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { Button } from '@chakra-ui/react';

export function NavbarCart() {
  const { setIsOpen, items } = useCart();
  const itemCount = items.length;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}