const CategoryModel = require("../models/CategoryModel");




const addCategory =  async(req, res) => {

try {
    const savedCategory = await CategoryModel.create(req.body);
    res.status(201).json({
      message: "category added successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}


  const getCategory = async (req, res) => {CategoryModel
    try {
      const category = await CategoryModel.find();
      res.status(200).json({
        message: "All Category",
        data: category,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  



};

 const getcategoryById =async(req,res)=> {
          //req.params.id
          const foundaddress = await CategoryModel.findById(req.params.id)
          res.json({
            message:"category fatched..",
            data:foundaddress
          })
        
      }


module.exports = { 
    addCategory,getCategory,getcategoryById
 };