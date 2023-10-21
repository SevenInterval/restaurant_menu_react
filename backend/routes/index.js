const express = require('express');
const categoryRouter = express.Router();
const imageRouter = express.Router();

const categoryController = require('../controller/category.controller');
const imageController = require('../controller/image.controller');

categoryRouter.post('/byid', categoryController.getCategoryById);
categoryRouter.get('', categoryController.getAllCategories);
categoryRouter.post('', categoryController.postCategory);
categoryRouter.put('', categoryController.updateCategory);
categoryRouter.delete('', categoryController.deleteCategory);

imageRouter.post('', imageController.uploadImage);
imageRouter.post('/byid', imageController.getImageById);
imageRouter.delete('', imageController.deleteImage);

const routes = app => {
  app.use('/category', categoryRouter);
  app.use('/image', imageRouter);
};

module.exports = routes;