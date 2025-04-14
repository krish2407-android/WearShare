const AddproductModel = require("../models/AddproductModel");


const addproduct = async (req, res) => {
      //try catch if else...
      try {
        //password encrupt..
      const createdUser = await AddproductModel.create(req.body);
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


      
       

module.exports = { 
 addproduct
 };