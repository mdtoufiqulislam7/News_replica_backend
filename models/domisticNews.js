const mongoose = require('mongoose')

const domisticSchema = new mongoose.Schema({
    title :{type:String ,required:true},
    image:{type:String ,default:''},
    description:{type:String ,required:true},
    tegs:{type:String ,default:''},
    category:{type:String,default:''}
})

module.exports = mongoose.Model('Domistic',domisticSchema)