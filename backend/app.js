const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const transactions = require("./routers/transactions");
const product = require("./routers/product");
const user = require('./routers/user');

//establish server uses
app.use(cors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(product);
app.use(transactions);
app.use(user);

//establish db connection and port listening
const mongoose = require('mongoose')
const dbURL = 'mongodb+srv://mazal:02081990@cluster0.i1weq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res)=>{
    console.log("db connected")
    app.listen(port,()=>{
      console.log("listening on port " + port);
    });
  })
  .catch((err)=>{console.log(err)});
  

