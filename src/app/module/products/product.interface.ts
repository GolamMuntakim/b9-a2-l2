import { Model } from 'mongoose';
export type BiCycleProduct = {
  name: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface ProductModel extends Model<BiCycleProduct> {
  isUserExists(id: string): Promise<BiCycleProduct | null>;
}

export type updateBycicleProduct = {
  price: number;
  quantity: number;
};
