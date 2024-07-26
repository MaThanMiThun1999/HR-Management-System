// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { createAttendanceRecord, updateAttendanceRecord } from "../../api/attendanceApi";
import { toast, Toaster } from "react-hot-toast";
import moment from "moment";

const AttendanceForm = ({ setCreateAttendance, setUpdateAttendance, editingAttendance, fetchAttendanceRecords, fetchAttendanceByEmployeeId, employeeId }) => {
  const [formData, setFormData] = useState({
    employeeId: editingAttendance?.employeeId || "",
    date: editingAttendance?.date || moment().format("YYYY-MM-DD"),
    status: editingAttendance?.status || "present",
    leaveType: editingAttendance?.leaveType || "",
    reason: editingAttendance?.reason || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAttendance) {
        await updateAttendanceRecord(editingAttendance._id, formData);
        toast.success("Attendance record updated successfully");
      } else {
        await createAttendanceRecord(formData);
        toast.success("Attendance record created successfully");
      }
      setUpdateAttendance(false);
      setCreateAttendance(false);
      if (employeeId) {
        fetchAttendanceByEmployeeId(employeeId);
      } else {
        fetchAttendanceRecords();
      }
      setFormData({
        employeeId: "",
        date: moment().format("YYYY-MM-DD"),
        status: "present",
        leaveType: "",
        reason: "",
      });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create attendance record");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Form Fields */}
      <div className="mb-4">
        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
          Employee ID
        </label>
        <input type="text" name="employeeId" id="employeeId" value={formData.employeeId.name} onChange={handleChange} disabled={editingAttendance ? true : false} className="border p-2 mb-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select name="status" id="status" value={formData.status} onChange={handleChange} className="border p-2 mb-2 w-full">
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="casual_leave">Casual Leave</option>
          <option value="medical_leave">Medical Leave</option>
        </select>
      </div>
      {/* Conditional rendering for Leave Type and Reason fields */}
      {formData.status !== "present" && formData.status !== "absent" && (
        <>
          <div className="mb-4">
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <input type="text" name="leaveType" id="leaveType" value={formData.leaveType} onChange={handleChange} className="border p-2 mb-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea name="reason" id="reason" value={formData.reason} onChange={handleChange} className="border p-2 mb-2 w-full"></textarea>
          </div>
        </>
      )}
      {/* Submit and Cancel buttons */}
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          {editingAttendance ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => {
            setCreateAttendance(false);
            setUpdateAttendance(false);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default AttendanceForm;
