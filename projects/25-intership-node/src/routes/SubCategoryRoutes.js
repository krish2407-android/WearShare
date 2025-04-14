const routes = require('express').Router();
const  SubcategoryController= require('../controllers/SubcategoryController');

routes.post("/addsubcategory", SubcategoryController.addsubcategory);
routes.get("/getsubcategory", SubcategoryController.getSubcategory);
routes.get("/getcategorybysubcategory/:CategoryId",SubcategoryController.getsubcategoryById)

module.exports = routes;