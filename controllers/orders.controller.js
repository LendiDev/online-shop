const Order = require("../models/order.model");
const User = require("../models/user.model");

const addNewOrder = async (req, res, next) => {
  const cart = res.locals.cart;
  const userId = res.locals.uid;

  let userData;
  try {
    userData = await User.findById(userId);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userData);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }

  req.session.cart = null;
  res.redirect("/orders");
};

const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.findAllUserOrders(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  res.render('customer/orders/all-orders', { orders });
};

const getOrderDetails = async (req, res, next) => {
  let order;
  try {
    order = await Order.findOrder(req.params.orderId);
  } catch (error) {
    return next(error);
  }

  res.render('customer/orders/order-details', { order });
};

module.exports = {
  addNewOrder,
  getAllOrders,
  getOrderDetails
};
