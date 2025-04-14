const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

  userId:{
    type:Schema.Types.ObjectId,
    ref:"Wears",
  },
    
       
        ProductId:{
            type:Schema.Types.ObjectId,
            ref:"Product",
        },
        // price:{
        //     type: Number,
        //     required: true,
           
        // },
       
        quantity:{
            type: Number,
            required: true,
            
        },
        size:{
            type:String,
            required:true,
        },
        addressId:
        {
            type:Schema.Types.ObjectId,
            ref:"Address",
        }
    // status:{
    //     type:String,
    // },









},{
  
        timestamps: true
    })
    module.exports = mongoose.model('Order',OrderSchema  );