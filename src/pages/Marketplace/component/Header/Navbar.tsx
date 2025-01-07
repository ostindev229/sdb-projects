import { Leaf, User } from 'lucide-react';
import { Button } from '../ui/button';
import { NavbarCart } from './NavbarCart';
import { CartDrawer } from './CartDrawer';

export function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-semibold">Candleaf</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1"
                >
                  Discovery
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </div>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact us</Button>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
              <NavbarCart />
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer />


    </>
  );
}