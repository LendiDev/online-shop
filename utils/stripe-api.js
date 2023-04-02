const stripe = require("stripe");

const stripeAPI = stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripeAPI;
