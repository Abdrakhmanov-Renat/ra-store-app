'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleWare = require('../middlewares/auth.middleware');
const catchError = require('../utils/catchError');

const userRouter = new express.Router();

userRouter.patch(
  '/change-name',
  authMiddleWare.authMiddleWare,
  catchError(userController.changeName),
);

userRouter.patch(
  '/change-password',
  authMiddleWare.authMiddleWare,
  catchError(userController.changePass),
);

userRouter.patch(
  '/change-email',
  authMiddleWare.authMiddleWare,
  catchError(userController.changeEmail),
);

module.exports = userRouter;
