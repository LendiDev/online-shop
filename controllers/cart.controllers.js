const Product = require("../models/product.model");

const getCart = async (req, res, next) => {
  res.render("customer/cart/cart");
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
    message: "Cart Updated!",
    newTotalQuantity: cart.totalQuantity,
    newTotalAmount: cart.totalAmount,
  });
};

const updateCartItem = (req, res, next) => {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateCartItem(
    req.body.productId,
    req.body.quantity
  );

  req.session.cart = cart;

  res.status(201).json({
    message: "Cart Item Updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalAmount: cart.totalAmount.toFixed(2).replace('-0', '0'),
      newItemPrice: updatedItemData?.updatedItemPrice ? updatedItemData.updatedItemPrice.toFixed(2) : 'remove',
    },
  });
};

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
};
