const express = require('express');
const CartController = require('../controllers/cart.controllers');

const routes = express.Router();

routes.post('/items', CartController.addCartItem);

module.exports = routes;