import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { investmentApi } from "../api/investments"; // ✅ Make sure this imports correctly
import { Button } from "../components/Button.jsx";
import { useNotification } from "../contexts/NotificationContext";
import {
  MapPin,
  ShieldCheck,
  Info,
  ArrowLeft,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";

// Helper for image URLs
const getImageUrl = (url: string) => {
  if (!url) return "https://via.placeholder.com/800x600?text=No+Image";
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url}`;
};

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [slots, setSlots] = useState(1);

  // 1. Fetch Real Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await investmentApi.getOne(id);
        if (data.success) {
          setProject(data.data.project);
        }
      } catch (error) {
        console.error("Error fetching project", error);
        showNotification("error", "Failed to load project details");
        navigate("/invest");
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

  // 2. Real Calculations
  // Backend sends: min_investment, total_slots, raised_amount, target_amount
  const pricePerSlot = parseFloat(project.min_investment || 0);

  // Calculate Slots Left based on backend data
  // If backend sends 'slots_left', use it. Otherwise calculate.
  const slotsSold = Math.floor(
    parseFloat(project.raised_amount) / pricePerSlot
  );
  const slotsLeft =
    project.slots_left !== undefined
      ? project.slots_left
      : project.total_slots - slotsSold;

  const investmentTotal = slots * pricePerSlot;

  // Progress Calculation
  const progressPercent =
    (parseFloat(project.raised_amount) / parseFloat(project.target_amount)) *
    100;

  // Handlers
  const incrementSlots = () => {
    if (slots < slotsLeft) setSlots((prev) => prev + 1);
  };

  const decrementSlots = () => {
    if (slots > 1) setSlots((prev) => prev - 1);
  };

  const handleInvest = async () => {
    setInvesting(true);
    try {
      const { data } = await investmentApi.invest({
        projectId: project.id,
        slots: slots,
      });

      if (data.success) {
        showNotification("success", "Investment Successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Investment failed.";
      showNotification("error", msg);
    } finally {
      setInvesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/invest"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Opportunities
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {project.title.charAt(0).toUpperCase() + project.title.slice(1)}
            </h1>
            <div className="flex items-center gap-2 mb-3 text-gray-300">
              <MapPin size={16} className="text-farm-500" />
              {project.location.charAt(0).toUpperCase() +
                project.location.slice(1)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Target ROI
                </p>
                <p className="text-2xl font-bold text-farm-500">
                  {project.roi_percentage}%
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Per {project.unit_name.toUpperCase()}
                </p>
                <p className="text-xl font-bold text-white">
                  ₦{pricePerSlot.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Duration
                </p>
                <p className="text-2xl font-bold text-white">
                  {project.duration_months}{" "}
                  <span className="text-sm font-normal text-gray-400">Mo</span>
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Available {project.unit_name.toUpperCase()}
                </p>
                <p className="text-2xl font-bold text-white">{slotsLeft}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description.charAt(0).toUpperCase() +
                  project.description.slice(1)}
              </p>
            </div>

            {/* Risk Section */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <ShieldCheck className="mr-2 text-farm-500" /> Security & Risk
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Info
                    size={18}
                    className="text-blue-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    This investment is verified. All assets are insured.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Action (SLOT SELECTION) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Funding Progress</span>
                  <span>{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-farm-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>
                    Raised: ₦
                    {parseFloat(project.raised_amount).toLocaleString()}
                  </span>
                  <span>
                    Goal: ₦{parseFloat(project.target_amount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* ✅ SLOT SELECTOR UI */}
              <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 font-medium">
                    Select{" "}
                    {project.unit_name.charAt(0).toUpperCase() +
                      project.unit_name.slice(1)}
                  </span>
                  <span className="text-xs text-farm-400 bg-farm-400/10 px-2 py-1 rounded">
                    {slotsLeft} Available
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-900 rounded-lg p-1 border border-gray-600 mb-4">
                  <button
                    onClick={decrementSlots}
                    disabled={slots <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="text-xl font-bold text-white w-12 text-center">
                    {slots}
                  </div>
                  <button
                    onClick={incrementSlots}
                    disabled={slots >= slotsLeft}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="space-y-2 text-sm border-t border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">
                      Price per{" "}
                      {project.unit_name.charAt(0).toUpperCase() +
                        project.unit_name.slice(1)}
                    </span>
                    <span className="text-white">
                      ₦{pricePerSlot.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-300 font-bold">Total</span>
                    <span className="text-xl font-bold text-farm-500">
                      ₦{investmentTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full py-4 text-lg mb-3"
                onClick={handleInvest}
                disabled={
                  investing || slotsLeft === 0 || project.status !== "open"
                }
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
