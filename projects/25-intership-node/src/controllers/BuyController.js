const BuyModel = require("../models/BuyModel");





const addshipping =  async(req, res) => {

try {
    const savedproduct = await BuyModel.create(req.body);
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

      const category = await BuyModel.find().populate("ProductId",);
      res.status(200).json({
        message: "All Shipping",
        data: category,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
}
    
    
    
    
    module.exports = { 
        addshipping
        ,getshipping
    }