const routes = require('express').Router();
const AddproductController = require('../controllers/AddproductController');

routes.post("/addproduct",AddproductController .addproduct);

module.exports = routes;