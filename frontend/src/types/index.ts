export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  deliveryTime?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  deliveryAddress: string;
  estimatedDelivery: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}