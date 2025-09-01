'use strict';

const ApiError = require('../exception/api.error');
const likesService = require('../services/likes.service');

const getLikesItems = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw ApiError.notFound({ user: userId });
  }

  const items = await likesService.getItems(userId);

  if (!items) {
    res.send(200);
  };

  res.status(200).json(items);
};

const addLikesItems = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw ApiError.notFound({ user: userId });
  }

  const { id, category } = req.body;

  if (!id || !category) {
    throw ApiError.badRequest();
  }

  const items = await likesService.addItems(userId, id, category);

  if (!items) {
    res.send(404);
  };

  res.status(200).json(items);
};

const deleteLikesItem = async (req, res) => {
  const { userId, productId } = req.params;

  if (!productId || !userId) {
    throw ApiError.badRequest();
  }

  await likesService.deleteItem(userId, productId);

  res.sendStatus(201);
};

module.exports = {
  getLikesItems,
  addLikesItems,
  deleteLikesItem
};
