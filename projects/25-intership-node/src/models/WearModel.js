const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const WearSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },

    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    phoneNo:{
        type:Number,
        unique:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },


  } , {
        timestamps: true




})
module.exports = mongoose.model("Wears",WearSchema)