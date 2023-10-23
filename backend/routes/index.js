const express = require('express');
const categoryRouter = express.Router();
const imageRouter = express.Router();
const productRouter = express.Router();

const categoryController = require('../controller/category.controller');
const imageController = require('../controller/image.controller');
const productController = require('../controller/product.controller');


categoryRouter.post('/byid', categoryController.getCategoryById);
categoryRouter.get('', categoryController.getAllCategories);
categoryRouter.post('', categoryController.postCategory);
categoryRouter.put('', categoryController.updateCategory);
categoryRouter.delete('', categoryController.deleteCategory);

imageRouter.post('', imageController.uploadImage);
imageRouter.post('/byid', imageController.getImageById);
imageRouter.delete('', imageController.deleteImage);

productRouter.post('/byid', productController.getProductById);
productRouter.get('', productController.getAllProducts);
productRouter.post('', productController.postProduct);
productRouter.put('', productController.updateProduct);
productRouter.delete('', productController.deleteProduct);

const routes = app => {
  app.use('/category', categoryRouter);
  app.use('/image', imageRouter);
  app.use('/product', productRouter);
};

module.exports = routes;