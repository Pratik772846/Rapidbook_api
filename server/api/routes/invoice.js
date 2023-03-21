const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Invoice = require('../models/invoice');
const Checktotalamount = require('../middlewares/checktotalamount.js');    
const Checkfield = require('../middlewares/checkfields.js')         
const Checkinvoice = require('../middlewares/checkinvoice.js')
const invoiceController = require('../controllers/invoice.js');
const checkAccountId = require('../middlewares/checkaccountid.js');

router.post('/createinvoice',Checkfield,Checktotalamount,Checkinvoice,checkAccountId,invoiceController.createInvoice);
router.get('/invoicelist',invoiceController.invoicelist);

module.exports = router;