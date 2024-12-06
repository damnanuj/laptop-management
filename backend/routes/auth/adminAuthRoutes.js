const express = require("express");
const {
  adminLogin,
  createAdmin,
} = require("../../controllers/admin/adminAuthController");
const {verifyToken, verifyAdmin } = require("../../middleware/authMiddleware");
const {
  generateSignupToken,
} = require("../../controllers/admin/employeeSignuptTokenController");

const router = express.Router();


router.post("/login", adminLogin);
router.post("/create",verifyToken, verifyAdmin, createAdmin);
router.post("/create-signup-token",verifyToken, verifyAdmin, generateSignupToken);

module.exports = router;
