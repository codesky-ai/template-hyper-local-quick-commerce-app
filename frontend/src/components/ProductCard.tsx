import React, { useState } from 'react';
import { Plus, Minus, Star, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    onAddToCart(quantity);

    // Reset quantity after adding
    setTimeout(() => {
      setQuantity(1);
      setIsAdding(false);
    }, 500);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
        {product.inStock && (
          <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            In Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Rating and Delivery Time */}
        <div className="flex items-center justify-between mb-3">
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
            </div>
          )}
          {product.deliveryTime && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{product.deliveryTime}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Quantity and Add to Cart */}
        {product.inStock ? (
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={decrementQuantity}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-3 py-2 font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-400 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;