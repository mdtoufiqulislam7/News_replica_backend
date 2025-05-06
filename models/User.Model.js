const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{type:String,required:[true,"provied name"]},
    email:{type:String,required:[true,"provied email"]},
    password:{type:String,required:true},
    refresh_token:{type:String,default:''},
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)