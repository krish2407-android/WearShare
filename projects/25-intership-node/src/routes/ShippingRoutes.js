const routes = require('express').Router();
const  ShppingController= require('../controllers/ShippingController');


routes.post("/addshipping",ShppingController .addshipping);
routes.get("/getshipping", ShppingController.getshipping);
// routes.get("/getareabyproduct/:SubcategoryId",ProductController.getproductById)
routes.get("/getAllShippingByuserId/:userId", ShppingController.getAllShippingByuserId);
routes.put("/update/:orderId", ShppingController.updateShipping)

module.exports = routes;