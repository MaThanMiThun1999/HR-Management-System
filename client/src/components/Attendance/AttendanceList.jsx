// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAttendanceRecords, getAttendanceByEmployeeId,deleteAttendanceRecord } from "../../api/attendanceApi";
import { toast } from "react-hot-toast";
import moment from "moment";
import AttendanceForm from "./AttendanceForm";

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [createAttendance, setCreateAttendance] = useState(false);
  const [updateAttendance, setUpdateAttendance] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchAttendanceByEmployeeId(id);
    } else {
      fetchAttendanceRecords();
    }
  }, [id]);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await getAttendanceRecords();
      setAttendanceRecords(response.data);
    } catch (error) {
      toast.error("Failed to fetch attendance records");
    }
  };

  const fetchAttendanceByEmployeeId = async (employeeId) => {
    try {
      const response = await getAttendanceByEmployeeId(employeeId);
      setAttendanceRecords(response.data);
    } catch (error) {
      toast.error("Failed to fetch attendance records for this employee");
    }
  };

  const handleEdit = (attendance) => {
    setEditingAttendance(attendance);
    setUpdateAttendance(true);
  };

  const handleCreate = () => {
    setEditingAttendance(null);
    setCreateAttendance(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendanceRecord(id);
      toast.success("Attendance record deleted successfully");
      if (employeeId) {
        fetchAttendanceByEmployeeId(employeeId);
      } else {
        fetchAttendanceRecords();
      }
    } catch (error) {
      toast.error("Failed to delete attendance record");
    }
  };

  return (
    <>
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mt-4">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Attendance</h2>
        <div className="overflow-x-auto">
          {(updateAttendance || createAttendance) && (
            <AttendanceForm
              setCreateAttendance={setCreateAttendance}
              setUpdateAttendance={setUpdateAttendance}
              editingAttendance={editingAttendance}
              fetchAttendanceRecords={fetchAttendanceRecords}
              fetchAttendanceByEmployeeId={fetchAttendanceByEmployeeId}
              employeeId={employeeId}
            />
          )}
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
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                attendanceRecords.length === 0 && <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No attendance records found</td></tr>
              }
              {attendanceRecords.map((attendance) => (
                 <tr key={attendance._id}>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.employeeId._id === null ? "Unknown" : `${attendance.employeeId._id}`}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.employeeId.name === null ? "Unknown" : `${attendance.employeeId.name}`}</td>

                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(attendance.date).format("YYYY-MM-DD")}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.status === "present" ? "Present" : "Absent"}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {attendance.leaveType === "medical" ? "Medical Leave" : attendance.leaveType === "casual" ? "Casual Leave" : "Leave Without Pay"}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{!attendance.reason ? "No Reason Provided" : attendance.reason}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                   <button onClick={() => handleEdit(attendance)} className="text-indigo-600 hover:text-indigo-900">
                     Edit
                   </button>
                   <span className="mx-1">|</span>
                   <button onClick={() => handleDelete(attendance._id)} className="text-red-600 hover:text-red-900">
                     Delete
                   </button>
                 </td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
     <div className="mt-6 mb-12">
     <button onClick={handleCreate} className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 duration-300">
       Add Attendance
     </button>
   </div>
    </>
  );
};

export default AttendanceList;
