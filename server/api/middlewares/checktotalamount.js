// Checks for total amount and whether account array is empty or not 
module.exports = (req,res,next)=>{
    const account = req.body.account;
    const totalamount = req.body.totalamount;
    if(account.length===0){
        res.status(500).json({
            message:"account array is empty"
        })
    }
    else{
        let sum =0;
        account.map((it)=>{
            sum = sum + it.amount;
        })
        if(totalamount===sum ){
            next();
        }
        else{
            res.status(500).json({
                message : "total amount doesnot match"
            });
        }
    }
    
};