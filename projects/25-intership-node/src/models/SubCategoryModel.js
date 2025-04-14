const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({

CategoryId:{
    type:Schema.Types.ObjectId,
    ref:"Category"
},
    name:{
        type: String,
        required: true,
        
    }


     },{
            timestamps: true
        })
        module.exports = mongoose.model('Subcategory',SubcategorySchema  );