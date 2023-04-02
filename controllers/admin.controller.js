const Product = require("../models/product.model");
const Order = require("../models/order.model");

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
    image: req.file.key,
  });

  try {
    await newProduct.save();
  } catch (error) {
    console.table(error);
    return next(error);
  }

  res.redirect("/admin/products");
};

const updateProduct = async (req, res, next) => {
  const product = new Product({ ...req.body, _id: req.params.id });
  const imageKey = req.file.key;

  if (req.file) {
    product.replaceImage(imageKey);
  }

  try {
    await product.save();
  } catch (error) {
    error.code = 404;
    return next(error);
  }

  res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.delete();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Product deleted!" });
};

const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.findAll();
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

const updateOrder = async (req, res, next) => {
  const newStatus = req.body.status;

  const order = new Order(null, null, newStatus, null, req.body.orderId);

  try {
    order.save();
  } catch (error) {
    return next(error);
  }

  return res.json({
    message: 'Order updated',
    orderData: {
      newStatus,
    }
  });
}

module.exports = {
  getAllProducts,
  getNewProduct,
  getEditProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getOrderDetails,
  updateOrder
};
