// src/api/auth.js
import client from "./client";

// ... existing login/register/logout/me/verification functions ...

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

// NEW VERIFICATION FUNCTIONS (provided by user, now cited)
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

// ===================================
// ✅ NEW: PROFILE MANAGEMENT FUNCTIONS
// ===================================

export const updateUserProfile = async (updateData) => {
  // Assuming the backend handles the critical email/phone change logic with OTP
  const response = await client.patch("/profile/update", updateData);
  return response.data;
};

export const changePassword = async (currentPassword, newPassword, otpCode) => {
  // Pass OTP for verification if required by the server for a password change
  const response = await client.post("/profile/password", {
    currentPassword,
    newPassword,
    otpCode,
  });
  return response.data;
};

export const uploadKycDocument = async (docId, file) => {
  const formData = new FormData();
  formData.append("documentType", docId);
  formData.append("file", file);

  // Note: axios handles Content-Type for FormData automatically
  const response = await client.post("/kyc/upload", formData);
  return response.data;
};

export const investments = {
  // Admin
  create: (data) => client.post("/admin/invest/projects", data),
  listAdmin: () => client.get("/admin/invest/projects"),
  updateStatus: (id, status) =>
    client.patch(`/admin/invest/projects/${id}/status`, { status }),

  // User (Public/Protected)
  // Your route file says: router.get("/projects", listProjects);
  getAll: () => client.get("/investments/projects"),
  getOne: (id) => client.get(`/investments/projects/${id}`),
  invest: (data) => client.post("/investments/invest", data),
  getPortfolio: () => client.get("/investments/portfolio"),
};
