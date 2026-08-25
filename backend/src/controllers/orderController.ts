import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Order, OrderItem, ApiResponse } from '../models';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Get all orders with optional filtering
export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;

    const offset = (page - 1) * limit;

    let query = `
      SELECT
        o.*,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'product_name', p.name,
            'product_image', p.image
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
    `;

    const queryParams: any[] = [];

    if (status) {
      query += ' WHERE o.status = ?';
      queryParams.push(status);
    }

    query += `
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `;
    queryParams.push(limit, offset);

    const [orders] = await pool.query<RowDataPacket[]>(query, queryParams);

    // Parse the JSON items for each order
    const parsedOrders = orders.map(order => ({
      ...order,
      items: order.items ? JSON.parse(order.items).filter((item: any) => item.id !== null) : []
    }));

    const response: ApiResponse<Order[]> = {
      success: true,
      data: parsedOrders as Order[]
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching orders:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch orders'
    };
    res.status(500).json(response);
  }
};

// Get single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [orderRows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );

    if (orderRows.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Order not found'
      };
      return res.status(404).json(response);
    }

    const order = orderRows[0] as Order;

    // Get order items with product details
    const [itemRows] = await pool.query<RowDataPacket[]>(
      `SELECT
         oi.*,
         p.name as product_name,
         p.image as product_image
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    order.items = itemRows as OrderItem[];

    const response: ApiResponse<Order> = {
      success: true,
      data: order
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching order:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch order'
    };
    res.status(500).json(response);
  }
};

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      items,
      total,
      delivery_address,
      customer_name,
      customer_phone,
      customer_email
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Order items are required'
      };
      return res.status(400).json(response);
    }

    if (!delivery_address) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Delivery address is required'
      };
      return res.status(400).json(response);
    }

    // Calculate estimated delivery time
    const estimatedDelivery = new Date();
    estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 25); // 25 minutes from now

    // Create order
    const [orderResult] = await connection.query<ResultSetHeader>(
      `INSERT INTO orders (total, status, delivery_address, estimated_delivery, customer_name, customer_phone, customer_email)
       VALUES (?, 'pending', ?, ?, ?, ?, ?)`,
      [total, delivery_address, estimatedDelivery, customer_name, customer_phone, customer_email]
    );

    const orderId = orderResult.insertId;

    // Add order items
    for (const item of items) {
      // Get product details to ensure it exists and get current price
      const [productRows] = await connection.query<RowDataPacket[]>(
        'SELECT id, name, price, in_stock FROM products WHERE id = ?',
        [item.product_id]
      );

      if (productRows.length === 0) {
        await connection.rollback();
        const response: ApiResponse<null> = {
          success: false,
          error: `Product with ID ${item.product_id} not found`
        };
        return res.status(400).json(response);
      }

      const product = productRows[0];

      if (!product.in_stock) {
        await connection.rollback();
        const response: ApiResponse<null> = {
          success: false,
          error: `Product ${product.name} is out of stock`
        };
        return res.status(400).json(response);
      }

      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, product.price]
      );
    }

    await connection.commit();

    // Fetch the complete order with items
    const [completeOrder] = await pool.query<RowDataPacket[]>(
      `SELECT
         o.*,
         JSON_ARRAYAGG(
           JSON_OBJECT(
             'id', oi.id,
             'product_id', oi.product_id,
             'quantity', oi.quantity,
             'price', oi.price,
             'product_name', p.name,
             'product_image', p.image
           )
         ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = ?
       GROUP BY o.id`,
      [orderId]
    );

    const orderWithItems = {
      ...completeOrder[0],
      items: JSON.parse(completeOrder[0].items).filter((item: any) => item.id !== null)
    };

    const response: ApiResponse<Order> = {
      success: true,
      data: orderWithItems as Order,
      message: 'Order created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    await connection.rollback();
    console.error('Error creating order:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create order'
    };
    res.status(500).json(response);
  } finally {
    connection.release();
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Valid status is required'
      };
      return res.status(400).json(response);
    }

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Order not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Order status updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating order status:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update order status'
    };
    res.status(500).json(response);
  }
};