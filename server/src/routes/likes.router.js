'use strict';

const express = require('express');
const likesController = require('../controllers/likes.controller');
const catchError = require('../utils/catchError');

const likeRouter = new express.Router();

likeRouter.get('/likes/:userId', catchError(likesController.getLikesItems));
likeRouter.post('/likes/:userId', catchError(likesController.addLikesItems));
likeRouter.delete('/likes/:userId/:productId', catchError(likesController.deleteLikesItem));

module.exports = likeRouter;
