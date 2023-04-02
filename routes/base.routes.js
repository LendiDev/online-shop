const express = require("express");
const Product = require('../models/product.model');

const routes = express.Router();

routes.get("/", async (req, res) => {
  let products;
  try {
    products = await Product.getProducts(3);
  } catch (error) {
    return next(error);
  }
  
  res.render("home", { products });
});

routes.get("/401", (req, res) => {
  res.status(401).render("errors/401");
});

routes.get("/403", (req, res) => {
  res.status(403).render("errors/403");
});

routes.get("/500", (req, res) => {
  res.status(500).render("errors/500");
});

module.exports = routes;