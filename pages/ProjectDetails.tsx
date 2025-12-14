import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { investmentApi } from "../api/investments";
import { Button } from "../components/Button"; // Check extension .tsx or .jsx
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import {
  MapPin,
  ShieldCheck,
  Info,
  ArrowLeft,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";

// Image Helper
const getImageUrl = (url: string) => {
  if (!url) return "https://via.placeholder.com/800x600?text=No+Image";
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url}`;
};

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user } = useAuth();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [slots, setSlots] = useState(1);

  // Fetch Project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // ✅ FIX: Use 'getById' instead of 'getOne'
        const { data } = await investmentApi.getById(id);

        if (data.success) setProject(data.data.project);
      } catch (error) {
        console.error("Load Error:", error); // See the real error in console
        showNotification("error", "Failed to load project details");
        // navigate("/invest"); // Optional: Comment this out while debugging so you don't get redirected
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate, showNotification]);
  if (loading)
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        Loading...
      </div>
    );
  if (!project) return null;

  // Calculations
  const pricePerSlot = parseFloat(project.min_investment || 0);
  const slotsSold = Math.floor(
    parseFloat(project.raised_amount) / pricePerSlot
  );
  const slotsLeft =
    project.slots_left !== undefined
      ? project.slots_left
      : project.total_slots - slotsSold;
  const investmentTotal = slots * pricePerSlot;
  const progressPercent =
    (parseFloat(project.raised_amount) / parseFloat(project.target_amount)) *
    100;

  const incrementSlots = () => {
    if (slots < slotsLeft) setSlots((prev) => prev + 1);
  };
  const decrementSlots = () => {
    if (slots > 1) setSlots((prev) => prev - 1);
  };

  // ✅ NEW HANDLER: Initialize & Redirect
  const handleInvestClick = async () => {
    if (!user) return showNotification("error", "Please login to invest");

    setInvesting(true);
    try {
      // 1. Get Paystack URL from Backend
      const { data } = await investmentApi.initialize({
        projectId: project.id,
        slots: slots,
        // Tell Backend where to send user after payment
        callbackUrl: `${window.location.origin}/verify-investment`,
      });

      if (data.success && data.data.authorization_url) {
        // 2. Redirect to Paystack
        window.location.href = data.data.authorization_url;
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to start payment";
      showNotification("error", msg);
      setInvesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/invest"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden h-[400px] mb-8 border border-gray-800">
          <img
            src={getImageUrl(project.image_url)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold text-white">{project.title}</h1>
            <div className="flex items-center text-gray-300 mt-2">
              <MapPin size={16} className="text-farm-500 mr-2" />{" "}
              {project.location}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
              <p className="text-gray-300 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-gray-400 text-xs uppercase">ROI</span>
                <p className="text-2xl font-bold text-farm-500">
                  {project.roi_percentage}%
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-gray-400 text-xs uppercase">
                  Duration
                </span>
                <p className="text-2xl font-bold text-white">
                  {project.duration_months} Mo
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-gray-400 text-xs uppercase">
                  Unit Cost
                </span>
                <p className="text-xl font-bold text-white">
                  ₦{pricePerSlot.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-gray-400 text-xs uppercase">Left</span>
                <p className="text-2xl font-bold text-white">{slotsLeft}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Investment Action */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Funded</span>
                  <span>{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-farm-500 h-2 rounded-full"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Slot Selector */}
              <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Select Slots</span>
                  <span className="text-xs bg-farm-500/20 text-farm-400 px-2 py-1 rounded">
                    {slotsLeft} available
                  </span>
                </div>
                <div className="flex items-center justify-between bg-gray-900 rounded-lg p-1 border border-gray-600 mb-4">
                  <button
                    onClick={decrementSlots}
                    disabled={slots <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-xl font-bold text-white">{slots}</span>
                  <button
                    onClick={incrementSlots}
                    disabled={slots >= slotsLeft}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                  <span className="text-gray-400">Total</span>
                  <span className="text-xl font-bold text-farm-500">
                    ₦{investmentTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full py-4 text-lg flex justify-center"
                onClick={handleInvestClick}
                disabled={investing || slotsLeft === 0}
              >
                {investing ? (
                  <Loader2 className="animate-spin" />
                ) : slotsLeft === 0 ? (
                  "Sold Out"
                ) : (
                  "Invest Now"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
