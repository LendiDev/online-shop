const bcrypt = require("bcryptjs");

const formattedUsers = async (users) => {
  const promises = users.map(async (user) => {
    return {
      ...user,
      password: await bcrypt.hash(user.password, 12),
    };
  });

  const formattedUsers = await Promise.all(promises);
  return formattedUsers;
};

module.exports = { formattedUsers };
