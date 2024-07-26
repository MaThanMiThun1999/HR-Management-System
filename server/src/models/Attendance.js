const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "casual_leave", "medical_leave"],
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["casual", "medical"],
      required: function () {
        // @ts-ignore
        return this.status !== "present" && this.status !== "absent";
      },
    },
    reason: {
      type: String,
      required: function () {
        // @ts-ignore
        return this.status !== "present" && this.status !== "absent";
      },
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
