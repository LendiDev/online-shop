// Handles login, signup
const db = require("../database/database");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

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
      createdAt: new Date(),
      address: this.address,
    });

    return result;
  };

  static findById = (userId) => {
    const uid = new ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
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
