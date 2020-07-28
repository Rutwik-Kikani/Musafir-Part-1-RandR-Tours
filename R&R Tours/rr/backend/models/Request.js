var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
    firstname:{type:String, require:true},
    lastname:{type:String, require:true},
    email:{type:String, require:true},
    phone:{type:Number, require:true}
});
module.exports = mongoose.model('Request', requestSchema); 