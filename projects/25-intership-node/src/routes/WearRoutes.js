const routes = require("express").Router()
const { get } = require("mongoose")

const wearcontroller = require("../controllers/WearController")

// User routes
routes.post("/wears", wearcontroller.signup)
routes.post("/wearsLogin", wearcontroller.loginUser)

// Password reset routes
routes.post("/user/forgotpassword", wearcontroller.forgetPassword)
routes.post("/user/resetpassword", wearcontroller.resetpassword)

// Role management routes
routes.post("/wearss", wearcontroller.addRole)
routes.get("/wear", wearcontroller.getAllRole)
routes.delete("/wear/:id", wearcontroller.deleteRole)
routes.post("/wear/:id", wearcontroller.getRoleById)

module.exports = routes

