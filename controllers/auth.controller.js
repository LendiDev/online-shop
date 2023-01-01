const User = require("../models/user.models");

const authUtil = require('../utils/authentication');

const getLogin = (req, res) => {
  res.render("customer/auth/login");
};

const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res, next) => {
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
    return res.redirect("/signup");
  }

  // TODO: validate entered data
  // such as confirm email and entered email matching
  // such as password strong enough
  // such as postcode matching the country requirements
  // collect all the errors and then return to the SIGNUP page with all the errors...

  try {
    await newUser.signup();
  } catch (error) {
    return next(error);
  }

  // TODO: validate if user isn't exist already (email not in database)
  // TODO: hash the password
  // TODO: add new account to the database
  res.redirect("/login");
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    console.log('Cannot login - user does not exists. Try again.')
    return res.redirect('/login');
  }

  let passwordIsCorrect;
  try {
    passwordIsCorrect = await user.passwordsAreMatching(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordIsCorrect) {
    console.log('Cannot login - wrong password. Try again.')
    return res.redirect('/login');
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect('products/')
  });
  
};

const logout = (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/');
};

module.exports = {
  getLogin,
  getSignup,
  signup,
  login,
  logout,
};
