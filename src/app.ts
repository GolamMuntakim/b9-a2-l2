import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { productRouter } from './app/module/products/product.route';
import { orderRouter } from './app/module/orders/order.route';

// middleware -->
app.use(cors());
app.use(express.json());
app.use('/api', productRouter);
app.use('/api', orderRouter);

const getAController = (req: Request, res: Response) => {
  res.send('hello programming hero');
};
app.get('/', getAController);

export default app;
