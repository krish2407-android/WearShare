const AdminModel = require("../models/AdminModel");
const adminModel = require("../models/AdminModel");
const roleModel = require("../models/RoleModel");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin with this email already exists"
            });
        }

        // Find or create admin role
        let adminRole = await roleModel.findOne({ name: "Admin" });
        if (!adminRole) {
            adminRole = await roleModel.create({
                name: "Admin",
                description: "Administrator role"
            });
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create new admin with role
        const newAdmin = await adminModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            roleId: adminRole._id
        });

        res.status(201).json({
            message: "Admin registered successfully",
            data: {
                id: newAdmin._id,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                email: newAdmin.email,
                phone: newAdmin.phone,
                role: adminRole.name
            }
        });
    } catch (error) {
        console.error("Error in addAdmin:", error);
        res.status(500).json({
            message: "Error registering admin",
            error: error.message
        });
    }
};


 const getAdmin = async (req, res) => {AdminModel
    try {
      const address = await AdminModel.find().populate("roleId")
      res.status(200).json({
        message: "All Areas",
        data: address,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
}

module.exports = {
    addAdmin,getAdmin
}