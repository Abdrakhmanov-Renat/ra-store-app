'use strict';

const ApiError = require('../exception/api.error');
const cartService = require('../services/cart.service');

const getCartItems = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw ApiError.notFound({ user: userId });
  }

  const items = await cartService.getItems(userId);

  if (!items) {
    res.send(200);
  };

  res.status(200).json(items);
};

const addCartItems = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  if (!userId) {
    throw ApiError.notFound({ user: userId });
  }

  const { id, count, category } = req.body;

  console.log(id, count, category);

  if (!id || !count || !category) {
    throw ApiError.badRequest('Name is required', {
      name: 'Name is required',
    });
  }

  const items = await cartService.addItems(userId, id, count, category);

  if (!items) {
    res.send(404);
  };

  res.status(200).json(items);
};

const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  if (!productId || !userId) {
    throw ApiError.badRequest();
  }

  await cartService.deleteItem(userId, productId);

  res.sendStatus(201);
};

const updateCartQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    throw ApiError.badRequest();
  }

  await cartService.updateQuantity(userId, productId, quantity);

  res.sendStatus(200);
};

module.exports = {
  getCartItems,
  addCartItems,
  deleteCartItem,
  updateCartQuantity
};
