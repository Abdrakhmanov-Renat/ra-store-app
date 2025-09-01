'use strict';

const express = require('express');
const cartController = require('../controllers/cart.controller');
const catchError = require('../utils/catchError');

const cartRouter = new express.Router();

cartRouter.get('/cart/:userId', catchError(cartController.getCartItems));
cartRouter.post('/cart/:userId', catchError(cartController.addCartItems));
cartRouter.delete('/cart/:userId/:productId', catchError(cartController.deleteCartItem));
cartRouter.patch('/cart/:userId/:productId', catchError(cartController.updateCartQuantity));

module.exports = cartRouter;
