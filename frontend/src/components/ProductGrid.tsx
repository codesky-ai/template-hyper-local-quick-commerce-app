import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  searchQuery: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  searchQuery
}) => {
  const getGridTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}" (${products.length})`;
    }
    return `Featured Products (${products.length})`;
  };

  if (products.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {searchQuery ? `No results for "${searchQuery}"` : 'No products available'}
        </h2>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No products found' : 'Coming Soon'}
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? 'Try searching with different keywords or browse categories above'
              : 'We're working on adding more products to this category'
            }
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {getGridTitle()}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="delivery">Fastest Delivery</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(quantity) => onAddToCart(product, quantity)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {products.length >= 8 && (
        <div className="text-center mt-8">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;