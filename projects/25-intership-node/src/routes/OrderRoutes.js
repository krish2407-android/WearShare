const routes = require('express').Router();
const  OrderController= require('../controllers/OrderContoller');

routes.post("/addorder", OrderController.addOrder);
routes.get("/getproduct", OrderController.getorder);
routes.get("/getareabyproduct/:SubcategoryId",OrderController.getproductById)  
routes.get("/getorders/:userId", OrderController.getOrdersByUserId);
routes.delete('/delete/:id', OrderController.deleteOrder);
module.exports = routes;