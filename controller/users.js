const User=require('../models/register')

exports.getUsers=async(req,res,next)=>{
    try{
        const users= await User.find();
         res.status(200).json(users);
    }
    catch(error){
    res.status(500).json({message:'Interval Server Error'})
    }
}