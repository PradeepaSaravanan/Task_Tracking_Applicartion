const Task=require("../models/tasks");

exports.createTask=async(req,res,next)=>{
    try{
     const task= await Task.create(req.body);
      res.status(201).json(task);
    }catch(error){
     console.log(error.message)
     res.status(500).send({message:error.message});
    }
 }

 exports.updateTask=async(req,res)=>{
    try{
      const tasks= await Task.findByIdAndUpdate(req.params.id,req.body);
      res.status(200).json(tasks)
  
    }catch(error){
    res.status(500).json({message:"Internal server Error"});
    }
  }

  exports.getAllTasks=async(req,res,next)=>{
    try{
        const getTask= await Task.find();
         res.status(200).json(getTask);
    }
    catch(error){
    res.status(500).json({message:'Interval Server Error'})
    }
}


  exports.deleteTask=async(req,res)=>{
    try{
        const dlt= await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(dlt)
    } catch(error){
      res.status(500).json({message:"Internal Server error"});
    }
  }

  exports.getOneTask=async(req,res,next)=>{
    try{
        const task= await Task.findById(req.params.id);
         res.status(200).json(task);
    }
    catch(error){
    res.status(500).json({message:'Interval Server Error'})
    }
}
exports.getUserTask=async(req,res,next)=>{
  try{
    const id = req.params.id;
    const cas=new RegExp(`${id}`,'i');
      // const task1= await Task.find({"assignto":req.query.assignto});
      //  res.status(200).json(task1);
      const taskid=await Task.find({status:{$regex:cas} }).lean();
      const getid = await Task.find({ status:{$regex:cas} }).lean();
      const getname = await Task.find({ taskname: {$regex:cas} }).lean();
      const getdescription = await Task.find({ description: {$regex:cas} }).lean();
      const getpriority = await Task.find({ priority: {$regex:cas} }).lean();
      const getduration = await Task.find({ duration: {$regex:cas} }).lean();
      const getassign = await Task.find({ assignto: {$regex:cas} }).lean();
      var result;
      if (getid.length!=0) {
          result=getid;
          console.log("Status",result);
      }
      else if (getname.length!=0) {
          result=getname;
          console.log("Taskname",result);
      }
      else if (getdescription.length!=0) {
          result=getdescription;
          console.log("des",result);
      }
      else if (getpriority.length!=0) {
          result=getpriority;
          console.log("priority",result);
      }
      else if (getduration.length!=0) {
          result=getduration;
          console.log("duration",result);
      }
      else if(getassign.length!=0){
          result=getassign;
      }
      else if(taskid,length!=0){
        result=taskid;
      }
 
      console.log("NOTHING>>>>>>>>>>>>>>>>>>>.",result)
      res.status(200).json(result)
  }
  catch(error){
  res.status(500).json({message:'Interval Server Error'})
  }
}

exports.getSpecificTasks=async(req,res,next)=>{
  try{
    const task1= await Task.find({"assignto":req.query.assignto});
       res.status(200).json(task1);
  }
  catch(error){
    res.status(500).json({message:'Interval Server Error'})
    }
}