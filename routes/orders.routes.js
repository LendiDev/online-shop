const express = require('express');
const OrdersController = require('../controllers/orders.controller');
const routes = express.Router();

// route /orders

routes.get('/', OrdersController.getAllOrders);
routes.get('/details/:orderId', OrdersController.getOrderDetails)
routes.post('/', OrdersController.addNewOrder);

routes.get('/success', OrdersController.getOrderSuccess);
routes.get('/failure', OrdersController.getOrderFailure);


module.exports = routes;
