import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  verifyEmailToken,
  verifyPhoneOTP,
  resendEmailCode,
  resendPhoneCode,
} from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getCurrentUser();
        if (data.success) {
          setUser(data.data.user);
        }
      } catch (error) {
        setUser(null); // Not logged in
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      if (data.success) {
        setUser(data.data.user);
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // ✅ NEW: Verification Wrappers
  const verifyEmail = async (token) => verifyEmailToken(token);
  const verifyPhone = async (phone, otp) => verifyPhoneOTP(phone, otp);
  const resendEmail = async (email) => resendEmailCode(email);
  const resendPhone = async (phone) => resendPhoneCode(phone);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        verifyEmail,
        verifyPhone,
        resendEmail,
        resendPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
