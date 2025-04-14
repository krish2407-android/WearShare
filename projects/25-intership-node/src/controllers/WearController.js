const WearModel = require("../models/WearModel")
const AdminModel = require("../models/AdminModel")
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")
// const { getRoleById, deleteRole, addRole } = require("./RoleController");
// const { getAllRole } = require("./UserController");
const jwt = require("jsonwebtoken");
const secret = "secret";



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let foundUserFromEmail = await WearModel.findOne({ email }).populate("roleId");
        if (!foundUserFromEmail) {
            foundUserFromEmail = await AdminModel.findOne({ email }).populate("roleId");
        }

        console.log(foundUserFromEmail);

        if (!foundUserFromEmail) {
            return res.status(404).json({ message: "Email not found." });
        }

        const isMatch = await bcrypt.compare(password, foundUserFromEmail.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({
            message: "Login success",
            data: foundUserFromEmail,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




// // controllers/wear/forgotPasswordController.js
// const User = require('../../models/User');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

// const otpStore = new Map(); // Temporary storage for OTPs

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password'
//   }
// });

// exports.sendOTP = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const otp = crypto.randomInt(100000, 999999).toString();
//   otpStore.set(email, { otp, expires: Date.now() + 300000 }); // OTP valid for 5 minutes

//   await transporter.sendMail({
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Password Reset OTP',
//     text: `Your OTP for password reset is: ${otp}`
//   });

//   res.json({ message: 'OTP sent to email' });
// };

// exports.verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;
//   const data = otpStore.get(email);
  
//   if (!data || data.otp !== otp || Date.now() > data.expires) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   otpStore.delete(email);
//   res.json({ message: 'OTP verified, proceed to reset password' });
// };

// // app.js
// const forgotPasswordRoutes = require('./routes/wear/forgotPassword');
// app.use('/api/wear', forgotPasswordRoutes);


// const forgotPassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const foundUser = await WearModel.findOne({ email: email });

//     if (!foundUser) {
//       return res.status(404).json({
//         message: "User not found. Please register first.",
//       });
//     }

//     const token = jwt.sign({ id: foundUser._id }, secret, { expiresIn: '1h' });
//     const url = `http://localhost:5173/resetpassword/${token}`;
//     const mailContent = `<html>
//                           <h2>Password Reset Request</h2>
//                           <p>Click the link below to reset your password:</p>
//                           <a href="${url}">Reset Password</a>
//                           <p>This link will expire in 1 hour.</p>
//                           </html>`;

//     await mailUtil.sendingMail(foundUser.email, "Reset Password", mailContent);
//     res.json({
//       success: true,
//       message: "Reset password link sent to your email.",
//       resetToken: token
//     });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Error sending reset password email.",
//       error: error.message
//     });
//   }
// };

// const resetpassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "Reset token is required"
//       });
//     }

//     if (!password) {
//       return res.status(400).json({
//         success: false,
//         message: "New password is required"
//       });
//     }

//     const decoded = jwt.verify(token, secret);
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     const updatedUser = await WearModel.findByIdAndUpdate(
//       decoded.id,
//       { password: hashedPassword },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Password updated successfully"
//     });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid or expired reset token"
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: "Error resetting password",
//       error: error.message
//     });
//   }
// };

const forgetPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await WearModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret, { expiresIn: "1h" });
    console.log("Generated Token:", token);

    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
    <a href ="${url}">reset password</a>
    </html>`;

    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    const userFromToken = jwt.verify(token, secret);
    const userId = userFromToken._id || userFromToken.id; // support either _id or id

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedUser = await WearModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or invalid token" });
    }

    res.json({
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Reset password error:", err.message);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

const signup = async (req, res) => {
      //try catch if else...
      try {
        //password encrupt..
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createdUser = await WearModel.create(req.body);

        await mailUtil.sendingMail(createdUser.email,"welcome to eadvertisement","this is welcome mail")
        res.status(201).json({
          message: "user created..",
          data: createdUser,
        });
      } catch (err) {
        console.log(err)
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }
  }




const addRole = async (req , res)=>{

    const savedRole = await WearModel.create(req.body)
    res.json({
        message:"Add data succesfully",
        data:savedRole
    });
}

const getAllRole = async(req,res)=>{
    const roles=await WearModel.find().populate("roleId")
    res.json({
        message:"data fetched sucesfully",
        data:roles
    })
}


const deleteRole = async (req,res)=> {
   
const  deleteRole =await WearModel.findByIdAndDelete(req.params.id)

res.json({
  message:"user deleted succesfully",
  data:deleteRole
})

    
  };


  const getRoleById =async(req,res)=> {
        //req.params.id
        const foundRole = await WearModel.findById(req.params.id)
        res.json({
          message:"user fatched..",
          data:foundRole
        })
      
    }



      
    
      module.exports ={
  getRoleById,deleteRole,addRole,getAllRole,loginUser,signup,forgetPassword,resetpassword
        }