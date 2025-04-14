const AddressModel = require("../models/AddressModel");
const { populate } = require("../models/AreaModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");
//storage engine

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






const addDetail = async (req, res) => {
      //try catch if else...
      try {
        //password encrupt..
      const createdUser = await AddressModel.create(req.body);
        res.status(201).json({
          message: "user created..",
          data: createdUser,
        });
      } catch (err) {
        console.log(err)
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }
  }












const addAddress =  async(req, res) => {

try {
    const savedaddress = await AddressModel.create(req.body);
    res.status(201).json({
      message: "Address added successfully",
      data: savedaddress,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}


  const getAddress = async (req, res) => {AddressModel
    try {
      const address = await AddressModel.find().populate("cityId").populate("stateId");populate("userId");
      res.status(200).json({
        message: "All Areas",
        data: address,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  



};



const deleteAddress = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedProduct = await AddressModel.findByIdAndDelete(userId);
    
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

  
  
    // const getAddressById =async(req,res)=> {
    //       //req.params.id
    //       const foundaddress = await AddressModel.findById(req.params.id)
    //       res.json({
    //         message:"address fatched..",
    //         data:foundaddress
    //       })
        
    //   }


const getAllAddressByuserId = async (req, res) => {
  try {
    const hordings = await AddressModel
      .find({ userId: req.params.userId })
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


      // const addHordingWithFile = async (req, res) => {
      //     upload(req, res, (err) => {
      //       if (err) {
      //         res.status(500).json({
      //           message: err.message,
      //         });
      //       } else {
      //         // database data store
      //         //cloundinary
      //         console.log(req.body);
      //         res.status(200).json({
      //           message: "File uploaded successfully",
      //           data: req.file,
      //         });
      //       }
      //     });
      //   };
      const addHordingWithFile = async (req, res) => {
        upload(req, res, async (err) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            // database data store
            //cloundinary
      
            const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloundinaryResponse);
            console.log(req.body);
      
            //store data in database
            req.body. addressURL= cloundinaryResponse.secure_url
            const savedHording = await AddressModel.create(req.body);
      
            res.status(200).json({
              message: "hording saved successfully",
              data: savedHording
            });
          }
        });
      };
      
       

module.exports = { 
    addAddress,getAddress,deleteAddress,getAllAddressByuserId,addDetail,addHordingWithFile
 };