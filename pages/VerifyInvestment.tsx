import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { investmentApi } from "../api/investments";
import { useNotification } from "../contexts/NotificationContext";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export const VerifyInvestment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        // Call backend to verify reference
        const { data } = await investmentApi.verify({ reference });

        if (data.success) {
          setStatus("success");
          showNotification("success", "Investment confirmed successfully!");
          setTimeout(() => navigate("/dashboard"), 3000); // Redirect after 3s
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        showNotification("error", "Verification failed.");
      }
    };

    verify();
  }, [searchParams, navigate, showNotification]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <Loader2 className="w-16 h-16 text-farm-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white">
              Verifying Payment...
            </h2>
            <p className="text-gray-400 mt-2">
              Please wait while we confirm your investment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white">
              Payment Successful!
            </h2>
            <p className="text-gray-400 mt-2">
              Your investment has been recorded. Redirecting to dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white">
              Verification Failed
            </h2>
            <p className="text-gray-400 mt-2">
              We couldn't verify your payment. Please contact support if you
              were debited.
            </p>
            <button
              onClick={() => navigate("/invest")}
              className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Back to Investments
            </button>
          </>
        )}
      </div>
    </div>
  );
};
