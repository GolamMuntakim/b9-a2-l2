import express from 'express';
import { productController } from './product.controller';

const router = express.Router();
//create Bycicle product
router.post('/products', productController.createProductController);
//get Bycicle product
router.get('/products', productController.getAllBycicle);
//get Bycicle product by id
router.get('/products/:productId', productController.getSingleBycicleById);
//update Bycicle product
router.put('/products/:productId', productController.updatedBicycleProduct);
//delete Bycicle product
router.delete('/products/:productId', productController.deleteBiCycleProduct);

export const productRouter = router;
