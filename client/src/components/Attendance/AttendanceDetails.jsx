// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getAttendanceRecords } from "../../api/attendanceApi";
import { toast, Toaster } from "react-hot-toast";

const AttendanceDetails = () => {
  const [attendanceSummary, setAttendanceSummary] = useState([]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await getAttendanceRecords();
      const records = response.data;

      const summary = records.reduce((acc, record) => {
        const { employeeId, status } = record;
        if (!acc[employeeId._id]) {
          acc[employeeId._id] = {
            employeeId: employeeId._id,
            name: employeeId.name,
            presentDays: 0,
            casualLeave: 0,
            medicalLeave: 0,
          };
        }

        if (status === "present") {
          acc[employeeId._id].presentDays += 1;
        } else if (status === "casual_leave") {
          acc[employeeId._id].casualLeave += 1;
        } else if (status === "medical_leave") {
          acc[employeeId._id].medicalLeave += 1;
        }

        return acc;
      }, {});
      setAttendanceSummary(Object.values(summary));
    } catch (error) {
      toast.error("Failed to fetch attendance records");
    }
  };

  const handleRefresh = () => {
    fetchAttendanceRecords();
    toast.success("Attendance records refreshed successfully");
  };

  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Attendance Details</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Present Days
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Casual Leave
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Leave
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceSummary.length === 0 && (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No records found</td>
                </tr>
              )}
              {attendanceSummary.map((employee) => (
                <tr key={employee.employeeId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.presentDays}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.casualLeave}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.medicalLeave}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Refresh
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default AttendanceDetails;
