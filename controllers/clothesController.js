const uuid = require('uuid')
const path = require('path');
const {Clothes} = require('../models/models')
const ApiError = require('../error/ApiError');

class ClothesController {
    async create(req, res, next) {
        try {
            let {name, price, description, size, type} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', 'images', type, fileName))
            const clothes = await Clothes.create({name, img: fileName, description, price, type, size  });

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {type, limit, page} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit
        let clothes = await Clothes.findAndCountAll({where: {type}, limit, offset});

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const clothes = await Clothes.findOne(
            {
                where: {id},
                
                include: [{model: InputDeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new ClothesController()
