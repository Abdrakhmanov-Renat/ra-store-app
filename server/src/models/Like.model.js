'use strict';

const { DataTypes } = require('sequelize');
const { client } = require('../utils/db');
const { User } = require('./User.model');

const Like = client.define(
  'Like',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'like_diplom',
    schema: 'diplom',
  },
);

Like.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = {
  Like,
};
