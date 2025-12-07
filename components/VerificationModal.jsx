import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "./Button";
import { useAuth } from "../contexts/AuthContext";

export const VerificationModal = ({ isOpen, onClose, email, phone }) => {
  const { verifyEmail, verifyPhone, resendEmail, resendPhone } = useAuth();
  const [step, setStep] = useState("email"); // 'email' or 'phone'
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (step === "email") {
        await verifyEmail(code);
        setSuccessMsg("Email verified successfully!");
        setTimeout(() => {
          setCode("");
          setSuccessMsg("");
          setStep("phone"); // Move to next step
        }, 1500);
      } else {
        await verifyPhone(phone, code);
        setSuccessMsg("Phone verified successfully! Logging you in...");
        setTimeout(() => {
          onClose();
          window.location.reload(); // Refresh to load user session
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      if (step === "email") {
        await resendEmail(email);
      } else {
        await resendPhone(phone);
      }
      setSuccessMsg("New code sent!");
    } catch (err) {
      setError("Failed to resend code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-farm-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-farm-500">
            {step === "email" ? <Mail size={32} /> : <Phone size={32} />}
          </div>
          <h2 className="text-2xl font-bold text-white">
            Verify your {step === "email" ? "Email" : "Phone"}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter the code sent to <br />
            <span className="text-white font-medium">
              {step === "email" ? email : phone}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-xs">
            <CheckCircle size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={
              step === "email" ? "Enter Email Token" : "Enter SMS OTP"
            }
            className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-4 text-center text-2xl font-bold tracking-widest text-white focus:outline-none focus:border-farm-500 transition-colors"
          />

          <Button
            variant="primary"
            className="w-full py-3"
            disabled={isLoading || !code}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              `Verify ${step === "email" ? "Email" : "Phone"}`
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Didn't receive code? Resend
          </button>
        </div>
      </div>
    </div>
  );
};
