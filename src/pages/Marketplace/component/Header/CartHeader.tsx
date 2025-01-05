import { SheetHeader, SheetTitle } from '../ui/sheet';

interface CartHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <SheetHeader className="px-6 py-4 border-b">
      <div className="flex items-center justify-between">
        <SheetTitle className="text-xl font-semibold">
          Shopping Cart {itemCount > 0 && `(${itemCount})`}
        </SheetTitle>
       
      </div>
    </SheetHeader>
  );
}