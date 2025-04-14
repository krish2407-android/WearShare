const ShippingModel = require("../models/ShippingModel");





const addshipping =  async(req, res) => {

try {
    const savedproduct = await ShippingModel.create(req.body);
    res.status(201).json({
      message: "shipping added successfully",
      data: savedproduct,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}


  const getshipping = async (req, res) => {
    try {

      const category = await ShippingModel.find().populate("orderId",);
      res.status(200).json({
        message: "All Shipping",
        data: category,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  



};
const updateShipping = async (req, res) => {
  try {
      const { orderId } = req.params;
      const updateData = req.body;

      const updatedShipping = await ShippingModel.findOneAndUpdate(
          { orderId: orderId },
          { $set: updateData },
          { new: true, runValidators: true }
      ).populate("orderId");

      if (!updatedShipping) {
          return res.status(404).json({ message: "Shipping details not found for the given orderId" });
      }

      res.status(200).json({
          message: "Shipping details updated successfully",
          data: updatedShipping,
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};




const getAllShippingByuserId = async (req, res) => {
  try {
    const hordings = await ShippingModel
      .find({ userId: req.params.userId })
      .populate("orderId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No Shipping found" });
    } else {
      res.status(200).json({
        message: "shipping found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  const getshippingByuserId =async(req,res)=> {
//           //req.params.id
//           const foundaddress = await ProductModel.findById(req.params.id)
//           res.json({
//             message:"product fatched..",
//             data:foundaddress
//           })
        
//       }


module.exports = { 
    addshipping
    ,getshipping,
    getAllShippingByuserId,
    updateShipping
 };