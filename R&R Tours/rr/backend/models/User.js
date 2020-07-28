var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstname:{type:String, require:true},
    lastname:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    phone:{type:Number, require:true},
});
module.exports = mongoose.model('User', userSchema); 