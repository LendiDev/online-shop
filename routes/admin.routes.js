const express = require("express");

const AdminController = require('../controllers/admin.controller');

// middleware
const { imageUploadMiddleware } = require('../middlewares/uploads.middleware');

const routes = express.Router();

routes.get('/products', AdminController.getAllProducts);
routes.get('/products/new', AdminController.getNewProduct);
routes.get('/products/edit/:id', AdminController.getEditProduct);

routes.post('/products', imageUploadMiddleware, AdminController.createNewProduct);
routes.post('/products/edit/:id', imageUploadMiddleware, AdminController.updateProduct);
routes.delete('/products/:id', AdminController.deleteProduct);

module.exports = routes;