const mongoose=require("mongoose");
const Schema=mongoose.Schema

const adminSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phone:{
        type:Number,
        // requird:true,
    },
    password:{
        type:String,
        // requird:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles",
        // requird:true
       },
       email:{
        type:String,
        
       }
})

module.exports=mongoose.model("admin",adminSchema)