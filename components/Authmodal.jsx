import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Globe,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "./Button.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNotification } from "../contexts/NotificationContext"; // ✅ 1. Import Notification Hook

export const AuthModal = ({
  isOpen,
  initialMode,
  onClose,
  onVerificationNeeded,
}) => {
  const { login, signup } = useAuth();
  const { showNotification } = useNotification(); // ✅ 2. Use the hook
  const [mode, setMode] = useState(initialMode);
  const [signupStep, setSignupStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "USA",
    password: "",
    code: "",
  });

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSignupStep(1);
      setError("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "USA",
        password: "",
        code: "",
      });
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // --- LOGIN LOGIC ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);

      // ✅ 3. Show Success Toast
      showNotification("success", "Login Successful! Welcome back.");

      onClose();
    } catch (err) {
      // Handle "Not Verified" login error
      if (
        err.response?.data?.errorCode === "EMAIL_NOT_VERIFIED" ||
        err.response?.data?.errorCode === "PHONE_NOT_VERIFIED"
      ) {
        const { email, phone } = err.response.data.data;

        // ✅ 4. Notify user why they are being moved
        showNotification("warning", "Please verify your account to continue.");
        onVerificationNeeded(email, phone);
        return;
      }

      const msg =
        err.response?.data?.message ||
        "Login failed. Please check credentials.";
      setError(msg);
      // Optional: show error toast too
      // showNotification("error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  // --- SIGNUP LOGIC (Step 1) ---
  const handleSignupStep1 = (e) => {
    e.preventDefault();
    setSignupStep(2);
  };

  // --- SIGNUP VERIFICATION (Step 2) ---
  const handleSignupVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { code, ...registrationData } = formData;
      await signup(registrationData);

      // ✅ 5. Show Success Toast
      showNotification(
        "success",
        "Account created! Please verify your details."
      );

      // Trigger verification flow
      onVerificationNeeded(formData.email, formData.phone);
    } catch (err) {
      // Handle "User Exists" (Conflict) error
      if (err.response && err.response.status === 409) {
        // ✅ 6. Use Toast instead of Alert
        showNotification("info", "You already have an account. Please Log In.");

        setMode("login");
        setSignupStep(1);
      } else {
        const msg = err.response?.data?.message || "Registration failed.";
        setError(msg);
        showNotification("error", msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setSignupStep(1);
    setError("");
  };

  const passwordStrength = formData.password.length > 8 ? "Strong" : "Weak";
  const passwordColor =
    formData.password.length > 8 ? "text-green-500" : "text-yellow-500";

  // ... (Render/Return section remains the same) ...
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-1 hover:bg-gray-800 rounded-full"
        >
          <X size={20} />
        </button>

        {error && (
          <div className="absolute top-0 left-0 right-0 bg-red-500/10 border-b border-red-500/20 p-2 text-center text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* --- LOGIN VIEW --- */}
        {mode === "login" && (
          <div className="p-8 mt-4">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-farm-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-farm-500">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">
                Access your agricultural portfolio
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="investor@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-farm-500 hover:text-farm-400"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mt-6 py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-white hover:text-farm-500 font-medium underline-offset-4 hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        )}

        {/* --- SIGN UP VIEW STEP 1 --- */}
        {mode === "signup" && signupStep === 1 && (
          <div className="p-8 mt-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-400 text-sm">
                Join the global agricultural market.
              </p>
            </div>

            <form onSubmit={handleSignupStep1} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Country
                </label>
                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-farm-500 appearance-none cursor-pointer"
                  >
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide flex justify-between">
                  <span>Password</span>
                  <span
                    className={`text-[10px] ${
                      formData.password ? passwordColor : "text-gray-600"
                    }`}
                  >
                    {formData.password ? passwordStrength : "Min 8 chars"}
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span className="flex items-center">
                    Continue <ChevronRight size={16} className="ml-1" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-white hover:text-farm-500 font-medium underline-offset-4 hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        )}

        {/* --- SIGN UP VIEW STEP 2 --- */}
        {mode === "signup" && signupStep === 2 && (
          <div className="p-8 text-center mt-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500 animate-pulse">
              <ShieldCheck size={32} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Final Step</h2>
            <p className="text-gray-400 text-sm mb-8 px-4">
              Confirm your details to create your Investor account.
            </p>

            <form onSubmit={handleSignupVerification} className="space-y-6">
              <Button
                variant="primary"
                className="w-full py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <button
              onClick={() => setSignupStep(1)}
              className="mt-6 text-sm text-gray-500 hover:text-white flex items-center justify-center mx-auto gap-1"
            >
              Back to details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
