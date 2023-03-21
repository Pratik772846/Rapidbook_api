const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/account');
const accountController = require('../controllers/account.js');

router.post('/createaccount',accountController.createAccount);


module.exports = router;