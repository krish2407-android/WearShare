const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buySchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    orderId:{
          type:Schema.Types.ObjectId,
          ref:"Order"
    },
    ProductId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
    },

        status:{
            type:String,
        },
    
    
    
    
    
    
    
    
    
    
      },{
            timestamps: true
        })
        module.exports = mongoose.model('Buy',buySchema  );