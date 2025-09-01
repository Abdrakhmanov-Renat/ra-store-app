'use strict';

const { DataTypes } = require('sequelize');
const { client } = require('../utils/db');

const ProductShort = client.define(
  'ProductShort',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    screen: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    ram: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'products_short_diplom',
    schema: 'diplom',
    updatedAt: false,
    createdAt: false,
  }
);

module.exports = {
  ProductShort,
};
