const handleErrors = (error, req, res, next) => {
  console.log(error);
  res.status(500).render("errors/500");
};

const handleNotFound = (req, res, next) => {
  res.status(404).render("errors/404");
};

const handleInternalErrors = (error, req, res) => {
  console.log(error);
  res.status(500).render("errors/500");
};

module.exports = { 
  handleErrors,
  handleNotFound,
  handleInternalErrors
};



