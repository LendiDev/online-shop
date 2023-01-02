const express = require("express");

const AdminController = require('../controllers/admin.controller');

const routes = express.Router();

routes.get('/products', AdminController.getAllProducts);
routes.get('/products/new', AdminController.getNewProduct);

routes.post('/products', AdminController.createNewProduct);

module.exports = routes;