const express = require("express");

const ProductsController = require('../controllers/products.controller');

const routes = express.Router();

routes.get("/products", ProductsController.allProducts);

module.exports = routes;