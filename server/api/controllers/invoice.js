const Invoice = require('../models/invoice.js');
const mongoose = require('mongoose');
const Account = require('../models/account.js');
const account = require('../models/account.js');

exports.createInvoice = (req,res,next)=>{
    const invoice = new Invoice({
        invoice_number: req.body.invoice_number,
        invoice_date: req.body.invoice_date,
        customer_id: req.body.customer_id,
        totalamount: req.body.totalamount,
        year: req.body.year,
        account: req.body.account
    });
    invoice.account.map((acc)=>{
        const {id,amount} = acc;
        Account.findById(id)
        .exec()
        .then((result)=>{
            if(!result){
                res.status(500).json({
                    message:"Account not found"
                })
            }
            else{
                for(let i=0;i<=2;i++){
                    if(result.balance[i].year == invoice.year){
                        result.balance[i].amount = result.balance[i].amount + amount;
                        console.log(result.balance[i].amount);
                        Account.updateOne({_id:id},{$set:{balance:result.balance}})
                        .exec()
                        .then((result)=>{
                            console.log(result);
                        })
                        .catch((err)=>{
                            console.log(err);
                        })

                    }
                }
            }
        })
    })
    invoice.save()
    .then((result)=>{
        res.status(201).json({
            message: 'Invoice created',
            createdInvoice: {
                _id: result._id,
                invoice_number: result.invoice_number,
                invoice_date: result.invoice_date,
                customer_id: result.customer_id,
                totalamount: result.totalamount,
                year: result.year,
                account: result.account,
            }
        });
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        });
    });
}


exports.invoicelist = async(req,res)=>{
    let skip = req.query.skip || 0;
    let limit = req.query.limit || Invoice.length;
    const search = req.query.search || "";
    const queryObject={};

    console.log(skip);
    console.log(limit);


    const allInvoice = await Invoice.find(queryObject)
    
    .select('invoice_number invoice_date customer_id totalamount year account')
    .populate('customer_id','name')
    .exec();

    const filteredInvoice = [];

    for(let i=0;i<allInvoice.length;i++){
        const searchTextLower = search.toLowerCase();
        console.log(searchTextLower);
        const invoiceNoLower = allInvoice[i].invoice_number.toLowerCase();
        console.log(invoiceNoLower);

        const amountString = allInvoice[i].totalamount.toFixed(2).toString();
        console.log(amountString);
        
          if(invoiceNoLower.includes(searchTextLower) ||amountString.includes(searchTextLower)){
                filteredInvoice.push(allInvoice[i]);
            }
        
    }

        
    const pagedinvoice = filteredInvoice.slice(skip,limit);
    try{
        res.status(200).json({
            count:pagedinvoice.length,
            invoices:pagedinvoice.map((doc)=>{
                return {
                    _id: doc._id,
                    invoice_number: doc.invoice_number,
                    invoice_date: doc.invoice_date,
                    customer_id: doc.customer_id,
                    totalamount: doc.totalamount,
                    year: doc.year,
                    account: doc.account
                }
            }
        )});
    }
    catch(err){
        res.status(500).json({
            error:err
        });
    }

};