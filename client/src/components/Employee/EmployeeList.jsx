import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";
import { toast } from "react-hot-toast";
import EmployeeForm from "./EmployeeForm";
import CreateEmployeeForm from "./CreateEmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [createEmployee, setCreateEmployee] = useState(false);
  const [updateEmployee, isUpdateEmployee] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (employee) => {
    console.log("Editing employee:", employee);
    console.log("Editing employee:", JSON.stringify(employee, null, 2));
    setEditingEmployee(employee);
    isUpdateEmployee(true);
  };

  const handleView = (id) => {
    navigate(`/employee/${id}`);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.employees);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  const handleDelete = (id) => {
    try {
      toast.success("Employee deleted successfully");
      setTimeout(async () => {
        await deleteEmployee(id);
        fetchEmployees();
      }, 3000);
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-10">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-bold mb-4">Employee List</h2>
        {updateEmployee ? <EmployeeForm editingEmployee={editingEmployee} setEditingEmployee={setEditingEmployee} fetchEmployees={fetchEmployees} /> : ""}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {
                employees.length === 0 && <tr><td colSpan={6} className="text-center py-4">No employees found</td></tr>
              }
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.address.split(",").map((part, index) => (
                      <span key={index}>
                        {part}
                        {index < employee.address.split(",").length - 1 && <br />}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(employee)} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                    <span className="mx-1">|</span>
                    <button onClick={() => handleDelete(employee._id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                    <span className="mx-1">|</span>
                    <button onClick={() => handleView(employee._id)} className="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {createEmployee ? (
          <CreateEmployeeForm setCreateEmployee={setCreateEmployee} fetchEmployees={fetchEmployees} />
        ) : (
          <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setCreateEmployee(true)}>
            Add Employee
          </button>
        )}
      </div>

    </div>
  );
};

export default EmployeeList;
