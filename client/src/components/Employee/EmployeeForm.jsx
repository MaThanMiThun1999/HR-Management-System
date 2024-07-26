// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { updateEmployee } from "../../api/employeeApi";
import { toast } from "react-hot-toast";

const EmployeeForm = ({ editingEmployee, setEditingEmployee, fetchEmployees, setUpdateEmployee }) => {
  const [employee, setEmployee] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    address: "",
    contactNumber: "",
    proofs: {
      aadhar: "",
      pan: "",
      drivingLicense: "",
    },
    profilePicture: {
      filename: "",
      contentType: "",
    },
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee({
        _id: editingEmployee._id || "",
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        role: editingEmployee.role || "",
        address: editingEmployee.address || "",
        contactNumber: editingEmployee.contactNumber || "",
        aadhar: editingEmployee.proofs?.aadhar || "",
        pan: editingEmployee.proofs?.pan || "",
        drivingLicense: editingEmployee.proofs?.drivingLicense || "",
        profilePicture: editingEmployee.profilePicture || { filename: "", contentType: "" },
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Submitting with ID:", employee._id);

      // console.log("Submitting with data:", employee);
      await updateEmployee(employee._id, employee);

      toast.success("Employee updated successfully");
      fetchEmployees();
      
      setEditingEmployee(null);
      setUpdateEmployee(false);
    } catch (error) {
      toast.error("Failed to update employee");
      console.error("Error updating employee:", error);
    }
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setUpdateEmployee(false);
  };

  console.log("🚀 ~ file:", employee.proofs);
  console.log("🚀 ~ file: EmployeeForm.jsx:employee.proofs", JSON.stringify(employee.proofs, null, 2));

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Form fields */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={employee.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={employee.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
          Role
        </label>
        <input
          id="role"
          name="role"
          type="text"
          value={employee.role}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={employee.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
          Contact Number
        </label>
        <input
          id="contactNumber"
          name="contactNumber"
          type="text"
          value={employee.contactNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhar">
          Aadhar
        </label>
        <input
          id="aadhar"
          name="aadhar"
          type="text"
          value={employee.aadhar}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pan">
          PAN
        </label>
        <input
          id="pan"
          name="pan"
          type="text"
          value={employee.pan}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="drivingLicense">
          Driving License
        </label>
        <input
          id="drivingLicense"
          name="drivingLicense"
          type="text"
          value={employee.drivingLicense}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
          Profile Picture Filename
        </label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="text"
          value={employee.profilePicture.filename}
          onChange={(e) =>
            setEmployee((prevState) => ({
              ...prevState,
              profilePicture: {
                ...prevState.profilePicture,
                filename: e.target.value,
              },
            }))
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save
        </button>
        <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
