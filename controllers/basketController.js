const {Basket, BasketClothes, Clothes} = require('../models/models')
const jwt = require('jsonwebtoken');


class BasketController {

    async getAll(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY);

            const basket = await Basket.findOne({where: {userId: user.id}})
            const basket_clothes = await BasketClothes.findAll({where : {basketId : basket.id}})

            const clothes = (await basket_clothes).map((value) => Clothes.findOne({where: {id : value.clotheId}}))

            return res.json(clothes)
        }
        catch (e) {
            return res.json(e.message)
        }
    }

    async deleteItem(req, res) {
        try {
            const {userId, clotheId} = req.body

            const basket = await Basket.findOne({where: {userId}})

            await BasketClothes.destroy({where: {clotheId, basketId: basket.id}})

            return res.json({message: "Item has been deleted"})
        }
        catch (e) {
            return res.json(e.message)
        }
    }

    async addItem(req, res, next) {

        try {
            const {userId, clotheId} = req.body

            const basket = await Basket.findOne({where: {userId}})
            const clothes = await Clothes.findOne({where: {id : clotheId}})

            await BasketClothes.create({basketId: basket.id, clotheId : clothes.id})

            const basket_clothes = await BasketClothes.findOne({where: {basketId: basket.id, clotheId : clothes.id}})
            return res.json({basket_clothes})
        }
        catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new BasketController()