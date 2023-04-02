const User = require("../models/user.model");
const authUtil = require("../utils/authentication");
const {
  userDetailsAreValid,
  emailIsConfirmed,
  emailIsValid
} = require("../utils/validation");
const sessionFlash = require("../utils/session-flash");

const getLogin = (req, res) => {
  let flashData = sessionFlash.getSessionData(req);

  if (!flashData) {
    flashData = {
      errorMessage: '',
      email: '',
      password: '',
    }
  }

  res.render("customer/auth/login", { inputData: flashData });
};

const getSignup = (req, res) => {
  let flashData = sessionFlash.getSessionData(req);

  if (!flashData) {
    flashData = {
      errorMessage: '',
      email: '',
      'confirm-email': '',
      password: '',
      'full-name': '',
      street: '',
      postcode: '',
      city: '',
      country: '',
    }
  }

  res.render("customer/auth/signup", { inputData: flashData });
};

const signup = async (req, res, next) => {
  // TODO: validate entered data
  // such as confirm email and entered email matching
  // such as password strong enough
  // such as postcode matching the country requirements
  // collect all the errors and then return to the SIGNUP page with all the errors...
  const enteredData = req.body;

  if (
    !userDetailsAreValid(
      enteredData.email,
      enteredData.password,
      enteredData["full-name"],
      enteredData.street,
      enteredData.postcode,
      enteredData.city,
      enteredData.country
    ) ||
    !emailIsConfirmed(enteredData.email, enteredData["confirm-email"])
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Please check your inputs",
        ...enteredData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  const newUser = new User(
    enteredData.email,
    enteredData.password,
    enteredData["full-name"],
    enteredData.street,
    enteredData.postcode,
    enteredData.city,
    enteredData.country
  );

  try {
    const userAlreadyExists = await newUser.alreadyExists();

    if (userAlreadyExists) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User already exists! Try login instead!",
          ...enteredData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }

    await newUser.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);

  if (!emailIsValid(user.email)) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid user credentials (e-mail format is incorrect)",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid user credentials",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  let passwordIsCorrect;
  try {
    passwordIsCorrect = await user.passwordsAreMatching(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid user credentials",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("products/");
  });
};

const logout = (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/");
};

module.exports = {
  getLogin,
  getSignup,
  signup,
  login,
  logout,
};
