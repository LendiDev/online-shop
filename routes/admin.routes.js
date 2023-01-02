const express = require("express");

const AdminController = require('../controllers/admin.controller');

// middleware
const { imageUploadMiddleware } = require('../middlewares/uploads.middleware');

const routes = express.Router();

routes.get('/products', AdminController.getAllProducts);
routes.get('/products/new', AdminController.getNewProduct);

routes.post('/products', imageUploadMiddleware, AdminController.createNewProduct);

module.exports = routes;