const multer = require("multer");
const ProductModel = require("../models/ProductModel");

const cloudinaryUtil = require("../utils/CloudanryUtil");






const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

const addproduct =  async(req, res) => {

try {
    const savedproduct = await ProductModel.create(req.body);
    res.status(201).json({
      message: "product added successfully",
      data: savedproduct,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}


  const getproduct = async (req, res) => {
    try {

      const category = await ProductModel.find().populate("CategoryId").populate("SubcategoryId");
      res.status(200).json({
        message: "All products",
        data: category,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  



};


// const getproductByproductId = async (req, res) => {
//   try {
//       const product = await ProductModel.findById(req.params.id);
//       res.json({ message: "Product fetched", data: product });
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching product" });
//   }
// };
const getAllHordingsByproductId = async (req, res) => {
  try {
    const hordings = await ProductModel
      .find({ productid: req.params.productid })
      .populate("stateId cityId AreaId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No hordings found" });
    } else {
      res.status(200).json({
        message: "Hording found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  const getproductById =async(req,res)=> {
//           //req.params.id
//           const foundaddress = await ProductModel.findById(req.params.id)
//           res.json({
//             message:"product fatched..",
//             data:foundaddress
//           })
        
//       }



const addproductWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.imageURL = cloundinaryResponse.secure_url;
      const savedHording = await ProductModel.create(req.body);

      res.status(200).json({
        message: "hording saved successfully",
        data: savedHording,
      });
    }
  });
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error deleting product",
      error: err.message 
    });
  }
};

module.exports = { 
    addproduct,getproduct,getAllHordingsByproductId,addproductWithFile,deleteProduct
 };