const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const accountlistRoutes = require('./api/routes/account.js');
const invoiceRoutes = require('./api/routes/invoice.js');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://Pratik:'+ process.env.MONGO_ATLAS_PW +'@cluster0.qyiczd2.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api', accountlistRoutes);
app.use('/api', invoiceRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;