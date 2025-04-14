const routes = require('express').Router();
const AreaController = require('../controllers/AreaController');

routes.post("/add", AreaController.addArea);
routes.get("/get", AreaController.getAreas);
routes.delete("/add", AreaController.deleteArea);
routes.get("/getareabycity/:cityId",AreaController.getAreaBycityId)


module.exports = routes;