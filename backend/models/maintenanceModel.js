const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  laptopId: { type: mongoose.Schema.Types.ObjectId, ref: "Laptop" },
  description: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  cost: Number,
  loggedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
