// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../api/authApi";
import toast from "react-hot-toast";

// @ts-ignore
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile.data) {
        setUserData(profile.data.user);
      }
    };
    fetchProfile();

    if (token) {
      const decoded = jwtDecode(token);
      // @ts-ignore

      setUser(decoded);

      // @ts-ignore

      if (decoded.exp * 1000 < Date.now()) {
        toast.loading("Your session has expired. Please login again.");
        console.log(localStorage.removeItem("token"));
        logout();
      }
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      // @ts-ignore
      setUser(decoded);
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, userData }}>{children}</AuthContext.Provider>;
};
