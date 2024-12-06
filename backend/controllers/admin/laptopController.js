const Laptop = require("../../models/laptopModel");

// >>=================== Add Laptop =====================>>
const addLaptop = async (req, res) => {
  const { brand, model, serialNumber, purchaseDate, status } = req.body;

  try {
    const newLaptop = await Laptop.create({
      brand,
      model,
      serialNumber,
      purchaseDate,
      status: status || "available",
      assignedTo: null,
    });

    res.status(201).json({
      success: true,
      message: "Laptop added successfully",
      laptop: newLaptop,
    });
  } catch (error) {
    console.log("Error in addLaptop controller");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// >>=================== Get All Laptops =====================>>

const getAllLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.status(200).json({
      success: true,
      length: laptops.length,
      laptops,
    });
  } catch (error) {
    console.log("Error in getAllLaptops controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Get Laptop by ID =====================>>
const getLaptopById = async (req, res) => {
  const { laptopId } = req.params;

  try {
    const laptop = await Laptop.findById(laptopId);
    if (!laptop) {
      return res.status(404).json({
        success: false,
        message: "Laptop not found",
      });
    }

    res.status(200).json({
      success: true,
      laptop,
    });
  } catch (error) {
    console.log("Error in getLaptopById controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Update Laptop =====================>>
const updateLaptop = async (req, res) => {
  const { laptopId } = req.params;
  const { brand, model, serialNumber, purchaseDate, status } = req.body;

  try {
    const laptop = await Laptop.findByIdAndUpdate(
      laptopId,
      { brand, model, serialNumber, purchaseDate, status },
      { new: true }
    );

    if (!laptop) {
      return res.status(404).json({
        success: false,
        message: "Laptop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Laptop updated successfully",
      laptop,
    });
  } catch (error) {
    console.log("Error in updateLaptop controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// >>=================== Delete Laptop =====================>>
const deleteLaptop = async (req, res) => {
  const { laptopId } = req.params;

  try {
    const laptop = await Laptop.findByIdAndDelete(laptopId);
    if (!laptop) {
      return res.status(404).json({
        success: false,
        message: "Laptop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Laptop deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteLaptop controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addLaptop,
  getAllLaptops,
  getLaptopById,
  updateLaptop,
  deleteLaptop,
};
