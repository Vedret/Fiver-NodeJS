const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const PromoCodeSchema = new Schema({
    name : String,
    discount: Number
});

module.exports=mongoose.model('Promocode',PromoCodeSchema);