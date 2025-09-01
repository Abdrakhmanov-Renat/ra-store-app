'use strict';

const express = require('express');
const authController = require('../controllers/auth.controller');
const catchError = require('../utils/catchError');

const authRouter = new express.Router();

authRouter.post('/registration', catchError(authController.register));
authRouter.post('/login', catchError(authController.login));
authRouter.post('/logout', catchError(authController.logout));
authRouter.get(
  '/activate/:activationToken',
  catchError(authController.activate),
);
authRouter.get('/refresh', catchError(authController.refresh));
// authRouter.post('/reset-email', catchError(authController.reset));
// authRouter.patch(
//   '/update-password/:updateToken',
//   catchError(authController.update),
// );

module.exports = authRouter;
