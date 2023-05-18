const { Basket, BasketClothes, Clothes } = require("../models/models");
const jwt = require("jsonwebtoken");

class BasketController {
  async getAll(req, res) {
    try {
      const { userId } = req.body;
      // const token = req.headers.authorization.split(" ")[1];
      // const user = jwt.verify(token, process.env.SECRET_KEY);

      const basket = await BasketClothes.findOne({
        where: { basketId: userId },
      });
      // const basket_clothes = await BasketClothes.findAll({
      //   where: { basketId: basket.id },
      // });

      const clothes = (await basket).map((value) =>
        Clothes.findOne({ where: { id: value.clotheId } })
      );

      return res.json(clothes);
    } catch (e) {
      return res.json(e.message);
    }
  }

  async deleteItem(req, res) {
    try {
      const { userId, clotheId } = req.body;

      const basket = await Basket.findOne({ where: { userId } });

      await BasketClothes.destroy({ where: { clotheId, basketId: basket.id } });

      return res.json({ message: "Item has been deleted" });
    } catch (e) {
      return res.json(e.message);
    }
  }

  async addItem(req, res, next) {
    try {
      console.log(req.body);
      const {
        userId,
        clotheId,
        // type,
        // description,
        // size,
        // price,
        // img,
        // style,
        // color,
      } = req.body;

      // const basket = await Basket.findOne({ where: { id: userId } });
      // const clothes = await Clothes.findOne({ where: { id: clotheId } });

      await BasketClothes.create({
        id: clotheId,
        clotheId,
        basketId: userId,
        type: req.body.type,
        description: req.body.description,
        size: req.body.size,
        price: req.body.price,
        img: req.body.img,
        style: req.body.style || "длтлд",
        color: req.body.color || "красный",
      });

      // const basket_clothes = await BasketClothes.findOne({
      //   where: { basketId: userId, id: clotheId },
      // });

      // console.log("sdf", basket_clothes);

      return res.json({});
    } catch (e) {
      return res.json(e.message);
    }
  }
}

module.exports = new BasketController();
