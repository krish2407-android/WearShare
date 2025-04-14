const userModel = require("../models/UserModel")
const roleModel = require("../models/RoleModel")
const bcrypt = require("bcrypt");

const loginUser = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const foundUserFromEmail = await userModel.findOne({ email: email });
    console.log(foundUserFromEmail);

    if (foundUserFromEmail != null) {
        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
        if (isMatch == true) {
            res.status(200).json({
                message: "login success",
                data: foundUserFromEmail,
            });
        } else {
            res.status(404).json({
                message: "invalid cred..",
            });
        }
    } else {
        res.status(404).json({
            message: "Email not found..",
        });
    }
};

const signup = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        // Create user with the provided roleId
        const createdUser = await userModel.create({
            ...req.body,
            password: hashedPassword,
            roleId: req.body.roleId // Use the roleId from the request
        });

        // Send welcome email
        try {
            await mailUtil.sendingMail(createdUser.email, "welcome to eadvertisement", "this is welcome mail");
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            // Don't fail the signup if email fails
        }

        res.status(201).json({
            message: "user created..",
            data: createdUser,
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({
            message: "Error creating user",
            error: err.message
        });
    }
};

const makeAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // First, find or create the admin role
        let adminRole = await roleModel.findOne({ name: "Admin" });
        if (!adminRole) {
            adminRole = await roleModel.create({
                name: "Admin",
                description: "Administrator role"
            });
        }

        // Update the user with the admin role ID
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { roleId: adminRole._id },
            { new: true }
        ).populate('roleId');

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User is now an admin",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error making user admin:", error);
        res.status(500).json({
            message: "Error making user admin",
            error: error.message
        });
    }
};

const addRole = async (req, res) => {
    const savedRole = await userModel.create(req.body)
    res.json({
        message: "Add data succesfully",
        data: savedRole
    });
}

const getAllRole = async(req, res) => {
    const roles = await userModel.find().populate("roleId")
    res.json({
        message: "data fetched sucesfully",
        data: roles
    })
}

const deleteRole = async (req, res) => {
    const deleteRole = await userModel.findByIdAndDelete(req.params.id)
    res.json({
        message: "user deleted succesfully",
        data: deleteRole
    })
};

const getRoleById = async(req, res) => {
    const foundRole = await userModel.findById(req.params.id)
    res.json({
        message: "Role found successfully",
        data: foundRole
    });
};

module.exports = {
    loginUser,
    signup,
    makeAdmin,
    addRole,
    getAllRole,
    deleteRole,
    getRoleById
};