const mongoose = require("mongoose");
 
const taskSchema = new mongoose.Schema(
  {
    taskId:{
       type:Number,
       trim:true,
       unique:true,
       required:[true, "Task Id is required"]
    },
    taskname: {
      type: String,
      trim: true,
      required: [true, "Task name is required"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "description is required"],
      },
    assignto: {
      type: String,
      trim: true,
      // required: [true, "assignto is required"],
    },
    priority: {
      type: String,
      trim: true,
      required: [true, "priority is required"],
    },
    status: {
        type: String,
        trim: true,
        required: [true, "status is required"],
      },
   duration:{
    type:String,
    trim:true,
    required:[true,"Duration is required"]
   },
   notifications:{
    type: String,
    trim: true,
   },
   comments:{
    type: String,
    trim: true,
   },
   updatedDate:{
     type:String,
     trim:true,
   }
 
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
 
 
module.exports = mongoose.model("task", taskSchema);