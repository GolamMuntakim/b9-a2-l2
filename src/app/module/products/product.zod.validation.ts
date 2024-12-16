import { z } from 'zod';

// Zod schema for BiCycleProduct
export const BiCycleProductSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  brand: z.string().nonempty('Brand name is required'),
  price: z.number().positive('Price must be a positive number'),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']),
  description: z.string().nonempty('Description is required'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// Zod schema for updateBycicleProduct
export const updateBycicleProductSchema = z.object({
  price: z.number().positive('Price must be a positive number'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
});
