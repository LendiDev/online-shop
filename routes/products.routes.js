const express = require("express");

const ProductsController = require('../controllers/products.controller');

const routes = express.Router();

routes.get("/products", ProductsController.getAllProducts);
routes.get("/products/:id", ProductsController.getProductDetails);

module.exports = routes;