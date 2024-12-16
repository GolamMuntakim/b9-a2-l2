import { Request, Response } from 'express';
import { BiCycleProduct } from '../products/product.interface';
import { productModel } from '../products/product.model';
import { BiCycleOrder } from './order.service';
import { BiCycleProductOrderSchema } from './order.zod.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParseData = BiCycleProductOrderSchema.parse(order);
    const { product, quantity } = zodParseData;
    // get ordered product
    const getOrderedProduct: BiCycleProduct | null = await productModel.findOne(
      { _id: product },
    );
    if (!getOrderedProduct) {
      throw new Error('Product not found');
    }
    //If the inventory quantity goes to zero, set inStock to false
    const isStock = getOrderedProduct.inStock;
    if (isStock === false) {
      throw new Error('This product is not fount in the stock');
    }
    // When an order is placed, reduce the quantity in the product model.
    const Quantity: number = getOrderedProduct.quantity;
    const updatedQuantity = Quantity - quantity;
    if (Quantity < quantity) {
      throw new Error('quantity must be less than or equal to product stock');
    }
    // when quantity will be 0 it's make the quantity 0
    if (updatedQuantity === 0) {
      await productModel.updateOne(
        { _id: product },
        {
          $set: {
            updatedAt: new Date().toISOString().replace('Z', '+00:00'),
            quantity: updatedQuantity,
            inStock: false,
          },
        },
      );
    }
    const result = await BiCycleOrder.makeBiCycleOrder(order);
    // reduce the product count
    const productUpdatedData = await productModel.updateOne(
      { _id: product },
      {
        $set: {
          updatedAt: new Date().toISOString().replace('Z', '+00:00'),
          quantity: updatedQuantity,
        },
      },
    );
    res.status(200).json({
      success: true,
      message: 'Order created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error.name || 'Error',
      stack: error.stack,
    });
  }
};
// calculate total revenue
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await BiCycleOrder.getAllOrderTotalRevenue();
    res.status(200).json({
      status: true,
      message: 'Total revenue calculated succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error.name || 'Error',
      stack: error.stack,
    });
  }
};
export const orderController = {
  createOrder,
  calculateRevenue,
};
