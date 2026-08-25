export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
  rating?: number;
  delivery_time?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Category {
  id?: number;
  name: string;
  image: string;
  products_count?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  delivery_address: string;
  estimated_delivery: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name?: string;
  product_image?: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password_hash?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Address {
  id?: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}