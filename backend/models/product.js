const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const productScheme = new Scheme({
    title:{type:String, required:true, unique:true},
    price:{type:String, required:true},
    description:{type:String, required:true},
    catagory:{type:String,required:true},
    image:{type:String, required:true},
    uploader:{type:String,requiered:true}
})

const Product = mongoose.model('Product',productScheme)
module.exports = Product;