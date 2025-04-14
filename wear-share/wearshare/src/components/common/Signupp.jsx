// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";

// export const Signupp = () => {
//   const { register, handleSubmit } = useForm();
//   const submitHandler = async(data) => {
   
//     data.roleId = "67bd4378dee14e50d2a2a067"
//     const res = await axios.post("/users",data)
//     console.log(res) 
//     console.log(res.data) 
//     //tost..
  
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>USER SIGNUP...</h1>
//       <form onSubmit={handleSubmit(submitHandler)}>
//         <div>
//           <label>FirstName</label>
//           <input type="text" {...register("firstName")}></input>
//         </div>
//         <div>
//           <label>email</label>
//           <input type="text" {...register("email")}></input>
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" {...register("password")}></input>
//         </div>
//         <div>
//           <input type="submit"></input>
//         </div>
//       </form>
//     </div>
//   );
// };