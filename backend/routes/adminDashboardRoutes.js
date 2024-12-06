const express = require("express");
const {
  addLaptop,
  getAllLaptops,
  getLaptopById,
  updateLaptop,
  deleteLaptop,
} = require("../controllers/admin/laptopController");
const {
  getAllEmployees,
  assignLaptopToEmployee,
  getLaptopsAssignedToEmployee,
} = require("../controllers/admin/employeeController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

//>>========= Laptop Management (Admin only) =============>>
router.post("/laptops", verifyAdmin, addLaptop); //done
router.get("/laptops", verifyAdmin, getAllLaptops); //done
router.get("/laptops/:laptopId", verifyAdmin, getLaptopById); //done
router.put("/laptops/:laptopId", verifyAdmin, updateLaptop); //done
router.delete("/laptops/:laptopId", verifyAdmin, deleteLaptop); //done

//>>========= Employee Management ============>>
router.get("/employees", verifyAdmin, getAllEmployees); //done
router.post("/assign-laptop", verifyAdmin, assignLaptopToEmployee); //done
router.get(
  "/employee/:employeeId/laptops",
  verifyAdmin,
  getLaptopsAssignedToEmployee
); //done

module.exports = router;
