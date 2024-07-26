// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, deleteEmployee } from "../../api/employeeApi";
import { toast } from "react-hot-toast";
import moment from "moment";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(id);
      setEmployee(response);
      toast.success(`Successfully Entered ${response.name}'s Profile`);
    } catch (error) {
      toast.error("Failed to fetch employee details");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      navigate("/employees");
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  if (!employee){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <main className='w-[95%] lg:w-full mx-auto'>
      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Employee Details</h1>
      </div>

      <div className="bg-white overflow-hidden shadow-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{employee.name}'s Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <img
                src={employee.profilePictureUrl ? employee.profilePictureUrl : "https://dummyimage.com/300x300/000/fff&text=No+Image"}
                alt={`${employee.name}'s profile`}
                className="h-64 w-64 rounded shadow-[0px_0px_10px_#000000] object-cover aspect-square"
              />
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{employee.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{employee.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900">{employee.role}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 text-sm text-gray-900">{employee.address}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                <p className="mt-1 text-sm text-gray-900">{employee.joinedDate ? moment(employee.joinedDate).format("DD-MMM-YYYY") : ""}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Proofs</label>
                <p className="mt-1 text-sm text-gray-900">Aadhar: {employee.proofs.aadhar}</p>
                <p className="mt-1 text-sm text-gray-900">PAN: {employee.proofs.pan}</p>
                <p className="mt-1 text-sm text-gray-900">Driving License: {employee.proofs.drivingLicense}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-16 space-x-4">
        <button onClick={fetchEmployee} className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
          Refresh
        </button>
        <button onClick={handleDelete} className="inline-block bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600">
          Delete
        </button>
 
      </div>
    </section>
    </main>
  );
};

export default EmployeeDetail;
