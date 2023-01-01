require("dotenv").config();
const path = require("path");

const express = require("express");

const session = require("express-session");
const csrf = require("csurf");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token.middleware");
const sessionsMiddleware = require("./middlewares/sessions.middleware");
const errorsHandlerMiddleware = require("./middlewares/error-handler.middleware");

const db = require("./database/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/includes/"),
]);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionsMiddleware(session)));
app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.get("/", (req, res) => {
  res.render("home");
});
 
app.use(authRoutes);

app.use(errorsHandlerMiddleware.handleErrors);
app.use("*", errorsHandlerMiddleware.handleNotFound);

db.connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log("Failed to connect to database");
    console.log(error);
  });
