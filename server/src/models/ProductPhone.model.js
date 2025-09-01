'use strict';

const { DataTypes } = require('sequelize');
const { client } = require('../utils/db');

const ProductPhone = client.define(
  'ProductPhone',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namespaceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    priceRegular: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceDiscount: {
      type: DataTypes.INTEGER,
    },
    colorsAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resolution: {
      type: DataTypes.STRING,
    },
    processor: {
      type: DataTypes.STRING,
    },
    ram: {
      type: DataTypes.STRING,
    },
    camera: {
      type: DataTypes.STRING,
    },
    zoom: {
      type: DataTypes.STRING,
    },
    cell: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    tableName: 'products_phones_full_diplom',
    schema: 'diplom',
    updatedAt: false,
    createdAt: false,
  }
);

module.exports = {
  ProductPhone,
};
