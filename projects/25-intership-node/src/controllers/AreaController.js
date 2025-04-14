const AreaModel = require("../models/AreaModel");

const addArea = async (req, res) => {
  try {
    const savedArea = await AreaModel.create(req.body);
    res.status(201).json({
      message: "Area added successfully",
      data: savedArea,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const getAreas = async (req, res) => {AreaModel
  try {
    const areas = await AreaModel.find().populate("cityId").populate("stateId");
    res.status(200).json({
      message: "All Areas",
      data: areas,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};



const deleteArea = async (req,res)=> {
     
  const  deletearea =await AreaModel.findByIdAndDelete(req.params.id)
  
  res.json({
    message:"Area deleted succesfully",
    data:deletearea
  })
  
      
    };
  
    const getAreaBycityId = async (req, res) => {
      try {
        const areas = await AreaModel.find({ cityId: req.params.cityId });
        res.status(200).json({
          message: "area found",
          data: areas,
        });
      } catch (err) {
        res.status(500).json({
          message: err,
        });
      }
      }
module.exports = { addArea, getAreas,deleteArea,getAreaBycityId };