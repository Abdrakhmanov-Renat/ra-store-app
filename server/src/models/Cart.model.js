'use strict';

const { DataTypes } = require('sequelize');
const { client } = require('../utils/db');
const { User } = require('./User.model');

const Cart = client.define(
  'Cart',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'cart_diplom',
    schema: 'diplom',
  },
);

Cart.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = {
  Cart,
};
