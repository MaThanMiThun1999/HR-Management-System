const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  proofs: {
    aadhar: {
      type: String,
    },
    pan: {
      type: String,
    },
    drivingLicense: {
      type: String,
    },
  },
  profilePicture: {
    filename: {
      type: String,
    },
    contentType: {
      type: String,
    },
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
