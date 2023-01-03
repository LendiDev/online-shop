const Product = require("../models/product.model");

const allProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  allProducts,
}