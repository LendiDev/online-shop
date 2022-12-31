const getLogin = (req, res) => {
  res.render('customer/auth/login');
}

const getSignup = (req, res) => {
  res.render('customer/auth/signup');
}

const signup = (req, res) => {
  console.log(req.body);
  // TODO: validate entered data
  // TODO: validate if user isn't exist already (email not in database)
  // TODO: hash the password
  // TODO: add new account to the database 
  res.status(200).json(req.body);
  
}

module.exports = {
  getLogin,
  getSignup,
  signup
}