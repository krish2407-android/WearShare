const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({

userId:{
    type:Schema.Types.ObjectId,
    ref:"Wears"
},
    address:{
        type: String,
        required: true,
        unique: true
    },
    cityId:{
        type:Schema.Types.ObjectId,
        ref:"City",
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"State",
    },
    AreaId:{
        type:Schema.Types.ObjectId,
        ref:'Area'
    },
    pincode:{
        type: Number,
        required: true,
        unique: true
    }
,
    addressURL:{
        type: String,
        required: true
    }










  },{
        timestamps: true
    })
    module.exports = mongoose.model('Address',addressSchema  );