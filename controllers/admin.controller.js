const getAllProducts = (req, res) => {
  res.render("admin/products/all-products");
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.redirect("/admin/products");
};

module.exports = {
  getAllProducts,
  getNewProduct,
  createNewProduct
}