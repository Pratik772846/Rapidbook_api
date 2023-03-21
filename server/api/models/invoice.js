const mongoose  = require('mongoose');

const invoiceSchema = mongoose.Schema({
    invoice_number : {type:String, required:true},
    invoice_date : {type:Date, required:true},
    customer_id : {type:mongoose.Schema.Types.ObjectId, ref:'Account', required:true},
    totalamount : {type:Number, required:true},
    year : {type:String, required:true},
    account : [{id: {type:mongoose.Schema.Types.ObjectId, ref:'Account', required:true}, amount: {type:Number, required:true}}],
});

module.exports = mongoose.model('Invoice', invoiceSchema);

// Path: server/api/models/Account.js