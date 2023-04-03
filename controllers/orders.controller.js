const Order = require("../models/order.model");
const User = require("../models/user.model");
const stripeAPI = require("../utils/stripe-api");

const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.findAllUserOrders(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  res.render("customer/orders/all-orders", { orders });
};

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

  const stripeSession = await stripeAPI.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cart.items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.product.title,
          images: [`${process.env.HOST_DOMAIN}${item.product.imageURL}`],
        },
        unit_amount: +item.product.price.toFixed(2) * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.HOST_DOMAIN}/orders/success`,
    cancel_url: `${process.env.HOST_DOMAIN}/orders/failure`,
  });

  res.redirect(303, stripeSession.url);
};

const getOrderDetails = async (req, res, next) => {
  let order;
  try {
    order = await Order.findOrder(req.params.orderId);
  } catch (error) {
    return next(error);
  }

  if (order.customerData._id.toString() !== res.locals.uid) {
    return res.status(401).render("errors/401");
  }

  res.render("customer/orders/order-details", { order });
};

const getOrderSuccess = async (req, res, next) => {
  req.session.cart = null;
  res.status(200).render("customer/orders/success");
};

const getOrderFailure = async (req, res, next) => {
  res.status(200).render("customer/orders/failure");
};

module.exports = {
  addNewOrder,
  getAllOrders,
  getOrderDetails,
  getOrderSuccess,
  getOrderFailure,
};
