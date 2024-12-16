import { productModel } from './product.model';
import { Request, Response } from 'express';
import { productServices } from './product.service';
import { BiCycleProduct } from './product.interface';
import { BiCycleProductSchema } from './product.zod.validation';
// import { ParsedQs } from "qs";
const createProductController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const zodParseData = BiCycleProductSchema.parse(body);
    const result = await productServices.makeProduct(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Bicycle  created successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.errors);
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err.name || 'Error',
      errors: err.errors,

      stack: err.stack,
    });
  }
};

// get all Bicycle product
const getAllBycicle = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  try {
    let query = {};
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      query = {
        $or: [{ name: regex }, { brand: regex }, { type: regex }],
      };
    }
    const result = await productServices.getProduct(query);
    res.status(200).json({
      status: true,
      message: 'BiCycle found successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error.name || 'Something went wrong',
    });
  }
};

//get a specific ByCicle by id
const getSingleBycicleById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProduct(productId);
    res.status(200).json({
      message: 'BiCycle found successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err.name || 'Error',
      errors: err.errors,
      stack: err.stack,
    });
  }
};
// update quantity and price
const updatedBicycleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const { quantity, price } = updateData;
    if (quantity < 1 || price < 1) {
      throw new Error('quantity or price must be greater than zero');
    }

    const result = await productServices.updateProduct(updateData, productId);

    res.status(200).json({
      status: true,
      message: 'BiCycle updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err.name || 'Error',
      errors: err.errors,
      stack: err.stack,
    });
  }
};

//delete  product
const deleteBiCycleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProduct(productId);
    res.status(200).json({
      message: 'BiCycle deleted successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err.name || 'Error',
      errors: err.errors,

      stack: err.stack,
    });
  }
};
export const productController = {
  createProductController,
  getAllBycicle,
  getSingleBycicleById,
  updatedBicycleProduct,
  deleteBiCycleProduct,
};
