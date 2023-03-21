const Account = require('../models/account.js');
const Invoice  = require('../models/invoice.js');
const mongoose = require('mongoose');
exports.createAccount = (req,res)=>{
    const account = new Account({
        account_name: req.body.account_name,
        balance: req.body.balance
    });
    account.save()
    .then((result)=>{
        res.status(201).json({
            message: 'Account created',
            createdAccount: {
                id:result._id,
                account_name: result.account_name,
                balance: result.balance,
            }
        });
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        });
    });
}

