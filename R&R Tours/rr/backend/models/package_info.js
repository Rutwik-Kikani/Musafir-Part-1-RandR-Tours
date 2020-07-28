var mongoose = require('mongoose');

var packageSchema = mongoose.Schema({
    pid:{type:String, require:true},
    day:{type:String, require:true},
    description:{type:Number, require:true} 
});
module.exports = mongoose.model('package_info', packageSchema);