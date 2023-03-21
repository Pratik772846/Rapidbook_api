const Invoice = require('../models/invoice');

module.exports=(req,res,next)=>{
    const {invoice_number,year}= req.body;
    Invoice.find({invoice_number:invoice_number,year:year})
    .exec()
    .then((result)=>{
        if(result.length>=1){
            res.status(500).json({
                message:"Invoice already exists"
            })
        }
        else{
            next();
        }
    })
}