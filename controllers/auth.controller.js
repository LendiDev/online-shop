const getLogin = (req, res) => {
  res.render('customer/auth/login');
}

const getSignup = (req, res) => {
  res.render('customer/auth/signup');
}

const signup = (req, res) => {
  // TODO: validate entered data
  // TODO: validate if user isn't exist already (email not in database)
  // TODO: hash the password
  // TODO: add new account to the database 
  res.status(200).send('this post request is not handled by the server yet');
}

module.exports = {
  getLogin,
  getSignup,
  signup
}