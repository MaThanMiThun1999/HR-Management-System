const Employee = require("../models/Employee");
const validator = require("validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `temp${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({
    success: true,
    message: "Employees fetched successfully",
    count: employees.length,
    data: { employees: employees },
  });
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employeeData = {
      ...employee.toObject(),
      profilePictureUrl: employee.profilePicture ? `${req.protocol}://${req.get("host")}/uploads/IMAGES/${employee.profilePicture.filename}` : null,
    };

    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEmployee = [
  upload.single("profilePicture"),
  async (req, res, next) => {
    const { name, email, role, joinedDate, address, contactNumber, proofs } = req.body;

    if (!name || !email || !role || !joinedDate || !address || !contactNumber || !proofs) {
      res.status(400);
      const errMsg = new Error("Please provide name, email, role, joinedDate, address, contactNumber, proofs");
      return next(errMsg);
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      const errMsg = new Error("Please provide a valid email");
      return next(errMsg);
    }

    if (!validator.isMobilePhone(contactNumber)) {
      res.status(400);
      const errMsg = new Error("Please provide a valid contact number");
      return next(errMsg);
    }

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Failed to delete uploaded file:", err);
        });
      }
      res.status(400);
      const errMsg = new Error("An employee with the same email already exists. Please use a different email.");
      return next(errMsg);
    }

    try {
      const newEmployee = new Employee({
        name,
        email,
        role,
        joinedDate,
        address,
        contactNumber,
        proofs,
      });

      const createdEmployee = await newEmployee.save();

      if (req.file) {
        const newFilename = `${createdEmployee._id}${path.extname(req.file.originalname)}`;
        const newFilePath = path.join("uploads", "IMAGES", newFilename);
        console.log(`File uploaded successfully. Filename: ${newFilename}, Filepath: ${newFilePath}`);

        fs.rename(req.file.path, newFilePath, async (err) => {
          if (err) {
            console.error("Failed to rename file:", err);
            return res.status(500).json({
              status: false,
              message: "Internal server error",
              data: null,
              stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
          }

          createdEmployee.profilePicture = {
            filename: newFilename,
            contentType: req.file.mimetype,
          };

          await createdEmployee.save();

          const employeeData = {
            ...createdEmployee.toObject(),
            profilePictureUrl: `${req.protocol}://${req.get("host")}/uploads/IMAGES/${newFilename}`,
          };

          res.status(201).json({
            status: true,
            message: "Employee created successfully",
            data: {
              employee: employeeData,
            },
          });
        });
      } else {
        res.status(201).json({
          status: true,
          message: "Employee created successfully",
          data: {
            employee: createdEmployee,
          },
        });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        // Check if it's a Mongoose validation error
        const validationErrors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationErrors,
        });
      }
      res.status(500).json({
        status: false,
        error: error.message,
        message: "Internal server error",
        data: null,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      });
    }
  },
];

const updateEmployee = async (req, res, next) => {
  const { id } = req.params;

  const updates = req.body;

  if (updates.email && !validator.isEmail(updates.email)) {
    res.status(400);
    const errMsg = new Error("Please provide a valid email");
    return next(errMsg);
  }

  if (updates.contactNumber && !validator.isMobilePhone(updates.contactNumber)) {
    res.status(400);
    const errMsg = new Error("Please provide a valid contact number");
    return next(errMsg);
  }

  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
