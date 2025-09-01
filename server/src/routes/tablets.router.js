'use strict';

const express = require('express');
const tabletController = require('../controllers/tablet.controller');
const catchError = require('../utils/catchError');

const tabletsRouter = new express.Router();

tabletsRouter.get('/tablets', catchError(tabletController.getAllTablets));

module.exports = tabletsRouter;