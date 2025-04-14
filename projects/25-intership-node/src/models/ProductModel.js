const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

SubcategoryId:{
    type:Schema.Types.ObjectId,
    ref:"Subcategory"
},

    productname:{
        type: String,
        required: true,
       
    },
    CategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
    },
    price:{
        type: Number,
        required: true, 
    },
   
    quantity:{
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
module.exports = mongoose.model('Product',ProductSchema);