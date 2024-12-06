const Maintenance = require("../../models/maintenanceModel");

// >>=================== Add Maintenance Log =====================>>

const addMaintenanceLog = async (req, res) => {
  const { laptopId, description, cost } = req.body;
  try {
    const maintenanceLog = await Maintenance.create({
      laptopId,
      description,
      cost,
    });
    return res.status(201).json({
      success: true,
      message: "Maintenance log added",
      maintenance: maintenanceLog,
    });
  } catch (error) {
    console.log("Error in addMaintenanceLog controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== View Maintenance History =====================>>

const viewMaintenanceHistory = async (req, res) => {
  const { laptopId } = req.params;
  try {
    const history = await Maintenance.find({ laptopId });
    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.log("Error in viewMaintenanceHistory controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { addMaintenanceLog, viewMaintenanceHistory };
