'use strict';

const { ProductPhone } = require('../models/ProductPhone.model');

const getAllPhones = async (req, res, next) => {
  try {
    const phones = await ProductPhone.findAll();
    res.status(200).json(phones);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPhones };