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

const getEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/edit-product", { product });
  } catch (error) {
    return next(error);
  }
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

const updateProduct = async (req, res, next) => {
  const product = new Product({ ...req.body, _id: req.params.id });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch(error) {
    error.code = 404;
    return next(error);
  }

  res.redirect("/admin/products");
};

module.exports = {
  getAllProducts,
  getNewProduct,
  getEditProduct,
  createNewProduct,
  updateProduct,
};
