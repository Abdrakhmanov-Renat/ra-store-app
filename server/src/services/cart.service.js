'use strict';

const { Cart } = require('../models/Cart.model');

async function getItems(userId) {
  const cart = await Cart.findAll({ where: { userId: userId } });

  if (!cart) {
    return null;
  }

  return cart;
}

async function addItems(userId, itemId, quantity, category) {
  const cart = await Cart.create({
    userId,
    itemId,
    quantity,
    category,
  });

  if (!cart) {
    return null;
  }

  return cart;
}

async function deleteItem(userId, productId) {
  await Cart.destroy({
    where: {
      userId,
      itemId: productId,
    },
  });
}

async function updateQuantity(userId, itemId, quantity) {
  await Cart.update(
    { quantity },
    { where: { userId, itemId } }
  );
}

module.exports = {
  getItems,
  addItems,
  deleteItem,
  updateQuantity
};