import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import { Product, Category, CartItem } from './types';
import { apiService } from './services/apiService';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      try {
        const categoryProducts = await apiService.getProductsByCategory(categoryId);
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Failed to load category products:', error);
      }
    } else {
      const allProducts = await apiService.getProducts();
      setProducts(allProducts);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const searchResults = await apiService.searchProducts(query);
        setProducts(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      const allProducts = await apiService.getProducts();
      setProducts(allProducts);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading HyperLocal Commerce...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        cartItemCount={cartItemCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fast Delivery in Your Neighborhood
          </h1>
          <p className="text-gray-600">
            Fresh groceries and essentials delivered in 15-30 minutes
          </p>
        </div>

        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <ProductGrid
          products={products}
          onAddToCart={addToCart}
          searchQuery={searchQuery}
        />
      </main>

      {isCartOpen && (
        <Cart
          items={cartItems}
          total={cartTotal}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;