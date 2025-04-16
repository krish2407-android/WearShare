import { Profiler, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import "./assets/adminlte.css"
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import DemoForm from './assets/formfield/DemoForm'

import axios from "axios";
import { AddAddress } from './components/Address.jsx/AddAddress'
import { WearSidebar } from './components/layouts/WearSidebar'
import PrivateRoutes from './hooks/PrivateRoutes'
// import { AddScreen } from './components/Address.jsx/AddScreen'
import { ViewMyScreen } from './components/Address.jsx/ViewMyScreen'
import { ViewScreens } from './components/Address.jsx/ViewScreens'
import { ViewAddresses } from './components/Address.jsx/ViewAddresses'
// import { AddProduct } from './components/Address.jsx/AddProduct'
// import { LandingPage } from './components/common/LandingPage'
import { MenPage } from './Men/MenPage'
import { WomenPage } from './Women/WomenPage'
import { KidsPage } from './kids/KidsPage'
import ViewDetail from './order/ViewDetail'

import { Home } from './Home/Home'
import { Subcategory } from './Admin panel/Subcategory'
import { AddProduct } from './Admin panel/AddProduct'
import { Cart } from './components/Cart/Cart'
// import { Forgotpass } from './components/common/ForgotPass'
import Logout from './components/Logout'
import Profile from './components/Profile'
import { EditProfile } from './components/EditProfile'
// import { ChangePassword } from './components/ChangePassword'

// import { Admin } from './components/Admin'
import { AddAdmin } from './components/AddAdmin'
import { UserAdmin } from './components/Address.jsx/UserAdmin'
import { Admin } from './Admin panel/Admin'
import { Landing } from './Landing form/Landing'
// import OrderHistory from './components/OrderHistory'
import AdminOrders from './admin/AdminOrders'
import OrderHistory from './components/OrderHistory/OrderHistory'
import { ProductList } from './Admin panel/ProductList'
import Dashboard from './Admin panel/Dashboard'
import {  Resetpass } from './components/common/Resetpass'
import { Forgotpass } from './components/common/ForgotPass'
import { Chart } from './Chart'
import { BuyPage } from './Buy/BuyPage'
import PaymentSuccess from './order/PaymentSuccess'
import ThankYou from './order/ThankYou'

// import { Landing } from './components/Landing form/Landing'
// import { Welcome } from './components/common/Welcome'
// import LandingPage from './components/common/LandingPage'

// import { WearWelcome } from './components/layouts/WearWelcome'
// import { Homepage } from './components/layouts/HomePage'
// import ForgotPass from './components/common/ForgotPass'

function App() {
   // Set default axios configuration
   axios.defaults.baseURL = "http://localhost:5000";
   axios.defaults.timeout = 5000;

   const location = useLocation();

   useEffect(() => {
     if (location.pathname === "/login" || location.pathname === "/signup") {
       document.body.className = ""; // Remove the unwanted class for login and signup
     } else {
       document.body.className =
         "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
     }
   }, [location.pathname]);
  

  return (
    // <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" :"app-wrapper" }>
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" :"" }>
        
      
        
        <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
          {/* <Route path='/' element={<LandingPage></LandingPage>}></Route> */}
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/forgot' element={<Forgotpass></Forgotpass>}></Route>
          <Route path='/resetpassword/:token' element={<Resetpass></Resetpass>}></Route>
         
          {/* <Route path='forgotpass' element={<ForgotPass></ForgotPass>}></Route> */}



            {/* // admin  */}
          <Route path="" element={<PrivateRoutes />}>
          <Route path='/user' element={<UserSidebar></UserSidebar>}>
          <Route path='/user' element={<Dashboard></Dashboard>}></Route>
          {/* <Route path='profile' element={<Profile></Profile>}> </Route> */}
          <Route path="myscreen" element ={<ViewMyScreen/>}></Route>
          <Route path='subcategory' element={<Subcategory></Subcategory>}></Route>
          <Route path='addproduct' element={<AddProduct></AddProduct>}></Route>
          <Route path='logout' element={<Logout></Logout>}></Route>
          {/* <Route path='admin' element={<Admin></Admin>}></Route> */}  
         <Route path='admin' element={<Admin></Admin>}></Route>
          <Route path='addadmin' element={<AddAdmin></AddAdmin>}></Route>
          <Route path='useradmin' element={<UserAdmin></UserAdmin>}></Route>
        <Route path='adminorder' element={<AdminOrders></AdminOrders>}></Route>
        <Route path='productlist' element={<ProductList></ProductList>}></Route>
        <Route path='chart' element={<Chart></Chart>}></Route>

          




{/* ////user  */}

          </Route>
          
          <Route path='/wear' element={<WearSidebar></WearSidebar>}>
          
          <Route path='home' element={<Home></Home>}></Route>
          <Route path='addaddress' element={<AddAddress></AddAddress>}> </Route>
          <Route path="myaddress" element={<ViewAddresses/>}></Route>
          {/* <Route path="screen" element={<ViewScreens/>}></Route> */}
          {/* <Route path='addproduct' element={<AddProduct></AddProduct>}></Route> */}
          <Route path='men' element={<MenPage></MenPage>}></Route>
          <Route path='women' element={<WomenPage></WomenPage>}></Route>
          <Route path='kids' element={<KidsPage></KidsPage>}></Route>
          <Route path='detail' element={<ViewDetail></ViewDetail>}></Route>
          <Route path='buy' element={<BuyPage></BuyPage>}></Route>
          <Route path='cart' element={<Cart></Cart>}></Route>
          <Route path='logout' element={<Logout></Logout>}></Route>
          <Route path='profilee' element={<Profile></Profile>}> </Route>
          {/* <Route path='buy' element={<BuyPage></BuyPage>}></Route> */}
          <Route path='editprofile' element={<EditProfile></EditProfile>}></Route>
          {/* <Route path='orderhistory' element={<OrderHistory></OrderHistory>}></Route> */}
<Route path='orderhistory' element={<OrderHistory></OrderHistory>}></Route>  
          {/* <Route path='changepassword' element={<ChangePassword></ChangePassword>}></Route> */}
          <Route path="/wear/payment-success" element={<PaymentSuccess />} />
          <Route path="/wear/thank-you" element={<ThankYou />} />
         
          
          
          </Route>
          <Route path='demoform' element={<DemoForm></DemoForm>}></Route>
          </Route>
         
          {/* <Route path='/signupp' element={<Signupp></Signupp>}></Route> */}
        
        </Routes>
      // </div>
   
  )
}

export default App
