import { model, Schema } from 'mongoose';
import { BiCycleProductOrder } from './order.interface';

const orderSchema = new Schema<BiCycleProductOrder>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must be give to place order'],
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  product: {
    type: String,
    ref: 'Product',
    required: [true, 'product id is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity id is required'],
    min: [1, 'Quantity must be at least 1'],
  },

  totalPrice: {
    type: Number,
    required: [true, 'price id is required'],
    min: [0, 'Total price must be a positive number'],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export const orderModel = model<BiCycleProductOrder>('Order', orderSchema);
