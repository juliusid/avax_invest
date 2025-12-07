import React from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FieldArchives = () => {
  return (
    <section
      id="archives"
      className="bg-gray-900 py-24 border-y border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* National Gallery Style Header - "Text Section like in image" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="block text-farm-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              The Collection
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-none tracking-tight mb-8">
              Discover our <br />
              <span className="text-gray-400 italic">Operations.</span>
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed max-w-md">
              Our extraordinary collection brings together real-time data, drone
              surveys, and harvest reports from our global sites.
            </p>
            <div className="mt-8">
              <Link
                to="/archives"
                className="flex items-center gap-2 text-white border-b border-farm-500 pb-1 hover:text-farm-500 transition-colors uppercase text-xs tracking-widest font-medium w-fit cursor-pointer"
              >
                Explore the full Archive <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Hero Video Simulation Card - Placed next to text for impact */}
          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group cursor-pointer shadow-2xl shadow-black/50">
            <img
              src="https://images.unsplash.com/photo-1499529112071-48cb8a2e0100?auto=format&fit=crop&w=800&q=80"
              alt="Drone Survey"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-farm-500/80 group-hover:border-farm-400 transition-all duration-300">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4">
              <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-sm text-xs text-white font-mono uppercase tracking-wider">
                Live Feed • Iowa
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Grid - "Wall of Art" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          {/* Card 1: Tall Vertical */}
          <div className="group relative md:col-span-1 md:row-span-2 overflow-hidden bg-gray-800 rounded-sm cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1551717366-2675d0506eb3?auto=format&fit=crop&w=800&q=80"
              alt="Maize Harvest"
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            {/* Hidden Text Details - Show on Hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-farm-400 text-xs tracking-widest uppercase font-bold mb-1">
                Harvest Report
              </span>
              <h3 className="text-white text-2xl font-light">Maize Yields</h3>
            </div>
          </div>

          {/* Card 2: Wide Horizontal */}
          <div className="group relative md:col-span-2 overflow-hidden bg-gray-800 rounded-sm cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
              alt="Logistics"
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-farm-400 text-xs tracking-widest uppercase font-bold mb-1">
                Global Logistics
              </span>
              <h3 className="text-white text-2xl font-light">
                Supply Chain Loading
              </h3>
            </div>
          </div>

          {/* Card 3: Standard Square */}
          <div className="group relative md:col-span-1 overflow-hidden bg-gray-800 rounded-sm cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1526346698789-22fd84314424?auto=format&fit=crop&w=800&q=80"
              alt="Vineyard"
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-farm-400 text-xs tracking-widest uppercase font-bold mb-1">
                Napa Valley
              </span>
              <h3 className="text-white text-2xl font-light">
                Vine Inspection
              </h3>
            </div>
          </div>

          {/* Card 4: Standard Square */}
          <div className="group relative md:col-span-1 overflow-hidden bg-gray-800 rounded-sm cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"
              alt="Barley"
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-farm-400 text-xs tracking-widest uppercase font-bold mb-1">
                Scotland
              </span>
              <h3 className="text-white text-2xl font-light">Grain Analysis</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
