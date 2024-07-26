const { Router } = require("express");
const { getAttendanceRecords, getAttendanceByEmployeeId, createAttendanceRecord, updateAttendanceRecord, deleteAttendanceRecord } = require("../controllers/attendanceController");
const auth = require("../middleware/authMiddleware");

const router = Router();

router.get("/", auth, getAttendanceRecords);
router.get("/:employeeId", auth, getAttendanceByEmployeeId);
router.post("/", auth, createAttendanceRecord);
router.put("/:id", auth, updateAttendanceRecord);
router.delete("/:id", auth, deleteAttendanceRecord);

module.exports = router;


