const { json } = require("express");
const RoleModel = require("../models/RoleModel");
const roleModel = require("../models/RoleModel")
//roleModel == roles
const getAllRoles = async (req, res) => {
  //await....
  //select * from roleModel

  const roles = await roleModel.find() //[{}] 
  res.json({
    message: "role fetched successfully",
    data:roles
  });
};

  const addRole=async(req,res) => {
    //  req.body,req.params,req.headers,req.query
  // console.log("request body....", req.body);
  //insert into roles () values()
  //database...

  const savedRole = await roleModel.create(req.body)
    res .json({
      message:"Role created....",
      data:savedRole

    });
  }

    const deleteRole = async (req,res)=> {
      
    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...
const  deleteRole =await roleModel.findByIdAndDelete(req.params.id)

res.json({
  message:"role deleted succesfully",
  data:deleteRole
})

    
  };

  const getRoleById =async(req,res)=> {
      //req.params.id
      const foundRole = await roleModel.findById(req.params.id)
      res.json({
        message:"role fatched..",
        data:foundRole
      })
    
  }


module.exports = {
    getAllRoles,addRole,deleteRole,getRoleById
}