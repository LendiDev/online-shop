const Product = require("../models/product.model");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    
    res.render("admin/products/all-products", { products });
  } catch (error) {
    next(error);
    return;
  }
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
    image: req.file.filename,
  });

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
  createNewProduct,
};
