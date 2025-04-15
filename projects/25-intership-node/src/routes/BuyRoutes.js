const routes = require('express').Router();
const  BuyController= require('../controllers/BuyController');


routes.post("/addbuy",BuyController .addshipping);
routes.get("/getbuy", BuyController.getshipping);

module.exports = routes;