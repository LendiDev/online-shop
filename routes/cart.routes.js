const express = require('express');
const CartController = require('../controllers/cart.controllers');

const routes = express.Router();

routes.get('/', CartController.getCart);
routes.post('/items', CartController.addCartItem);
routes.patch('/items', CartController.updateCartItem);

module.exports = routes;