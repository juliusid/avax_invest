import React from 'react';
import { Play, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export const FieldArchives: React.FC = () => {
  return (
    <section className="bg-stone-50 py-24 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Gallery Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-stone-300 pb-8">
          <div className="max-w-2xl">
            <span className="block text-farm-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Transparency in Action
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight tracking-tight">
              The Field Archives
            </h2>
            <p className="mt-6 text-lg text-gray-600 font-light leading-relaxed max-w-xl">
              Real-time updates from our global agricultural projects. 
              Documenting the journey from seed to harvest with radical transparency.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-1">
              Collection No. 04
            </div>
            <div className="text-xs font-mono text-gray-400 tracking-widest uppercase">
              Est. 2021
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          
          {/* Card 1: Aerial Survey (Video) - Wide */}
          <div className="group relative md:col-span-2 overflow-hidden bg-gray-200 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1530268578403-f14421b8c199?q=80&w=2674&auto=format&fit=crop" 
              alt="Aerial Survey" 
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500 border border-white/30">
                <Play className="w-8 h-8 text-white fill-current ml-1" />
              </div>
            </div>

            {/* Hover Info */}
            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-white text-[10px] tracking-[0.2em] uppercase mb-2 font-medium">Video Feed</span>
                  <h3 className="text-white text-2xl font-light">Aerial Survey: Iowa Belt</h3>
                </div>
                <div className="text-right text-white/80 text-xs font-mono">
                  <span className="block">NOV 2023</span>
                  <span className="block">42° N, 93° W</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Maize Harvest - Tall */}
          <div className="group relative md:col-span-1 md:row-span-2 overflow-hidden bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1628104533924-d922a9442078?q=80&w=2000&auto=format&fit=crop" 
              alt="Maize Harvest" 
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="bg-white/90 backdrop-blur text-gray-900 text-xs px-3 py-1 font-mono uppercase tracking-widest">
                  Harvest Day 12
               </div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/60 to-transparent">
               <span className="block text-white text-[10px] tracking-[0.2em] uppercase mb-2 font-medium">Crop Report</span>
               <h3 className="text-white text-2xl font-light mb-2">Maize Harvest</h3>
               <p className="text-white/80 text-sm font-light line-clamp-2">
                 Yields are exceeding projections by 15% due to favorable late-summer rains in the region.
               </p>
            </div>
          </div>

          {/* Card 3: Logistics Fleet - Standard */}
          <div className="group relative md:col-span-1 overflow-hidden bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop" 
              alt="Logistics" 
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/60 to-transparent">
              <span className="block text-white text-[10px] tracking-[0.2em] uppercase mb-2 font-medium">Distribution</span>
              <h3 className="text-white text-xl font-light">Logistics Fleet</h3>
            </div>
          </div>

          {/* Card 4: Community Impact - Standard */}
          <div className="group relative md:col-span-1 overflow-hidden bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1595244585350-01d677864831?q=80&w=2672&auto=format&fit=crop" 
              alt="Community" 
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

             <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/60 to-transparent">
              <span className="block text-white text-[10px] tracking-[0.2em] uppercase mb-2 font-medium">Community</span>
              <h3 className="text-white text-xl font-light">Local Impact</h3>
            </div>
          </div>

        </div>
        
        {/* Gallery Footer */}
        <div className="mt-12 flex justify-center">
            <button className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors uppercase text-xs tracking-widest font-medium">
                View Full Archive
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
};
