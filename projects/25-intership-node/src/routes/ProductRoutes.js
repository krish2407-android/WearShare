const routes = require('express').Router();
const ProductController = require('../controllers/ProductController');

routes.post("/addproduct", ProductController.addproduct);
routes.get("/getproduct", ProductController.getproduct);
routes.get("/getproduct/:id", ProductController.getAllHordingsByproductId);
routes.post('/addWithFile', ProductController.addproductWithFile);
routes.delete('/delete/:id', ProductController.deleteProduct);

module.exports = routes;