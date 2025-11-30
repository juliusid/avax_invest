import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Archives: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const archiveItems = [
    {
      id: 1,
      title: "Aerial Survey: Iowa Belt",
      type: "Video Feed",
      date: "NOV 2023",
      location: "42° N, 93° W",
      image: "https://images.unsplash.com/photo-1499529112071-48cb8a2e0100?auto=format&fit=crop&w=800&q=80",
      size: "wide",
      hasVideo: true
    },
    {
      id: 2,
      title: "Maize Harvest",
      type: "Crop Report",
      date: "OCT 2023",
      location: "Iowa, USA",
      image: "https://images.unsplash.com/photo-1551717366-2675d0506eb3?auto=format&fit=crop&w=800&q=80",
      size: "tall",
      description: "Yields are exceeding projections by 15% due to favorable late-summer rains in the region."
    },
    {
      id: 3,
      title: "Logistics Fleet",
      type: "Distribution",
      date: "SEP 2023",
      location: "Global",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      size: "standard"
    },
    {
      id: 4,
      title: "Local Impact",
      type: "Community",
      date: "AUG 2023",
      location: "Kenya",
      image: "https://images.unsplash.com/photo-1595244585350-01d677864831?q=80&w=2672&auto=format&fit=crop",
      size: "standard"
    },
    {
      id: 5,
      title: "Vineyard Inspection",
      type: "Quality Control",
      date: "JUL 2023",
      location: "Napa, CA",
      image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?auto=format&fit=crop&w=800&q=80",
      size: "standard"
    },
    {
      id: 6,
      title: "Soil Analysis",
      type: "Research",
      date: "JUN 2023",
      location: "Lab 04",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop",
      size: "wide"
    },
    // Extra items that show when expanded
    {
      id: 7,
      title: "Spring Planting",
      type: "Operations",
      date: "MAY 2023",
      location: "Midwest",
      image: "https://images.unsplash.com/photo-1625246333195-58197bd47d26?auto=format&fit=crop&w=1920&q=80",
      size: "standard"
    },
    {
      id: 8,
      title: "Barley Check",
      type: "Quality Control",
      date: "APR 2023",
      location: "Scotland",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      size: "tall"
    },
     {
      id: 9,
      title: "Irrigation Setup",
      type: "Infrastructure",
      date: "MAR 2023",
      location: "Sonora",
      image: "https://images.unsplash.com/photo-1563514227146-89309f80784d?auto=format&fit=crop&w=800&q=80",
      size: "standard"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="mb-12 border-b border-gray-800 pb-8">
            <Link to="/" className="text-farm-500 text-sm font-medium hover:underline mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">Project Archives</h1>
            <p className="text-gray-400 max-w-2xl">
                A complete chronological record of our agricultural operations, audits, and community impact reports.
            </p>
        </div>

        {/* Archives Container with Overlay Logic */}
        <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? '' : 'max-h-[800px] overflow-hidden'}`}>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {archiveItems.map((item) => (
                    <div 
                        key={item.id}
                        className={`group relative overflow-hidden bg-gray-800 border border-white/5 rounded-sm cursor-pointer ${
                            item.size === 'wide' ? 'md:col-span-2' : 
                            item.size === 'tall' ? 'md:col-span-1 md:row-span-2' : 'md:col-span-1'
                        }`}
                    >
                        <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        {item.hasVideo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 border border-white/20">
                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                </div>
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="block text-farm-400 text-[10px] tracking-[0.2em] uppercase mb-1 font-medium">{item.type}</span>
                            <h3 className="text-white text-xl font-light mb-1">{item.title}</h3>
                            {item.description && <p className="text-gray-300 text-xs mt-2 line-clamp-2">{item.description}</p>}
                            <div className="mt-2 text-gray-500 text-[10px] font-mono">
                            {item.date} • {item.location}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Gradient Overlay & Button - Only visible when NOT expanded */}
            {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent flex items-end justify-center pb-8 z-10">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsExpanded(true)}
                        className="bg-gray-900/80 backdrop-blur-sm border-gray-600 hover:bg-white hover:text-black hover:border-white transition-all px-8 py-3"
                    >
                        Load More Records
                    </Button>
                </div>
            )}
        </div>

        {/* Content under load more (visible after expansion) */}
        {isExpanded && (
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                End of current records. Check back next month for new field updates.
            </div>
        )}

      </div>
    </div>
  );
};