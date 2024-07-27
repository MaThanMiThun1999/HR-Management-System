// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getSalaries as getSalaryRecords, deleteSalary } from "../../api/salaryApi";
import { toast, Toaster } from "react-hot-toast";
import moment from "moment";

const SalaryList = () => {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    fetchSalaryRecords();
  }, []);

  const fetchSalaryRecords = async () => {
    try {
      const response = await getSalaryRecords();
      setSalaryData(response);
    } catch (error) {
      toast.error("Failed to fetch salary records");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSalary(id);
      toast.success("Salary record deleted");
      fetchSalaryRecords();
    } catch (error) {
      toast.error("Failed to delete salary record");
    }
  };

  const handleRefresh = () => {
    fetchSalaryRecords();
    toast.success("Updated Successfully");
  };

  return (
    <div className="px-4 py-5 sm:p-6 mb-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Salary Report</h2>
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
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CreatedAt
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Salary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary Slip
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaryData.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  No salary records found
                </td>
              </tr>
            )}
            {salaryData.map((employee) => (
              <tr key={employee._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeId._id === null ? "Unknown" : `${employee.employeeId._id}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeId.name === null ? "Unknown" : `${employee.employeeId.name}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{moment(employee.date).format("DD/MM/YYYY")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-grays-900">{moment(employee.updatedAt).format("DD/MM/YYYY - hh:mm")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.netSalary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleDelete(employee._id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href={`https://hr-management-backend-eczm.onrender.com/uploads/PDF/${employee.pdfUrl.split("\\").pop()}`} target="_blank" className="text-indigo-600 hover:text-indigo-900">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleRefresh} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Refresh
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default SalaryList;
