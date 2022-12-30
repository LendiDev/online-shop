const express = require("express");

const AuthController = require('../controllers/auth.controller');

const routes = express.Router();

routes.get('/login', AuthController.getLogin);
routes.get('/signup', AuthController.getSignup);

module.exports = routes;