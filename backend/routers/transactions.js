const express = require("express");
const Router = express.Router();
const Transactions = require("../models/transactions")

//a route to get all transactions in db
Router.get('/transactions/getAll', (req,res) =>{
    Transactions.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
});

//a route to get top 5 sells of all transactions
Router.get('/transactions/topSells', (req,res) =>{
    var topSells = []
        Transactions.aggregate([
            {$unwind:"$items"},
            {$match: {}},
            {$group: {_id:{title:"$items.title",price:"$items.price"},count:{$sum:1},}},
            {$sort:{count:-1}}
            ],function(err,result){
                if(result){
                    topSells = result.slice(0,5)
                    res.send(topSells);   
                }else{
                    res.sendStatus(400);
                }
        });
});

//a route to get top 5 unique sells of all transactions
Router.get('/transactions/uniqueSells', (req,res) =>{
    var uniqueSells = []
    Transactions.aggregate([/** project only needed fields & transform fields as you like */
        {$project: {"items":1}},//creates a new doc with only items inside
        {$unwind:"$items"},//breaks the array of items to objects
        {$group: {_id:{_id:"$_id", Name:"$items"}, count:{$sum:1}}},//arranges the new list be the following
        {$match: {count:{$gt:1}}},//searches for duplicates in every transaction and leaves in only the ones who are bigger then 1
        {$group: {_id: "$_id._id", "items":{$addToSet:"$_id.Name"}}},//groups the list to the following
        {$group:{_id: null,data: { $push: "$items" }}},//creates data array and pushes all the items arrays into it
        {$project:{_id: 0,data: {$reduce: {input: "$data",initialValue: [],in: { $concatArrays: ["$$this", "$$value"]}}}}},// reduces all the items arrays into one array called data
        {$unwind: "$data" },//breaks the array of data to objects
        {$group: { _id: {title:"$data.title",price:"$data.price"}, count:{$sum : 1}}},//counts the objects and builds them to the following
        {$sort:{count:-1}}//sorts the finished results by biggests to smallest
        ],function(err,result){
            if(result){
                uniqueSells = result.slice(0,5);
                res.send(uniqueSells);   
            }else{
                res.sendStatus(400);
            }
    });
});

//a route to get all transactions in the last 5 days
Router.get('/transactions/recentSells', (req,res) =>{
    Transactions.find(
        {
            "createdAt": 
            {
                $gte: new Date((new Date().getTime() - (50 * 24 * 60 * 60 * 1000)))//date of 5 days ago minus current date
            }
        }
        ).sort({ "createdAt": -1 })//sorts all dates from most recent to last in 5 days
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err)
        })
});

Router.post('/transactions/addNew',(req,res)=>{
    try{
        const transaction = new Transactions({
            items:req.body.items,
            price:req.body.price,
            city:req.body.city,
            street:req.body.street,
            buyer:req.body.buyer
        })
        transaction.save();
        res.send('transaction added');
    }catch{
        res.send('transaction failed');
    }
})

Router.post('/transactions/getAllByEmail', (req,res) =>{
    Transactions.find({buyer:req.body.email})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
});

module.exports = Router;