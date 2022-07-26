const express = require("express");
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Product = require("../models/product");


const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.status(400).send("it seems you are'nt logged in please log in and try again");
    }else{
        jwt.verify(token, "someSecret", (err,decoded)=>{
            if(err){
                res.status(400).send('you failed to authenticate');
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}
//a route to get all products in db
Router.get('/user/getAll', (req,res) =>{
    User.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
});


//delete route based on received email of account 
Router.post('/user/delete',(req,res)=>{
    User.findOne({email:req.body.user.email})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.user.password,user.password,function(err,result){
                    if(err){
                        res.status(400).json({
                            error:err
                        })
                    }
                    if(result){
                        User.find({email:req.body.user.email}).deleteOne().exec()
                        .then((result) => {
                            Product.deleteMany({uploader:req.body.user.email}).then(res=>{console.log(res)})
                            res.send("user removed");
                        })
                        .catch((err) => res.send(err))
                    }else{
                        res.status(404).json({message:'Password does not match!'});
                    }
                })
            }else{
                res.status(404).json({message:'No user found!'});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
})

Router.post('/user/admin/delete',(req,res)=>{
    User.findOne({email:req.body.user.email})
        .then((user)=>{
            if(user){
                User.find({email:req.body.user.email}).deleteOne().exec()
                .then((result) => {
                Product.deleteMany({uploader:req.body.user.email}).then(res=>{console.log(res)})
                res.send("user removed");
                })
                .catch((err) => res.send(err))
            }else{
                res.status(404).json({message:'No user found!'});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
})

//add new account to db based on sent params
Router.post('/user/addNew',(req,res)=>{
    var email = req.body.newUser.email;
    var firstName = req.body.newUser.firstName;
    var lastName = req.body.newUser.lastName;
    var street = req.body.newUser.street;
    var city = req.body.newUser.city;
    var role = "customer";
    bcrypt.hash(req.body.newUser.password,10,function(err,hashedPass){
        if(err){
            res.status(400).json({
                error:err
            })
        }
        User.find({email:req.body.newUser.email})
        .then((result)=>{
            if(result.length === 0){
                const newUser = new User({
                    email:email,
                    firstName,
                    lastName,
                    password:hashedPass,  
                    city,
                    street,
                    role
                })
                newUser.save();
                res.status(200).json({message:"User Added Successfully!"});
            }else{
                res.status(400).json({message:"User exists already!"});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
    })
})

//edit route based on received email of email
Router.post('/user/edit',(req,res)=>{
    var userEmail = req.body.newAccount.emailToEdit;
    var email = req.body.newAccount.email;
    var firstName = req.body.newAccount.firstName;
    var lastName = req.body.newAccount.lastName;
    var city = req.body.newAccount.city;
    var street = req.body.newAccount.street;
    User.find({email:userEmail}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].email=email;
            doc[0].firstName=firstName;
            doc[0].lastName=lastName;
            doc[0].city=city;
            doc[0].street=street;
            doc[0].save();
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/user/login',(req,res)=>{
    User.findOne({email:req.body.user.email})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.user.password,user.password,function(err,result){
                    if(err){
                        res.status(400).json({
                            error:err
                        })
                    }
                    if(result){
                        const token = jwt.sign({user},'someSecret',{expiresIn:300});
                        res.status(200).json({message:'Login successfully!',auth:true,token:token});
                    }else{
                        res.status(404).json({message:'Password does not match!'});
                    }
                })
            }else{
                res.status(404).json({message:'No user found!'});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
})

Router.get('/user/userAuth',verifyJWT,(req,res)=>{
    res.send('auth approved');
});

Router.post('/user/getData',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                const userToReturn = {
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    city:user.city,
                    street:user.street
                }
                res.status(200).send(userToReturn);
            }else{
                res.status(404).send("cant find user");
            }
        }).catch(err=>{
            res.status(400).send(err);
        })
})

Router.post('/user/editEmail',(req,res)=>{
    var userEmail = req.body.user.emailToEdit;
    var email = req.body.user.email;
    User.find({email:userEmail}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].email=email;
            doc[0].save();
            Product.find({uploader:userEmail},(err,doc)=>{
                if(err){
                    res.status(400).send('something went wrong!');
                }
                doc.forEach(product=>{
                    product.uploader=email;
                    product.save();
                })
            })
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/user/editFirstName',(req,res)=>{
    var userFirstName = req.body.user.firstName;
    var email = req.body.user.email;
    User.find({email:email}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].firstName=userFirstName;
            doc[0].save();
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/user/editLastName',(req,res)=>{
    var userLastName = req.body.user.lastName;
    var email = req.body.user.email;
    User.find({email:email}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].lastName=userLastName;
            doc[0].save();
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/user/editCity',(req,res)=>{
    var userCity = req.body.user.city;
    var email = req.body.user.email;
    User.find({email:email}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].city=userCity;
            doc[0].save();
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/user/editStreet',(req,res)=>{
    var userStreet = req.body.user.street;
    var email = req.body.user.email;
    User.find({email:email}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].street=userStreet;
            doc[0].save();
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
    })
})

Router.post('/user/editPassword',(req,res)=>{
    User.findOne({email:req.body.user.email})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.user.password,user.password,function(err,result){
                    if(err){
                        res.status(400).json({
                            error:err
                        })
                    }
                    if(result){
                        bcrypt.hash(req.body.user.passwordToEdit,10,function(err,hashedPass){
                            if(err){
                                res.status(400).json({
                                    error:err
                                })
                            }
                            user.password=hashedPass;
                            user.save();
                            res.send("user edited");
                        })
                    }else{
                        res.status(404).json({message:'Password does not match!'});
                    }
                })
            }else{
                res.status(404).json({message:'No user found!'});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
})

module.exports = Router;