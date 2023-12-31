const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
    {
        name: String,
        address: String,
        typeOfFood: String,
        immagine: String,
        posizione: String,
    }
);

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;