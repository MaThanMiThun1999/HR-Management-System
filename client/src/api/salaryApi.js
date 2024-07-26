import axiosInstance from "./axiosInstance";

export const getSalaries = async () => {
  const response = await axiosInstance.get("/v1/salaries");
  return response.data;
};

export const createSalary = async (salaryData) => {
  const response = await axiosInstance.post("/v1/salaries", salaryData);
  return response.data;
};

export const updateSalary = async (id, salaryData) => {
  const response = await axiosInstance.put(`/v1/salaries/${id}`, salaryData);
  return response.data;
};

export const deleteSalary = async (id) => {
  const response = await axiosInstance.delete(`/v1/salaries/${id}`);
  return response.data;
};

export const getSalaryById = async (id) => {
  const response = await axiosInstance.get(`/v1/salaries/${id}`);
  return response.data;
};
