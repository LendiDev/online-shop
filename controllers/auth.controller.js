const getLogin = (req, res) => {
  res.render('customer/auth/login');
}

const getSignup = (req, res) => {
  res.render('customer/auth/signup');
}

module.exports = {
  getLogin,
  getSignup
}



