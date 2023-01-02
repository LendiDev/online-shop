const getAllProducts = (req, res) => {
  res.render("admin/products/all-products");
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = async (req, res) => {
  res.render("admin/products/new-product");
};

module.exports = {
  getAllProducts,
  getNewProduct,
  createNewProduct
}