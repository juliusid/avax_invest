import React from "react";
import { MapPin, TrendingUp, Clock, ArrowRight, Layers } from "lucide-react";
import { Button } from "./Button.jsx";

// Helper to ensure image URLs are correct
const getImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/400x300?text=No+Image";
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url}`;
};

export const InvestmentCard = ({ project }) => {
  // 1. Map Real Backend Data
  // The backend sends 'min_investment', 'roi_percentage', 'duration_months'
  const pricePerSlot = parseFloat(project.min_investment || 0);
  const slotsSold = Math.floor(
    parseFloat(project.raised_amount) / pricePerSlot
  );
  const slotsLeft =
    project.slots_left !== undefined
      ? project.slots_left
      : project.total_slots - slotsSold;
  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-farm-500/10 transition-all duration-300 border border-gray-700 hover:border-farm-500/30 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(project.image_url)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Error";
          }}
        />

        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          <span className="text-xs font-semibold text-white tracking-wide uppercase">
            {project.category}
          </span>
        </div>

        {/* ✅ FIXED: Uses real slotsLeft from backend */}
        <div className="absolute top-3 right-3 bg-farm-600/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-lg">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <Layers size={12} />
            {slotsLeft}{" "}
            {project.unit_name.charAt(0).toUpperCase() +
              project.unit_name.slice(1)}
            {slotsLeft && "s"} Left
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-farm-500 transition-colors">
          {project.title.charAt(0).toUpperCase() + project.title.slice(1)}
        </h3>

        <div className="flex items-center text-gray-400 text-sm mb-6">
          <MapPin size={14} className="mr-1 text-farm-500" />
          {project.location.charAt(0).toUpperCase() + project.location.slice(1)}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
            <div className="flex items-center text-xs text-gray-400 mb-1">
              <TrendingUp size={12} className="mr-1" /> Target ROI
            </div>
            <span className="text-lg font-bold text-farm-500">
              {project.roi_percentage}%
            </span>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
            <div className="flex items-center text-xs text-gray-400 mb-1">
              <Clock size={12} className="mr-1" /> Term
            </div>
            <span className="text-lg font-bold text-white">
              {project.duration_months}{" "}
              <span className="text-xs font-normal text-gray-500">mos</span>
            </span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-400 block text-xs">
              Per{" "}
              {project.unit_name.charAt(0).toUpperCase() +
                project.unit_name.slice(1)}
            </span>
            <span className="font-semibold text-white">
              ₦{pricePerSlot.toLocaleString()}
            </span>
          </div>
          <Button
            to={`/project/${project.id}`}
            variant="outline"
            className="!px-4 !py-2 text-sm"
          >
            View Details <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
