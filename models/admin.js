const mongoose = require('mongoose')

const AdminSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            trim:true,
        },
        email:{
            type:String,
            trim:true,
            unique:true 
        },
        password:{
            type:String,
            trim:true
        },
       
    }
    
)

module.exports = mongoose.model("Admin",AdminSchema)