var mongoose = require('mongoose');

var packageSchema = mongoose.Schema({
    pid:{type:String, require:true},
    pname:{type:String, require:true},
    days:{type:Number, require:true},
    price:{type:String, require:true}
});
module.exports = mongoose.model('package', packageSchema); 