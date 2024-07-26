import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export const getEmployees = async () => {
  try {
    const response = await axiosInstance.get("/v1/employees");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch employees");
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/v1/employees/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || `Failed to fetch employee with id ${id}`);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post("/v1/employees", employeeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      toast.error(error.response.data.error || "Failed to create employee");
    } else if (error.request) {
      throw Error;
    } else {
      toast.error(error.message || "Failed to create employee");
    }

    throw error;
  }
};

export const updateEmployee = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/v1/employees/${id}`, data);

    return response.data.data;
  } catch (error) {
    toast.error(error.response.data.message || `Failed to update employee with id ${id}. Please try again.`);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axiosInstance.delete(`/v1/employees/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || `Failed to delete employee with id ${id}. Please try again.`);
    throw error;
  }
};
