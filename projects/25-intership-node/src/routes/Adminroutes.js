const route=require("express").Router();
const admincontroller=require("../controllers/AdminController")


route.post("/addAdmin",admincontroller.addAdmin);
route.get("/getAdmin",admincontroller.getAdmin)

module.exports=route;