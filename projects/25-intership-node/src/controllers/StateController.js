const StateModel = require("../models/StateModel")


const addState = async (req, res) => {
    try {
      const savedState = await StateModel.create(req.body);
      res.status(201).json({
        message: "State added successfully",
        data: savedState,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  };
  
  const getAllStates = async (req, res) => {
  
      try{
          
          const states = await StateModel.find();
          res.status(200).json({
              message: "All states fetched successfully",
              data: states
          })
  
      }catch(err){
  
          res.status(500).json({
              message: err
          })
  
      }
  
  }

  const deleteState = async (req,res)=> {
     
  const  deletestate =await StateModel.findByIdAndDelete(req.params.id)
  
  res.json({
    message:"state deleted succesfully",
    data:deletestate
  })
  
      
    };
  
  
    const getStateById =async(req,res)=> {
          //req.params.id
          const foundstate = await StateModel.findById(req.params.id)
          res.json({
            message:"state fatched..",
            data:foundstate
          })
        
      }
  
  
  module.exports = {
      addState,
      getAllStates,
      deleteState,
      getStateById
  }