const mongoose=require('mongoose');


module.exports=async (server)=>{
    try{
       // await mongoose.connect('mongodb://localhost/Accounts_CRUD');
       await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo connection successfull!!!".yellow.underline.bold);
        
        await server.listen(process.env.PORT || 5000,()=>{
            console.log(`server running on ${process.env.NODE_ENV} mode, port${process.env.PORT} !!!`)
        })
    } catch(err){
        console.log("Mongo Connection falied...");
        console.log(err);
        process.exit(1);
    }

}