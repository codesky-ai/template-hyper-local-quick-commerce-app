import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Product, ApiResponse, PaginatedResponse } from '../models';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Get all products with optional pagination and filtering
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;
    const inStock = req.query.in_stock as string;

    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as total FROM products';
    const queryParams: any[] = [];
    const conditions: string[] = [];

    // Add filters
    if (category) {
      conditions.push('category = ?');
      queryParams.push(category);
    }

    if (inStock !== undefined) {
      conditions.push('in_stock = ?');
      queryParams.push(inStock === 'true');
    }

    if (conditions.length > 0) {
      const whereClause = ' WHERE ' + conditions.join(' AND ');
      query += whereClause;
      countQuery += whereClause;
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    // Execute both queries
    const [products] = await pool.query<RowDataPacket[]>(query, queryParams);
    const [countResult] = await pool.query<RowDataPacket[]>(countQuery, queryParams.slice(0, -2));

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const response: PaginatedResponse<Product[]> = {
      success: true,
      data: products as Product[],
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch products'
    };
    res.status(500).json(response);
  }
};

// Get single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: rows[0] as Product
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching product:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch product'
    };
    res.status(500).json(response);
  }
};

// Get products by category
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    // First get category name
    const [categoryResult] = await pool.query<RowDataPacket[]>(
      'SELECT name FROM categories WHERE id = ?',
      [categoryId]
    );

    if (categoryResult.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category not found'
      };
      return res.status(404).json(response);
    }

    const categoryName = categoryResult[0].name;

    // Get products in category
    const [products] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM products WHERE category = ? AND in_stock = true ORDER BY created_at DESC',
      [categoryName]
    );

    const response: ApiResponse<Product[]> = {
      success: true,
      data: products as Product[]
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch products by category'
    };
    res.status(500).json(response);
  }
};

// Search products
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Search query is required'
      };
      return res.status(400).json(response);
    }

    const searchTerm = `%${q}%`;

    const [products] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM products
       WHERE (name LIKE ? OR description LIKE ? OR category LIKE ?)
       AND in_stock = true
       ORDER BY
         CASE
           WHEN name LIKE ? THEN 1
           WHEN description LIKE ? THEN 2
           WHEN category LIKE ? THEN 3
           ELSE 4
         END, created_at DESC`,
      [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]
    );

    const response: ApiResponse<Product[]> = {
      success: true,
      data: products as Product[]
    };

    res.json(response);
  } catch (error) {
    console.error('Error searching products:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to search products'
    };
    res.status(500).json(response);
  }
};

// Create new product (admin function)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category, in_stock, rating, delivery_time } = req.body;

    if (!name || !description || !price || !category) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Name, description, price, and category are required'
      };
      return res.status(400).json(response);
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO products (name, description, price, image, category, in_stock, rating, delivery_time)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, image, category, in_stock ?? true, rating, delivery_time]
    );

    const response: ApiResponse<{ id: number }> = {
      success: true,
      data: { id: result.insertId },
      message: 'Product created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating product:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create product'
    };
    res.status(500).json(response);
  }
};