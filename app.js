require("dotenv").config();
const path = require("path");

const express = require("express");

const session = require("express-session");
const csrf = require("csurf");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token.middleware");
const {
  handleErrors,
  handleNotFound,
} = require("./middlewares/error-handler.middleware");
const authCheckStatusMiddleware = require("./middlewares/check-auth.middleware");

const sessionsConfig = require("./config/sessions");
const db = require("./database/database");
const authRoutes = require("./routes/auth.routes");
const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/includes/"),
]);

app.use(express.static("public"));
app.use('/products/assets/images', express.static('uploads/product-images'))
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionsConfig()));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(authCheckStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/admin/', adminRoutes);

app.use(handleErrors);
app.use(handleNotFound);

db.connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log("Failed to connect to database");
    console.log(error);
  });
