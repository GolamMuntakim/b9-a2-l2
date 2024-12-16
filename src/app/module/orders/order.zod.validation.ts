import { z } from 'zod';

// Zod schema for BiCycleProductOrder
export const BiCycleProductOrderSchema = z.object({
  email: z.string().email('Invalid email address'),
  product: z.string().nonempty('Product ID is required'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  totalPrice: z
    .number()
    .nonnegative('Total price must be a non-negative number'),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type inferred from the Zod schema
export type BiCycleProductOrder = z.infer<typeof BiCycleProductOrderSchema>;
