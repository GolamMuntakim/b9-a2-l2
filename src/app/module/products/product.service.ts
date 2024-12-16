import { BiCycleProduct, updateBycicleProduct } from './product.interface';
import { productModel } from './product.model';

// create Bycicle product
const makeProduct = async (product: BiCycleProduct) => {
  const result = await productModel.create(product);
  return result;
};

// get all the bycicle product and get it using query also
const getProduct = async (query: any) => {
  console.log(query);
  const result = await productModel.find(query).exec();
  return result;
};

//get a specific ByCicle by id
const getSingleProduct = async (id: string) => {
  const result = await productModel.findOne({ _id: id });
  return result;
};

// update product
const updateProduct = async (updatedData: updateBycicleProduct, id: string) => {
  const result = await productModel.updateOne(
    { _id: id },
    {
      $set: {
        price: updatedData.price,
        quantity: updatedData.quantity,
        inStock: true,
        updatedAt: new Date().toISOString().replace('Z', '+00:00'),
      },
    },
  );
  const UpdatedProduct = await productModel.findOne({ _id: id });
  return UpdatedProduct;
};

//delete product
const deleteProduct = async (id: string) => {
  const result = await productModel.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error('product not found for deleted');
  } else {
    return result;
  }
};

export const productServices = {
  makeProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
