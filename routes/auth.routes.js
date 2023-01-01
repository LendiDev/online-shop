const express = require("express");

const AuthController = require('../controllers/auth.controller');

const routes = express.Router();

routes.get('/login', AuthController.getLogin);
routes.get('/signup', AuthController.getSignup);

routes.post('/signup', AuthController.signup);
routes.post('/login', AuthController.login);

module.exports = routes;