const mongoDbStore = require("connect-mongodb-session");


const sessionStore = (session) => {
  const MongoDBStore = mongoDbStore(session);
  return new MongoDBStore({
    uri: process.env.MONGODB_URI,
    databaseName: process.env.MONGODB_DB_NAME,
    collection: 'sessions',
  });
}

const sessionConfig = (session) => {
  return {
    secret: process.env.SESSION_SECRET || "hardcoded secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore(session),
  }
}


module.exports = sessionConfig;