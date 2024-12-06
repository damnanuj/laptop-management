const express = require("express");
const { verifyToken, verifyEmployee } = require("../middleware/authMiddleware");
const {
  addMaintenanceLog,
  viewMaintenanceHistory,
} = require("../controllers/employee/maintenanceController");
const { reportIssue } = require("../controllers/employee/issueController");

const router = express.Router();

router.use(verifyToken);

//>>========= Maintenance & Issues ============>>
router.post("/maintenance", verifyEmployee, addMaintenanceLog); //done
router.get("/maintenance/:laptopId", viewMaintenanceHistory); //done
router.post("/issue", verifyEmployee, reportIssue); //done
module.exports = router;