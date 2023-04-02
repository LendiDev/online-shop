updateCartPricesMiddleware = async (req, res, next) => {
  const cart = res.locals.cart;

  await cart.updatePrices();

  next();
};

module.exports = updateCartPricesMiddleware;
