import React from 'react'
import { Leaf , ShoppingCart, User } from 'lucide-react'
const Navbar :React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-green-500" />
          <span className="ml-2 text-xl font-semibold">Candleaf</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="text-gray-700 hover:text-green-500 flex items-center">
              Discovery
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <a href="#" className="text-gray-700 hover:text-green-500">About</a>
          <a href="#" className="text-gray-700 hover:text-green-500">Contact us</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-green-500">
            <User className="h-6 w-6" />
          </button>
          <button className="text-gray-700 hover:text-green-500">
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar