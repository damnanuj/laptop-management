const Admin = require("../../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// >>=================== Admin Login =====================>>
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials !",
    });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.log("Error in admin login controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Admin Creation only by an admin =====================>>
const createAdmin = async (req, res) => {
 
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials !",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    //>>===== creating new admin ===========>>
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: { id: newAdmin._id, name, email },
    });
  } catch (error) {
    console.log("Error in admin creation controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { adminLogin, createAdmin };
