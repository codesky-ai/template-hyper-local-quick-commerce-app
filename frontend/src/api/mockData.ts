import { Product, Category, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Avocados',
    description: 'Premium quality fresh avocados, perfect for salads and toast',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    inStock: true,
    rating: 4.8,
    deliveryTime: '15-20 min'
  },
  {
    id: '2',
    name: 'Organic Bananas',
    description: 'Sweet and ripe organic bananas, rich in potassium',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'Fruits',
    inStock: true,
    rating: 4.6,
    deliveryTime: '15-20 min'
  },
  {
    id: '3',
    name: 'Artisan Bread',
    description: 'Freshly baked artisan bread with crispy crust',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'Bakery',
    inStock: true,
    rating: 4.9,
    deliveryTime: '10-15 min'
  },
  {
    id: '4',
    name: 'Fresh Salmon Fillet',
    description: 'Premium Atlantic salmon fillet, perfect for grilling',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    category: 'Seafood',
    inStock: true,
    rating: 4.7,
    deliveryTime: '20-25 min'
  },
  {
    id: '5',
    name: 'Organic Coffee Beans',
    description: 'Single-origin Colombian coffee beans, medium roast',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    category: 'Beverages',
    inStock: true,
    rating: 4.8,
    deliveryTime: '15-20 min'
  },
  {
    id: '6',
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt with live cultures',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    category: 'Dairy',
    inStock: true,
    rating: 4.5,
    deliveryTime: '15-20 min'
  },
  {
    id: '7',
    name: 'Chocolate Croissant',
    description: 'Buttery croissant filled with rich dark chocolate',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f4c99a3?w=400',
    category: 'Bakery',
    inStock: true,
    rating: 4.7,
    deliveryTime: '10-15 min'
  },
  {
    id: '8',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice, no additives',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    category: 'Beverages',
    inStock: true,
    rating: 4.6,
    deliveryTime: '10-15 min'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    productsCount: 24
  },
  {
    id: '2',
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    productsCount: 18
  },
  {
    id: '3',
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    productsCount: 15
  },
  {
    id: '4',
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400',
    productsCount: 12
  },
  {
    id: '5',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    productsCount: 28
  },
  {
    id: '6',
    name: 'Household',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    productsCount: 35
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 16.97,
    status: 'on_the_way',
    deliveryAddress: '123 Main St, Apt 4B',
    estimatedDelivery: '15 min',
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: 'order-2',
    items: [
      { product: mockProducts[3], quantity: 1 },
      { product: mockProducts[4], quantity: 1 }
    ],
    total: 43.98,
    status: 'delivered',
    deliveryAddress: '456 Oak Ave, Unit 2',
    estimatedDelivery: 'Delivered',
    createdAt: '2024-03-14T14:20:00Z'
  }
];

export const mockData = {
  products: mockProducts,
  categories: mockCategories,
  orders: mockOrders
};