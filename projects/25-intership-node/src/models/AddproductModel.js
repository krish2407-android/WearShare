const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addproductSchema = new Schema({


    productname:{
        type: String,
        required: true,
    
    },
    description:{
        type: String,
        required: true,
        
    },
    
    price:{
        type: Number,
        required: true,
        
    },
    stock:{
        type: Number,
        required: true,
        
    },
    imageURL:{
        type: String,
        required: true
    }










  },{
        timestamps: true
    })
    module.exports = mongoose.model('Addproduct',addproductSchema  );