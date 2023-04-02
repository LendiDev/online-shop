const { MongoClient } = require("mongodb");
const configureEnvironment = require("../utils/env-config");

configureEnvironment();

let database;

const connectToDatabase = async () => {
  const client = await new MongoClient(process.env.MONGODB_URI);
  database = client.db(process.env.MONGODB_DB_NAME);
  return client;
};

const getDb = () => {
  if (!database) {
    throw "Unable establish connection to MongoDB";
  }
  return database;
};

module.exports = {
  connectToDatabase,
  getDb,
};
