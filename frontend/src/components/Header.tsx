import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Clock } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartItemCount: number;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, cartItemCount, onCartToggle }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>Deliver to: Downtown Area</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>15-30 min delivery</span>
            </div>
          </div>
          <div className="text-green-600 font-medium">
            Free delivery on orders $25+
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              HyperLocal
            </h1>
            <span className="ml-2 text-sm text-gray-500">Commerce</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search for products, brands, and more..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Cart */}
          <button
            onClick={onCartToggle}
            className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;