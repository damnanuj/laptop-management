const jwt = require("jsonwebtoken");

//>>========verify logged user is authenticated or not========>>
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

//>>========verify admin for admin only routes========>>
const verifyAdmin = (req, res, next) => {
  
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
};


//>>========verify employee for employee only routes========>>
const verifyEmployee = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Employees only.",
    });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, verifyEmployee };
