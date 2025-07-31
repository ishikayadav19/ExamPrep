const mongoose = require('mongoose');
const examineeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    status:{
        enum:['active','inactive','delete'],
    },
    
})


module.exports = mongoose.model('Examinee', examineeSchema); //Examinee model bana diya //exports examineeSchema as a model named 'Examinee',