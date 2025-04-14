const routes=require("express").Router()
const { get } = require("mongoose")

const CityController= require("../controllers/CityController")

routes.post("/add",CityController.addCity)
routes.get("/get",CityController.getCities)
routes.get("/add",CityController.deletecity)
routes.get("/getcitybystate/:stateId",CityController.getCityByStateId)


module.exports=routes
