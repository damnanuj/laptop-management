const Employee = require("../../models/employeeModel");
const Token = require("../../models/employeeCreationTokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// >>=================== Employee Signup =====================>>
const employeeSignup = async (req, res) => {
  const { email, password, name, department, signupToken } = req.body;

  if (!name || !signupToken || !email || !password || !department) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials !",
    });
  }

  try {
    const validToken = await Token.findOne({ token: signupToken, email });
    if (!validToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired signup token.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    const newEmployee = await Employee.create({
      name,
      email,
      department,
      password: hashedPassword,
    });

    await validToken.deleteOne(); //>>==removing token after signup===>>

    res.status(201).json({
      success: true,
      message: "Employee account created successfully",
      employee: { id: newEmployee._id, name, email, department },
    });
  } catch (error) {
    console.log("Error in employee signup controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Employee Login =====================>>
const employeeLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials !",
    });
  }

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: employee._id, role: "employee" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      success: true,
      message: "Employee login successful",
      token,
    });
  } catch (error) {
    console.log("Error in employee login controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { employeeSignup, employeeLogin };
