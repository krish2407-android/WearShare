const SubcategoryModel = require("../models/SubCategoryModel");




const addsubcategory =  async(req, res) => {

try {
    const savedCategory = await SubcategoryModel.create(req.body);
    res.status(201).json({
      message: "subcategory added successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}


  const getSubcategory = async (req, res) => {
    try {
      const category = await SubcategoryModel.find().populate("CategoryId");
      res.status(200).json({
        message: "All Sub Category",
        data: category,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  



};
 const getsubcategoryById =async(req,res)=> {
          //req.params.id
          try
          {       
          const foundaddress = await SubcategoryModel.find({CategoryId:req.params.CategoryId});
          res.status(200).json({
            message:"subcategory fatched..",
            data:foundaddress
          });
          }catch (err) {
            res.status(500).json({
              message: "subcategory  not found",
            });
          }
      }

module.exports = { 
    addsubcategory,getSubcategory,getsubcategoryById
 };