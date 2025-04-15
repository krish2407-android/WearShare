const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()) //to accept data as json...

//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//user routes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

//wear routes
const WearRoutes = require("./src/routes/WearRoutes")
app.use(WearRoutes)

//admin routes
const adminRoutes = require("./src/routes/AdminRoutes")
app.use("/admin", adminRoutes) // Add /admin prefix

//state routes
const StateRoutes = require("./src/routes/StateRoutes")
app.use("/state",StateRoutes)
//http://localhost:3000/state/add,get,add,/

//city routes
const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)
 //http://localhost:3000/city/add,get,add,/

 //area routes
 const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)
 //http://localhost:3000/area/add,get,add,/

 //address routes
 const addressRoutes = require("./src/routes/AddressRoutes")
app.use("/address",addressRoutes)
 //http://localhost:3000/address/add,get,add,/


 //Category routes
 const CategoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",CategoryRoutes)
 //http://localhost:3000/category/add,get,add,/

  //SubCategory routes
  const SubcategoryRoutes = require("./src/routes/SubCategoryRoutes")
  app.use("/subcategory",SubcategoryRoutes)
   //http://localhost:3000/subcategory/add,get,add,/

   //product routes
  const ProductRoutes = require("./src/routes/ProductRoutes")
  app.use("/product",ProductRoutes)
   //http://localhost:3000/product/add,get,add,/

    //Order routes
//   const OrderRoutes = require("./src/routes/OrderRoutes")
//   app.use("/order",OrderRoutes)
//    //http://localhost:3000/order/add,get,add,/

    //Shipping routes
  const ShippingRoutes = require("./src/routes/ShippingRoutes")
  app.use("/shipping",ShippingRoutes)
   //http://localhost:3000/shipping/add,get,add,/

   

   const AddproductRoutes = require("./src/routes/AddproductRoutes")
   app.use("/addproduct",AddproductRoutes)

// Cart routes
const CartRoutes = require("./src/routes/CartRoutes");
app.use("/cart",CartRoutes)

// Order routes
const OrderRoutes = require("./src/routes/OrderRoutes");
app.use("/order",OrderRoutes)



const BuyRoutes = require ("./src/routes/BuyRoutes");
app.use("/buy",BuyRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 5000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})