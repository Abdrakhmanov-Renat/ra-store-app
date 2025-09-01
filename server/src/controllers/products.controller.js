'use strict';

const { ProductShort } = require('../models/ProductShort.model');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductShort.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getByIdProducts = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids) {
      return;
    }

    const products = await ProductShort.findAll({ where: { itemId: ids } });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts, getByIdProducts };
