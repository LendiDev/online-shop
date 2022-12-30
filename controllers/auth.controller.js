const getLogin = (req, res) => {
  res.render('pages/auth/login');
}

const getSignup = (req, res) => {
  res.render('pages/auth/signup');
}

module.exports = {
  getLogin,
  getSignup
}



