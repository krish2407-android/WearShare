const CityModel = require("../models/CityModel");

const addCity = async (req, res) => {
    try {
      const savedCity = await CityModel.create(req.body);
      res.status(201).json({
        message: "City added successfully",
        data: savedCity,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const getCities = async (req, res) => {
    try {
      const cities = await CityModel.find().populate("stateId");
      res.status(200).json({
        message: "All cities",
        data: cities,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  const deletecity = async (req,res)=> {
       
    const  deletecity =await CityModel.findByIdAndDelete(req.params.id)
    
    res.json({
      message:"city deleted succesfully",
      data:deletecity
    })
    
        
      };
    
    
      const getCityByStateId = async (req, res) => {
        try {
          const cities = await CityModel.find({ stateId: req.params.stateId });
          res.status(200).json({
            message: "city found",
            data: cities,
          });
        } catch (err) {
          res.status(500).json({
            message: "city  not found",
          });
        }
      };
  module.exports = { addCity, getCities , deletecity,getCityByStateId};
