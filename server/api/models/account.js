const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    account_name : {type:String, required:true},
    balance : [{year:{type:String, required:true}, amount:{type:Number, required:true}}],
});

module.exports = mongoose.model('Account', accountSchema);