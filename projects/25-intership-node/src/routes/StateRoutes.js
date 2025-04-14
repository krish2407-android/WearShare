const routes=require("express").Router()
const { get } = require("mongoose")


const StateController = require("../controllers/StateController")
const { route } = require("./WearRoutes")

routes.post("/add",StateController.addState)
routes.get("/get",StateController.getAllStates)
// routes.delete("/add",StateController.deleteState)
// routes.get("/",StateController.getStateById)




module.exports=routes