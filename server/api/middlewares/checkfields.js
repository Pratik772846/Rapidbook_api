// check for whether some fields are missing or not
module.exports = (req,res,next)=>{
    const {invoice_number,invoice_date,customer_id,totalamount,year,account} = req.body;
    if(!invoice_number || !invoice_date || !customer_id ||!totalamount || !year || !account){
        res.status(500).json({
            message:"Some fields are missing"
        })
    }
    else{
        next();
    }
};