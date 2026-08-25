import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Category, ApiResponse } from '../models';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Get all categories with product counts
export const getCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await pool.query<RowDataPacket[]>(`
      SELECT
        c.*,
        COUNT(p.id) as products_count
      FROM categories c
      LEFT JOIN products p ON c.name = p.category AND p.in_stock = true
      GROUP BY c.id, c.name, c.image, c.created_at, c.updated_at
      ORDER BY c.name ASC
    `);

    const response: ApiResponse<Category[]> = {
      success: true,
      data: categories as Category[]
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch categories'
    };
    res.status(500).json(response);
  }
};

// Get single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
         c.*,
         COUNT(p.id) as products_count
       FROM categories c
       LEFT JOIN products p ON c.name = p.category AND p.in_stock = true
       WHERE c.id = ?
       GROUP BY c.id, c.name, c.image, c.created_at, c.updated_at`,
      [id]
    );

    if (rows.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Category> = {
      success: true,
      data: rows[0] as Category
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching category:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch category'
    };
    res.status(500).json(response);
  }
};

// Create new category (admin function)
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category name is required'
      };
      return res.status(400).json(response);
    }

    // Check if category already exists
    const [existingCategory] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM categories WHERE name = ?',
      [name]
    );

    if (existingCategory.length > 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category with this name already exists'
      };
      return res.status(409).json(response);
    }

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO categories (name, image) VALUES (?, ?)',
      [name, image]
    );

    const response: ApiResponse<{ id: number }> = {
      success: true,
      data: { id: result.insertId },
      message: 'Category created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating category:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create category'
    };
    res.status(500).json(response);
  }
};

// Update category (admin function)
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    if (!name) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category name is required'
      };
      return res.status(400).json(response);
    }

    // Check if category exists
    const [existingCategory] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM categories WHERE id = ?',
      [id]
    );

    if (existingCategory.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category not found'
      };
      return res.status(404).json(response);
    }

    // Check if name is already taken by another category
    const [duplicateCategory] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM categories WHERE name = ? AND id != ?',
      [name, id]
    );

    if (duplicateCategory.length > 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Category with this name already exists'
      };
      return res.status(409).json(response);
    }

    await pool.query(
      'UPDATE categories SET name = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, image, id]
    );

    const response: ApiResponse<null> = {
      success: true,
      message: 'Category updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating category:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update category'
    };
    res.status(500).json(response);
  }
};