const Salary = require("../models/Salary");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const calculateSalary = require("../utils/salaryCalculator");
const { generateSalarySlip } = require("../utils/pdfGenerator");

const createSalary = async (req, res) => {
  const { employeeId, baseSalary, month, year } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendanceRecords = await Attendance.find({
      employeeId,
      date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) },
    });

    let workingDays = 0;
    let casualLeave = 0;
    let medicalLeave = 0;
    let extraLeave = 0;

    attendanceRecords.forEach((record) => {
      switch (record.status) {
        case "present":
          workingDays++;
          break;
        case "casual_leave":
          casualLeave++;
          break;
        case "medical_leave":
          medicalLeave++;
          break;
        // @ts-ignore
        case "extra_leave":
          extraLeave++;
          break;
        default:
          break;
      }
    });

    const netSalary = calculateSalary(baseSalary, workingDays, casualLeave, medicalLeave, extraLeave);
    const pdfUrl = await generateSalarySlip(employee, { date: new Date(year, month - 1), netSalary }, attendanceRecords);

    const newSalary = new Salary({
      employeeId,
      date: new Date(year, month - 1),
      netSalary,
      pdfUrl,
    });

    const savedSalary = await newSalary.save();

    res.status(201).json({
      message: "Salary record created",
      salary: savedSalary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read Salary Records
const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().populate("employeeId", "name email");
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate("employeeId", "name email");
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSalary = async (req, res) => {
  const { id } = req.params;
  const { baseSalary, workingDays, casualLeave, medicalLeave, month, year } = req.body;
  try {
    const netSalary = calculateSalary(baseSalary, workingDays, casualLeave, medicalLeave);
    const employee = await Employee.findById(req.body.employeeId);
    const attendance = await Attendance.find({ employee: req.body.employeeId });

    const salaryData = { month, year, netSalary, workingDays, casualLeave, medicalLeave };
    const pdfUrl = await generateSalarySlip(employee, salaryData, attendance);
    const updatedSalary = await Salary.findByIdAndUpdate(id, { netSalary, pdfUrl, date: new Date(year, month - 1) });
    if (!updatedSalary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json({ message: "Salary record updated", salary: updatedSalary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Salary Record
const deleteSalary = async (req, res) => {
  try {
    const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
    if (!deletedSalary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json({ message: "Salary record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSalary,
  getSalaries,
  getSalaryById,
  updateSalary,
  deleteSalary,
};
