require("dotenv").config();
const { MongoClient } = require("mongodb");

let database;

if (!process.env.MONGODB_URI) {
  throw Error('process.env.MONGODB_URI is not set')
}

if (!process.env.MONGODB_DB_NAME) {
  throw Error('process.env.MONGODB_DB_NAME is not set')
}

const connectToDatabase = async () => {
  const client = await new MongoClient(process.env.MONGODB_URI);
  database = client.db(process.env.MONGODB_DB_NAME);
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
