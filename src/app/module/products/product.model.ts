import mongoose, { model, Schema } from 'mongoose';
import { BiCycleProduct, ProductModel } from './product.interface';

const productSchema = new Schema<BiCycleProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: [0, 'price must be a positive number'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message:
          '{VALUE} is not supported .value is type of  Mountain | Road | Hybrid |BMX |Electric',
      },
      required: [true, 'Bicycle type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a non-negetive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'In stock status is required'],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export const productModel = model<BiCycleProduct>('Product', productSchema);
