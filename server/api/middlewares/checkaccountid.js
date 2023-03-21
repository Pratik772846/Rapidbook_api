const Account = require('../models/account');

module.exports = (req,res,next)=>{
    const {account} = req.body;
    if(!account){
        res.status(500).json({
            message:"Some fields are missing"
        })
    }
    else{
        account.map((acc)=>{
            const {id} = acc;
            Account.findById(id)
            .exec()
            .then((result)=>{
                if(!result){
                    res.status(500).json({
                        message:"Account not found"
                    })
                }
                else{
                    next();
                }
            })
        })
    }
}