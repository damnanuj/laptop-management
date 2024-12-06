const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ["available", "assigned", "maintenance"],
      default: "available",
    },
    purchaseDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Laptop", laptopSchema);
