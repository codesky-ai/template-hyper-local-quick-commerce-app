import { apiClient } from '../api/client';
import { mockData } from '../api/mockData';
import { Product, Category, Order } from '../types';

const USE_MOCK_DATA = false; // Toggle for development

export const apiService = {
  // Products API
  async getProducts(): Promise<Product[]> {
    if (USE_MOCK_DATA) return mockData.products;

    try {
      const response = await apiClient.get('/products', { timeout: 3000 });
      return response.data;
    } catch (error) {
      console.warn('Products API failed, using mock data:', error);
      return mockData.products;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    if (USE_MOCK_DATA) {
      return mockData.products.find(p => p.id === id) || null;
    }

    try {
      const response = await apiClient.get(`/products/${id}`, { timeout: 3000 });
      return response.data;
    } catch (error) {
      console.warn('Product by ID API failed, using mock data:', error);
      return mockData.products.find(p => p.id === id) || null;
    }
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (USE_MOCK_DATA) {
      const category = mockData.categories.find(c => c.id === categoryId);
      return mockData.products.filter(p => p.category === category?.name);
    }

    try {
      const response = await apiClient.get(`/products/category/${categoryId}`, { timeout: 3000 });
      return response.data;
    } catch (error) {
      console.warn('Products by category API failed, using mock data:', error);
      const category = mockData.categories.find(c => c.id === categoryId);
      return mockData.products.filter(p => p.category === category?.name);
    }
  },

  // Categories API
  async getCategories(): Promise<Category[]> {
    if (USE_MOCK_DATA) return mockData.categories;

    try {
      const response = await apiClient.get('/categories', { timeout: 3000 });
      return response.data;
    } catch (error) {
      console.warn('Categories API failed, using mock data:', error);
      return mockData.categories;
    }
  },

  // Orders API
  async getOrders(): Promise<Order[]> {
    if (USE_MOCK_DATA) return mockData.orders;

    try {
      const response = await apiClient.get('/orders', { timeout: 3000 });
      return response.data;
    } catch (error) {
      console.warn('Orders API failed, using mock data:', error);
      return mockData.orders;
    }
  },

  async createOrder(orderData: any): Promise<Order> {
    if (USE_MOCK_DATA) {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      return newOrder;
    }

    try {
      const response = await apiClient.post('/orders', orderData, { timeout: 5000 });
      return response.data;
    } catch (error) {
      console.warn('Create order API failed, using mock response:', error);
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      return newOrder;
    }
  },

  // Search API
  async searchProducts(query: string): Promise<Product[]> {
    if (USE_MOCK_DATA) {
      return mockData.products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    try {
      const response = await apiClient.get(`/products/search?q=${encodeURIComponent(query)}`, { timeout: 3000 });
      return response.data;
    } catch (error) {
      console.warn('Search API failed, using mock data:', error);
      return mockData.products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
};