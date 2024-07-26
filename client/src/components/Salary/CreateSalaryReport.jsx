/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getSalaries as getSalaryRecords, createSalary } from "../../api/salaryApi";
import { toast, Toaster } from "react-hot-toast";

const CreateSalaryReport = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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

  const handleCreateSalary = async () => {
    if (!employeeId || !baseSalary || !month || !year) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const salaryData = { employeeId, baseSalary, month, year };
      await createSalary(salaryData);
      fetchSalaryRecords();
      toast.success("Salary record created successfully");
    } catch (error) {
      toast.error(`${error.response.data.message || error.response.data || "Failed to create salary record"}`);
    }
  };

  return (
    <section>
      <div className="bg-white shadow-md p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Create Salary Record</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="baseSalary">
              Base Salary
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="baseSalary"
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="month">
              Month
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="month"
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="year">
              Year
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCreateSalary}>
            Create Salary Record
          </button>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default CreateSalaryReport;
