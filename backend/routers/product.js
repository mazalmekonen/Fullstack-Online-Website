const express = require("express");
const Router = express.Router();
const Product = require("../models/product")

//a route to get all products in db
Router.get('/product/getAll', (req,res) =>{
    Product.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
});

//add new product to db based on sent params
Router.post('/product/addNew',(req,res)=>{
    var title = req.body.newProduct.title;
    var price = req.body.newProduct.price;
    var description = req.body.newProduct.description;
    var catagory = req.body.newProduct.catagory;
    var image = req.body.newProduct.image;
    var uploader = req.body.newProduct.uploader;
    Product.find({title:req.body.newProduct.title})
    .then((result)=>{
        if(result.length === 0 && price !== ""&& description !== ""&& image !== ""){
            const product = new Product({
                title,
                price,
                description,
                catagory,
                image,
                uploader
            })
            product.save();
            res.status(200).send('product added')
        }else{
            res.status(400).send('product exists already')
        }
    }).catch((err)=>{
        res.sendStatus(400);
    })
})

//delete route based on received title of product 
Router.post('/product/delete',(req,res)=>{
    var productTitle = req.body.titleToRemove;
    Product.find({title:productTitle}).deleteOne().exec()
    .then((result) => res.send("product removed"))
    .catch((err) => res.send(err))
})

//edit route based on received title of product
Router.post('/product/edit',(req,res)=>{
    var productTitle = req.body.newProduct.titleToEdit;
    var title = req.body.newProduct.title;
    var price = req.body.newProduct.price;
    var description = req.body.newProduct.description;
    var catagory = req.body.newProduct.catagory;
    var image = req.body.newProduct.image;
    var uploader = req.body.newProduct.uploader;
    Product.find({title:productTitle}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].title=title;
            doc[0].price=price;
            doc[0].description=description;
            doc[0].catagory=catagory;
            doc[0].image=image;
            doc[0].uploader = uploader;
            doc[0].save();
            res.status(200).send('product updated successfuly!'); 
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/product/getUserProducts',(req,res)=>{
    var uploader = req.body.email;
    Product.find({uploader:uploader})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
})

module.exports = Router;