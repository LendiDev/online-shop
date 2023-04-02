const dotenv = require("dotenv");

const configureEnvironment = () => {
  const environment = process.env.NODE_ENV;

  dotenv.config({
    path: `.env.${environment}`,
  });

  envCheck();
};

const envCheck = () => {
  if (!process.env.MONGODB_URI) {
    throw Error("process.env.MONGODB_URI is not set");
  }

  if (!process.env.MONGODB_DB_NAME) {
    throw Error("process.env.MONGODB_DB_NAME is not set");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw Error("process.env.STRIPE_SECRET_KEY is not set");
  }

  if (!process.env.HOST_DOMAIN) {
    throw Error("process.env.HOST_DOMAIN is not set");
  }

};

module.exports = configureEnvironment;
