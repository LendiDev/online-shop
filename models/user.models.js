// Handles login, signup
const db = require("../database/database");
const bcrypt = require("bcryptjs");

class User {
  // TODO: handle address data
  constructor(email, password, fullname, street, postcode, city, country) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street,
      postcode,
      city,
      country,
    };
  }

  signup = async () => {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const result = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      createdAt: new Date().toISOString(),
      address: this.address,
    });

    return result;
  };

  getUserWithSameEmail = () => {
    return db.getDb().collection("users").findOne({ email: this.email });
  };

  // TODO: handle is user exists
  alreadyExists = async () => {
    const existingUser = await this.getUserWithSameEmail();
    return existingUser ? true : false;
  };

  passwordsAreMatching = (hashedPassword) => {
    return bcrypt.compare(this.password, hashedPassword);
  };
}

module.exports = User;
