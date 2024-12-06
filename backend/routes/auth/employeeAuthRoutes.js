const express = require("express");
const { employeeSignup, employeeLogin } = require("../../controllers/employee/employeeAuthController");

const router = express.Router();

router.post("/signup", employeeSignup);
router.post("/login", employeeLogin);

module.exports = router;
