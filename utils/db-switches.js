const getSortBy = (sort) => {
  switch (sort) {
    case "id":
      return "_id";
    case "title":
      return "title";
    default:
      return "_id";
  }
};

const getOrderBy = (order) => {
  switch (order) {
    case "ASC":
      return -1;
    case "DESC":
      return 1;
    default:
      return 0;
  }
};

module.exports = { getSortBy, getOrderBy };
