import React from 'react';
import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onClose
}) => {
  const deliveryFee = total >= 25 ? 0 : 4.99;
  const finalTotal = total + deliveryFee;

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented soon!');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-4">
                Add some products to get started!
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-gray-50 rounded-lg p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      ${item.product.price.toFixed(2)} each
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Price and Remove */}
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-500 text-sm hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t bg-gray-50 p-4">
            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Truck className="w-4 h-4" />
              <span>
                {deliveryFee === 0
                  ? 'Free delivery'
                  : `$${(25 - total).toFixed(2)} more for free delivery`
                }
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;