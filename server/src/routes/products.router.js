'use strict';

const express = require('express');
const productsController = require('../controllers/products.controller');
const catchError = require('../utils/catchError');

const productRouter = new express.Router();

productRouter.get('/products', catchError(productsController.getAllProducts));
productRouter.post('/products/many', catchError(productsController.getByIdProducts));

module.exports = productRouter;