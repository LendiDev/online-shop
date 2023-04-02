const pagination = (pageNum = 0, limit = 10) => {
  return { skip: pageNum * limit, limit };
};

module.exports = pagination;