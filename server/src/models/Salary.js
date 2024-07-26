const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
