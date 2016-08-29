var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var userSchema = new Schema({
    username: {type: String, require: true, unique: true, sparse: true},
    password: {type: String, require: true},
    email: {type: String, require: true, unique: true, sparse: true},
    team: String, 
    listings: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User; 