'use strict';

const { Like } = require('../models/Like.model');

async function getItems(userId) {
  const likes = await Like.findAll({ where: { userId: userId } });

  if (!likes) {
    return null;
  }

  return likes;
}

async function addItems(userId, itemId, category) {
  const like = await Like.create({
    userId,
    itemId,
    category,
  });

  if (!like) {
    return null;
  }

  return like;
}

async function deleteItem(userId, productId) {
  await Like.destroy({
    where: {
      userId,
      itemId: productId,
    },
  });
}

module.exports = {
  getItems,
  addItems,
  deleteItem
};