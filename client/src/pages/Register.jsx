// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { register as registerUser } from "../api/authApi";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

    if (!formData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      toast.error("Please enter a valid email address");
      return;
    }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

    try {
      setLoading(true);
      await registerUser(formData);
      toast.success("Registration successful");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-2 bg-white p-5 mb-16 shadow-xl rounded">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-3" autoComplete='true'>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            name
          </label>
          <input type="text" name="name" id="name"
          autoFocus={true} value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" name="email" autoComplete="username" id="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input type="password" name="password" autoComplete="new-password" id="password" value={formData.password} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input type="password" name="confirmPassword" autoComplete='new-password' id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="block text-center mt-2 font-bold text-sm text-blue-500 hover:text-blue-800 duration-300">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
