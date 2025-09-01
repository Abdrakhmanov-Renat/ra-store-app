'use strict';

const { ProductTablet } = require('../models/ProductTablet.model');

const getAllTablets = async (req, res, next) => {
  try {
    const tablets = await ProductTablet.findAll();
    res.status(200).json(tablets);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTablets };