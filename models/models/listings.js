var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var listingSchema = new Schema({
    pokemon: Number,
    cp: Number, 
    hp: Number,
    move1: String,
    move2: String,
    price: Number,
    trade: Boolean,
    owner: String
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing; 