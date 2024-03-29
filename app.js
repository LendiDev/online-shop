const path = require("path");

const express = require("express");
const session = require("express-session");
const csrf = require("csurf");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token.middleware");
const {
  handleErrors,
  handleNotFound,
  handleInternalErrors,
} = require("./middlewares/error-handler.middleware");
const authCheckStatusMiddleware = require("./middlewares/check-auth.middleware");
const routesProtectionMiddleware = require("./middlewares/routes-protection.middleware");
const cartMiddleware = require("./middlewares/cart.middleware");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices.middleware");

const sessionsConfig = require("./config/sessions");
const authRoutes = require("./routes/auth.routes");
const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const adminRoutes = require("./routes/admin.routes");
const ordersRoutes = require("./routes/orders.routes");
const getImage = require("./controllers/uploads.controller");

const app = express();

app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/includes/"),
]);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session(sessionsConfig()));
app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(authCheckStatusMiddleware);

app.use("/products/images/:image_key", getImage);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", routesProtectionMiddleware, ordersRoutes);
app.use("/admin", routesProtectionMiddleware, adminRoutes);

app.use(handleNotFound);
app.use(handleErrors);
app.use(handleInternalErrors);

module.exports = app;
