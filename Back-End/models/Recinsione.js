const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecinsioneSchema = new Schema(
    {
        restaurantId: String,
        text: String,
        autore: String,
        vote: Number,
        price: Number, 
    }
);

const Recinsione = mongoose.model('Recinsione', RecinsioneSchema);

module.exports = Recinsione;