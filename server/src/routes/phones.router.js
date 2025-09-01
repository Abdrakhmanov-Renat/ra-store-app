'use strict';

const express = require('express');
const phoneController = require('../controllers/phone.controller');
const catchError = require('../utils/catchError');

const phoneRouter = new express.Router();

phoneRouter.get('/phones', catchError(phoneController.getAllPhones));

module.exports = phoneRouter;