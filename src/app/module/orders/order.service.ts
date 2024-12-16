import { BiCycleProductOrder } from './order.interface';
import { orderModel } from './order.model';
// create an order
const makeBiCycleOrder = async (order: BiCycleProductOrder) => {
  const { product, email, quantity, totalPrice } = order;
  const OrderedProduct = {
    product,
    email,
    quantity,
    totalPrice,
  };
  const savedOrder = await orderModel.create(OrderedProduct);
  return savedOrder;
};
// const get an order with total revenue
const getAllOrderTotalRevenue = async () => {
  const result = await orderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    { $project: { totalRevenue: 1, _id: 0 } },
  ]);
  console.log(result);
  return result[0];
};
export const BiCycleOrder = {
  makeBiCycleOrder,
  getAllOrderTotalRevenue,
};
