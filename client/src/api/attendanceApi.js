import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export const getAttendanceRecords = async () => {
  try {
    const response = await axiosInstance.get("/v1/attendance");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch attendance records");
    throw error;
  }
};

export const getAttendanceByEmployeeId = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/v1/attendance/${employeeId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch attendance records for this employee");
    throw error;
  }
};

export const getWeeklyAttendanceData = async () => {
  try {
    const response = await axiosInstance.get("/attendance/weekly/");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch weekly attendance data");
    throw error;
  }
};

export const createAttendanceRecord = async (attendanceData) => {
  try {
    const response = await axiosInstance.post("/v1/attendance", attendanceData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to create attendance record");
    throw error;
  }
};

export const updateAttendanceRecord = async (id, attendanceData) => {
  try {
    const response = await axiosInstance.put(`/v1/attendance/${id}`, attendanceData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to update attendance record");
    throw error;
  }
};

export const deleteAttendanceRecord = async (id) => {
  try {
    const response = await axiosInstance.delete(`/v1/attendance/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to delete attendance record");
    throw error;
  }
};
