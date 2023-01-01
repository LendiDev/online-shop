const User = require("../models/user.models");

const getLogin = (req, res) => {
  res.render("customer/auth/login");
};

const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res) => {
  const newUser = new User(
    req.body.email,
    req.body.password,
    req.body["full-name"],
    req.body.street,
    req.body.postcode,
    req.body.city,
    req.body.country
  );

  const userAlreadyExists = await newUser.alreadyExists();

  if (userAlreadyExists) {
    //TODO: handle error
    console.log("user already exists");
    return res.redirect('/signup');
  }

  // TODO: validate entered data
  // such as confirm email and entered email matching
  // such as password strong enough
  // such as postcode matching the country requirements
  // collect all the errors and then return to the SIGNUP page with all the errors...

  await newUser.signup();

  // TODO: validate if user isn't exist already (email not in database)
  // TODO: hash the password
  // TODO: add new account to the database
  res.redirect('/login');
};

module.exports = {
  getLogin,
  getSignup,
  signup,
};
