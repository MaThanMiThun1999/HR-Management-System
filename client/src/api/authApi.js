import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userData", response.data.user.name);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  console.log(response);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  localStorage.removeItem("token");
  return response.data;
};
