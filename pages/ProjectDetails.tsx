import React from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_PROJECTS } from "../constants";
import { Button } from "../components/Button.jsx";
import {
  MapPin,
  TrendingUp,
  Clock,
  ShieldCheck,
  PieChart,
  Info,
  ArrowLeft,
} from "lucide-react";

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = MOCK_PROJECTS.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h2 className="text-2xl text-white mb-4">Project not found</h2>
        <Button to="/invest" variant="primary">
          Back to Investments
        </Button>
      </div>
    );
  }

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
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-farm-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
                {project.category}
              </span>
              <span className="bg-gray-800/80 text-gray-300 text-xs font-medium px-3 py-1 rounded-full flex items-center backdrop-blur-sm">
                <MapPin size={12} className="mr-1" /> {project.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {project.title}
            </h1>
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
                  {project.roi}%
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Min Investment
                </p>
                <p className="text-2xl font-bold text-white">
                  ${project.minInvestment.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Term Length
                </p>
                <p className="text-2xl font-bold text-white">
                  {project.termLength}{" "}
                  <span className="text-sm font-normal text-gray-400">mos</span>
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                  Funded
                </p>
                <p className="text-2xl font-bold text-white">
                  {project.fundedPercent}%
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description} This asset represents a prime opportunity
                in the {project.category.toLowerCase()} sector. Located in the
                fertile region of {project.location}, this project leverages
                advanced agricultural techniques to maximize yield while
                adhering to sustainable practices.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Investors can expect regular updates via our field archives and
                annual dividend payouts derived from crop sales. Capital
                appreciation is projected based on historical land value trends
                in the area.
              </p>
            </div>

            {/* Risk & Security */}
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
                    This investment is backed by real property assets held in a
                    dedicated SPV (Special Purpose Vehicle).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info
                    size={18}
                    className="text-blue-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Comprehensive crop insurance is in place to mitigate
                    weather-related risks.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Funding Progress</span>
                  <span>{project.fundedPercent}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-farm-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${project.fundedPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Min. Investment</span>
                  <span className="text-white font-medium">
                    ${project.minInvestment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Processing Fee</span>
                  <span className="text-white font-medium">1.5%</span>
                </div>
              </div>

              <Button variant="primary" className="w-full py-4 text-lg mb-3">
                Invest Now
              </Button>
              <p className="text-center text-xs text-gray-500">
                By clicking Invest Now, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
