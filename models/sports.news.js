const mongoose = require('mongoose')

const sportsSchema = new mongoose.Schema({
    title :{type:String ,required:true},
    image:{type:String ,default:''},
    description:{type:String ,required:true},
    tegs:{type:String ,default:''},
    category:{type:String,default:''}
})

module.exports = mongoose.Model('Sports',sportsSchema)