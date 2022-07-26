const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const transactionsScheme = new Scheme({
    items:{type:Array, required:true},
    price:{type:String, required:true},
    city:{type:String,required:true},
    street:{type:String,required:true},
    buyer:{type:String,required:true},
},{timestamps:true})

const Transactions = mongoose.model('Transactions',transactionsScheme)
module.exports = Transactions;