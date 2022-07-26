const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const user = new Scheme({
    email:{type:String, required:true, unique:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    password:{type:String, required:true},
    city:{type:String, required:true},
    street:{type:String, required:true},
    role:{type:String, required:true}
})

const User = mongoose.model('Users',user)
module.exports = User;