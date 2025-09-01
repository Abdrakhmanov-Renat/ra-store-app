'use strict';

const { ProductAccessory } = require('../models/ProductAccessory.model');

const getAllAccessories = async (req, res, next) => {
  try {
    const accessories = await ProductAccessory.findAll();
    res.status(200).json(accessories);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAccessories };