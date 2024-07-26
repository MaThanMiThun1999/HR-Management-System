// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.token);
      toast.success("Login successful!", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex justify-center items-center h-[85vh] w-[95%] mx-auto lg:w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded" autoComplete='true'>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input type="email" name="email" autoFocus={true} autoComplete="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 mb-4 w-full" required />
        <div className="relative">
          <input type={isShowPassword ? "text" : "password"} name="password" autoComplete="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 w-full pr-10" required />
          <button type="button" onClick={() => setIsShowPassword((isShowPassword)=>!isShowPassword)} className="absolute top-0 right-0 bottom-0 px-4 h-full">
            <span className='text-xs uppercase font-bold border-2 px-2 rounded-full border-black/70'>{
              isShowPassword ? 'Hide' : 'Show'
            }</span>
          </button>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 focus:bg-blue-700 hover:bg-blue-600 mt-4 text-white px-4 py-2 rounded">
            Login
          </button>
          <Link to="/register" className="block text-center mt-2 font-bold text-sm text-blue-500 hover:text-blue-800">
            Create An Account!
          </Link>
        </div>
      </form>
      <Toaster />
    </main>
  );
};

export default Login;
