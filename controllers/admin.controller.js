const Product = require('../models/product.model');

const getAllProducts = (req, res) => {
  res.render("admin/products/all-products");
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
    image: req.file.filename,
  })

  try {
    await newProduct.save();
  } catch (error) {
    next(error);
  }

  res.redirect("/admin/products");
};

module.exports = {
  getAllProducts,
  getNewProduct,
  createNewProduct
}