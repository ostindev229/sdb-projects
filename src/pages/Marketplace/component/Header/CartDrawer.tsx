import { CartHeader } from './CartHeader';
import { Sheet, SheetContent } from '../ui/sheet';
import { EmptyCartState } from './EmptyCartState';
import { useCart } from '../../hooks/useCart';

export function CartDrawer() {
  const { isOpen, setIsOpen, items } = useCart();
  const itemCount = items.length;

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 bg-white"
      >
        <div className="flex flex-col h-full">
          <CartHeader itemCount={itemCount} onClose={handleClose} />
          
          <div className="flex-1 overflow-y-auto">
            {itemCount === 0 ? (
              <EmptyCartState onClose={handleClose} />
            ) : (
              <div className="p-6">
                {/* Cart items will be rendered here */}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}