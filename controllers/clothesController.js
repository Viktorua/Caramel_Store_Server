const path = require("path");
const { Clothes } = require("../models/models");
const ApiError = require("../error/ApiError");
const axios = require("axios");
const express = require("express");
const app = express();

// const Controller = require('../Controller')

class ClothesController {
  async create(req, res, next) {
    try {
      const { type, description, size, price } = req.body;
      const file = req.files.image;
      const pathToFile = `../static/images/${file.name}`;

      file.mv(path.join(__dirname, pathToFile), (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      const clothes = await Clothes.create({
        type,
        description,
        size,
        price,
        img: file.name,
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
    return res.json(device);
  }
}

module.exports = new ClothesController();
