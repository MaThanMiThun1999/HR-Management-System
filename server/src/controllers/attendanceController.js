const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// Get all attendance records
const getAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate("employeeId");

    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get attendance records for a specific employee
const getAttendanceByEmployeeId = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const attendanceRecords = await Attendance.find({ employeeId }).populate("employeeId");
    if (!attendanceRecords) {
      return res.status(404).json({ success: false, message: "No attendance records found for this employee" });
    }
    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new attendance record
const createAttendanceRecord = async (req, res) => {
  const { employeeId, date, status, leaveType, reason } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    const newAttendance = new Attendance({
      employeeId,
      date,
      status,
      leaveType: status !== "present" && status !== "absent" ? leaveType : null,
      reason: status !== "present" && status !== "absent" ? reason : null,
    });
   
    const savedAttendance = await newAttendance.save();

    res.status(201).json({ success: true, data: savedAttendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing attendance record
const updateAttendanceRecord = async (req, res) => {
  const { id } = req.params;
  const { date, status, leaveType, reason } = req.body;
  try {
    const attendanceRecord = await Attendance.findById(id);
    if (!attendanceRecord) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }
    attendanceRecord.date = date || attendanceRecord.date;
    attendanceRecord.status = status || attendanceRecord.status;
    attendanceRecord.leaveType = status !== "present" && status !== "absent" ? leaveType : attendanceRecord.leaveType;
    attendanceRecord.reason = status !== "present" && status !== "absent" ? reason : attendanceRecord.reason;
    const updatedAttendance = await attendanceRecord.save();
    res.status(200).json({ success: true, data: updatedAttendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an attendance record
const deleteAttendanceRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const attendanceRecord = await Attendance.findById(id);
    if (!attendanceRecord) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }
    await Attendance.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAttendanceRecords,
  getAttendanceByEmployeeId,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
};
