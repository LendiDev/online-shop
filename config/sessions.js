const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

const createSessionStore = () => {
  const MongoDBStore = mongoDbStore(session);

  return new MongoDBStore({
    uri: process.env.MONGODB_URI,
    databaseName: process.env.MONGODB_DB_NAME,
    collection: 'sessions',
  }, (error) => {
    console.log('MongoDBStore (Sessions) Error', error);
  });
}

const sessionConfig = () => {
  return {
    secret: process.env.SESSION_SECRET || "hardcoded secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    }
  }
}

module.exports = sessionConfig;
