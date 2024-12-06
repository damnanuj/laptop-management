const Token = require("../../models/employeeCreationTokenModel");
const crypto = require("crypto");

//>>====only generated token through admin will
// be able to signup for employee======>>
const generateSignupToken = async (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(16).toString("hex");

    const newToken = await Token.create({ token, email });

    res.status(201).json({
      success: true,
      message: "Signup token generated",
      employeeSignupToken: newToken.token,
    });
  } catch (error) {
    console.log("Error in token generation controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {generateSignupToken}
