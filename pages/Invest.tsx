import React, { useState, useMemo } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import { InvestmentCard } from '../components/InvestmentCard';

export const Invest: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minInvestmentFilter, setMinInvestmentFilter] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesInvestment = project.minInvestment >= minInvestmentFilter;
      const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
      
      return matchesSearch && matchesInvestment && matchesCategory;
    });
  }, [searchTerm, minInvestmentFilter, categoryFilter]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Open Opportunities</h1>
        <p className="text-gray-400">Discover and fund the next generation of agricultural projects.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="lg:w-1/4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <Filter size={20} className="text-farm-500" />
              <h2>Filters</h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Location or Project..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-farm-500 transition-colors placeholder-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Asset Class</label>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-farm-500 text-sm appearance-none cursor-pointer"
              >
                <option value="All">All Assets</option>
                <option value="Farming">Farming</option>
                <option value="Vineyard">Vineyard</option>
                <option value="Livestock">Livestock</option>
              </select>
            </div>

            {/* Min Investment Slider */}
            <div className="mb-2">
              <label className="flex justify-between text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                <span>Min Investment</span>
                <span className="text-white">${minInvestmentFilter.toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="20000" 
                step="1000" 
                value={minInvestmentFilter}
                onChange={(e) => setMinInvestmentFilter(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-farm-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>$0</span>
                <span>$20k+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Investment Grid */}
        <main className="lg:w-3/4">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <InvestmentCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-800/30 rounded-xl border border-gray-700 border-dashed">
              <div className="bg-gray-800 p-4 rounded-full mb-4">
                <SlidersHorizontal className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
              <p className="text-gray-400 max-w-sm">Try adjusting your filters to see more investment opportunities.</p>
              <button 
                onClick={() => { setSearchTerm(''); setMinInvestmentFilter(0); setCategoryFilter('All'); }}
                className="mt-6 text-farm-500 hover:text-farm-400 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};