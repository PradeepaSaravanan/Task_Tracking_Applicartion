const mongoose = require('mongoose')

const UserSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            trim:true
        },
        // mobile:{
        //     type:Number,
        //     trim:true
        // },
        email:{
            type:String,
            trim:true,
            unique:true
        },
        // role:{
        //     type:String,
        //     trim:true,

        // }
    }
    
)

module.exports = mongoose.model("Users",UserSchema)