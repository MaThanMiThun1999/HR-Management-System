// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { createEmployee } from "../../api/employeeApi";
import { toast } from "react-hot-toast";
import moment from "moment";

// eslint-disable-next-line react/prop-types
const CreateEmployeeForm = ({ setCreateEmployee, fetchEmployees }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    joinedDate: moment().format("YYYY-MM-DD"),
    address: "",
    contactNumber: "",
    proofs: {
      aadhar: "",
      pan: "",
      drivingLicense: "",
    },
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        profilePicture: files[0],
      });
    } else if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("joinedDate", formData.joinedDate);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("proofs[aadhar]", formData.proofs.aadhar);
      formDataToSend.append("proofs[pan]", formData.proofs.pan);
      formDataToSend.append("proofs[drivingLicense]", formData.proofs.drivingLicense);

      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      await createEmployee(formDataToSend);
      toast.success("Employee created successfully");

      setFormData({
        name: "",
        email: "",
        role: "",
        joinedDate: moment().format("YYYY-MM-DD"),
        address: "",
        contactNumber: "",
        proofs: {
          aadhar: "",
          pan: "",
          drivingLicense: "",
        },
        profilePicture: null,
      });
      setCreateEmployee(false)
      fetchEmployees();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error(error.response.data.message || "Failed to create employee. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" encType="multipart/form-data">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input type="text" name="contactNumber" id="contactNumber" value={formData.contactNumber} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="joinedDate" className="block text-sm font-medium text-gray-700">
          Joined Date
        </label>
        <input type="date" name="joinedDate" id="joinedDate" value={formData.joinedDate} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="proofs.aadhar" className="block text-sm font-medium text-gray-700">
          Aadhar
        </label>
        <input type="text" name="proofs.aadhar" id="proofs.aadhar" value={formData.proofs.aadhar} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="proofs.pan" className="block text-sm font-medium text-gray-700">
          PAN
        </label>
        <input type="text" name="proofs.pan" id="proofs.pan" value={formData.proofs.pan} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="proofs.drivingLicense" className="block text-sm font-medium text-gray-700">
          Driving License
        </label>
        <input type="text" name="proofs.drivingLicense" id="proofs.drivingLicense" value={formData.proofs.drivingLicense} onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <div>
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input type="file" name="profilePicture" id="profilePicture" onChange={handleChange} className="border p-2 mb-2 w-full" />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Employee
      </button>
    </form>
  );
};

export default CreateEmployeeForm;
