'use strict';

const express = require('express');
const accessoriesController = require('../controllers/accessories.controller');
const catchError = require('../utils/catchError');

const accessoriesRouter = new express.Router();

accessoriesRouter.get(
  '/accessories',
  catchError(accessoriesController.getAllAccessories)
);

module.exports = accessoriesRouter;