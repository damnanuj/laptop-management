const Employee = require("../../models/employeeModel");
const Laptop = require("../../models/laptopModel");

// >>=================== Get All Employees =====================>>

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.log("Error in getAllEmployees controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Assign Laptop to Employee =====================>>

const assignLaptopToEmployee = async (req, res) => {
  const { laptopId, employeeId } = req.body;
  try {
    //check if already assigned to else
    const laptop = await Laptop.findById(laptopId);
    if (!laptop || laptop.assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Laptop is not available for assignment",
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    laptop.assignedTo = employee._id;
    await laptop.save();
    return res.status(200).json({
      success: true,
      message: "Laptop assigned successfully",
    });
  } catch (error) {
    console.log("Error in assignLaptopToEmployee controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Get Laptops Assigned to Employee =====================>>

const getLaptopsAssignedToEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    // >>=== all laptops assigned to the employee======>>
    const laptops = await Laptop.find({ assignedTo: employeeId });

    if (!laptops.length) {
      return res.status(404).json({
        success: false,
        message: "No laptops assigned to this employee",
      });
    }

    return res.status(200).json({
      success: true,
      laptops,
    });
  } catch (error) {
    console.log("Error in getLaptopsAssignedToEmployee controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports = {getAllEmployees, assignLaptopToEmployee,getLaptopsAssignedToEmployee}