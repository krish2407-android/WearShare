const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema({

userId:{
    type:Schema.Types.ObjectId,
    ref:"users"
},
orderId:{
      type:Schema.Types.ObjectId,
      ref:"Order"
},
    status:{
        type:String,
    },










  },{
        timestamps: true
    })
    module.exports = mongoose.model('Shipping',shippingSchema  );