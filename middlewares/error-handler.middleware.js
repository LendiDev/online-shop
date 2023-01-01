const handleErrors = (error, req, res, next) => {
  console.log(error);
  res.status(500).render("errors/500");
};

const handleNotFound = (req, res) => {
  res.status(404).render("errors/404");
};

module.exports = { 
  handleErrors,
  handleNotFound,
};



