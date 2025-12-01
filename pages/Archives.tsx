import React, { useState } from 'react';
import { Play, FileText, Download, Sprout, BarChart3 } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-900">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-gray-900/80 via-gray-900/70 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <Link to="/" className="inline-flex items-center text-farm-500 font-medium mb-6 hover:text-white transition-colors">
                &larr; Return Home
            </Link>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight font-serif tracking-tight">
            The Field <span className="text-farm-500 font-normal">Archives</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            A comprehensive chronological record of our agricultural operations, harvest reports, and technological audits from around the globe.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        
        {/* Filter / Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
            <div>
                <span className="text-farm-500 text-xs font-bold tracking-widest uppercase mb-2 block">Latest Entries</span>
                <h2 className="text-2xl font-light text-white">Media & Reports</h2>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
                <button className="text-sm text-white border-b border-white pb-1">All Records</button>
                <button className="text-sm text-gray-500 hover:text-white border-b border-transparent pb-1 hover:border-gray-500 transition-colors">Videos</button>
                <button className="text-sm text-gray-500 hover:text-white border-b border-transparent pb-1 hover:border-gray-500 transition-colors">Reports</button>
            </div>
        </div>

        {/* Archives Container with Overlay Logic */}
        <div className={`relative transition-all duration-1000 ease-in-out ${isExpanded ? '' : 'max-h-[800px] overflow-hidden'}`}>
            
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

        {/* RICH CONTENT SECTIONS (Visible below the fold, pushed down when expanded) */}
        <div className="mt-24 space-y-32">
            
            {/* Section 1: Sustainability Report */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                     <div className="absolute -inset-4 bg-farm-500/10 rounded-2xl blur-xl"></div>
                     <img 
                       src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop" 
                       alt="Sustainability Report" 
                       className="relative w-full rounded-lg shadow-2xl border border-gray-800 grayscale hover:grayscale-0 transition-all duration-700"
                     />
                     <div className="absolute bottom-6 -right-6 bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-xl max-w-xs hidden md:block">
                        <div className="flex items-center gap-3 mb-2">
                             <Sprout className="text-farm-500" size={20} />
                             <span className="text-white font-bold text-sm">Carbon Negative</span>
                        </div>
                        <p className="text-xs text-gray-400">Our soil regeneration techniques have sequestered 12,000 tons of CO2 this year.</p>
                     </div>
                </div>
                <div className="order-1 md:order-2">
                    <span className="text-farm-500 text-xs font-bold tracking-widest uppercase mb-4 block">Annual Report</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">2023 Sustainability Audit</h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Beyond yields, we measure success by the health of our soil and the prosperity of our communities. 
                        Our latest audit reveals a 40% reduction in water usage across our sub-Saharan projects and 
                        a complete transition to organic fertilizers in our Napa vineyards.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download size={16} /> Download PDF
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <FileText size={16} /> View Summary
                        </Button>
                    </div>
                </div>
            </div>

            {/* Section 2: Technology Integration */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-4 block">Innovation</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Technological Integration</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        We have deployed 500+ IoT sensors across our key assets to monitor soil moisture, acidity, and nutrient levels in real-time. 
                        This data-driven approach allows for precision farming that maximizes output while minimizing resource waste.
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-300">
                            <BarChart3 className="text-blue-500 mr-3" size={18} />
                            <span>Real-time yield forecasting models</span>
                        </li>
                        <li className="flex items-center text-gray-300">
                            <Sprout className="text-blue-500 mr-3" size={18} />
                            <span>Automated irrigation controls</span>
                        </li>
                    </ul>
                </div>
                <div className="relative">
                     <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl blur-xl"></div>
                     <img 
                       src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80" 
                       alt="AgTech Lab" 
                       className="relative w-full rounded-lg shadow-2xl border border-gray-800 grayscale hover:grayscale-0 transition-all duration-700"
                     />
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};