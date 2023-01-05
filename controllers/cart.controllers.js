const Product = require("../models/product.model");

const getCart = async (req, res, next) => {
  res.render('customer/cart/cart');
};

const addCartItem = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.id);
  } catch (error) {
    return next(error);
  }

  const cart = res.locals.cart;
  cart.addProduct(product);
  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart Updated!',
    newTotalQuantity: cart.totalQuantity,
    newTotalAmount: cart.totalAmount,
  })
};

module.exports = {
  getCart,
  addCartItem,
};
