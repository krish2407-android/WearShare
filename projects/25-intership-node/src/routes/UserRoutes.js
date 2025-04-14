const routes = require("express").Router()

const { get } = require("mongoose")
const usercontroller = require("../controllers/UserController")
routes.post("/user",usercontroller.addRole)
routes.post("/users",usercontroller.signup)
routes.post("/users/login",usercontroller.loginUser)
routes.get("/user",usercontroller.getAllRole)
routes.delete("/users/:id",usercontroller.deleteRole)
routes.post("/users/:id",usercontroller.getRoleById)
routes.put("/users/makeadmin/:id", usercontroller.makeAdmin)




module.exports=routes




