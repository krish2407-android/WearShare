const routes = require('express').Router();
const AddressController = require('../controllers/AddressController');

routes.post("/add", AddressController.addAddress);
routes.get("/get", AddressController.getAddress);
routes.delete("/delete/:id", AddressController.deleteAddress);
routes.get('/getalladdress/:userId', AddressController.getAllAddressByuserId);
// routes.post("/adddetails", AddressController.addDetail);
// routes.post('/addWithFile', AddressController.addHordingWithFile);
// routes.put("/update/:id", AddressController.updateAddress);
// routes.get("/getaddressbyid/:id", AddressController.getAddressById);
module.exports = routes;