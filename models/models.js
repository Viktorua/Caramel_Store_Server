const database = require('../db')
const {DataTypes} = require('sequelize')


const User = database.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, notNull: true},
    password: {type: DataTypes.STRING, notNull: true},
    name: {type: DataTypes.STRING,  notNull: true},
    surname: {type: DataTypes.STRING, notNull: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Clothes = database.define('clothes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    price: {type: DataTypes.INTEGER},
    type: { type: DataTypes.STRING},
    size: {type: DataTypes.INTEGER}
})


const Basket = database.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketClothes = database.define('basket_clothes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketClothes)
BasketClothes.belongsTo(Basket)

Clothes.hasMany(BasketClothes)
BasketClothes.belongsTo(Clothes)


module.exports = {
    User,
    Basket,
    Clothes,
    BasketClothes
}