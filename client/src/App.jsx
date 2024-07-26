// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import EmployeeDetail from "./components/Employee/EmployeeDetail";
import Attendance from "./pages/Attendance";
import Employees from "./pages/Employees";
import Salaries from "./pages/Salaries";
import Footer from "./components/Footer";
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/salaries" element={<Salaries />} />
          </Routes>
          <Toaster />
          <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
