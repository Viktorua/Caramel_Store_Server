const path = require("path");
const { Clothes } = require("../models/models");
const ApiError = require("../error/ApiError");
const express = require("express");

class ClothesController {
  async create(req, res, next) {
    try {
      const { type, description, size, price } = req.body;
      const { file } = req;

      const clothes = await Clothes.create({
        type,
        description,
        size,
        price,
        img: file.filename,
      });

      return res.json(clothes);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    // const { type = '', limit = 8, page = 1 } = req.body;
    // const offset = page * limit - limit;
    // const clothes = await Clothes.findAndCountAll({ where: { type }, limit, offset });
    const clothes = await Clothes.findAll();

    return res.json(clothes);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const clothes = await Clothes.findOne({
      where: { id },

      include: [{ model: InputDeviceInfo, as: "info" }],
    });
    return res.json(clothes);
  }
}

module.exports = new ClothesController();
