// src/api/auth.js
import client from "./client";

// ... existing login/register/logout/me functions ...

export const loginUser = async (email, password) => {
  const payload = { email, password, appType: "investor" };
  const response = await client.post("/auth/login", payload);
  return response.data;
};

export const registerUser = async (userData) => {
  const payload = { ...userData, role: "investor" };
  const response = await client.post("/auth/register", payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await client.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await client.get("/auth/me");
  return response.data;
};

// ✅ NEW VERIFICATION FUNCTIONS
export const verifyEmailToken = async (token) => {
  const response = await client.post("/verify/email", { token });
  return response.data;
};

export const verifyPhoneOTP = async (phone, otp) => {
  const response = await client.post("/verify/phone", { phone, otp });
  return response.data;
};

export const resendEmailCode = async (email) => {
  const response = await client.post("/verify/email/resend", { email });
  return response.data;
};

export const resendPhoneCode = async (phone) => {
  const response = await client.post("/verify/phone/resend", { phone });
  return response.data;
};
