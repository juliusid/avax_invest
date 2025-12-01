import React from 'react';
import { MapPin, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { Button } from './Button';

interface InvestmentCardProps {
  project: Project;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ project }) => {
  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-farm-500/10 transition-all duration-300 border border-gray-700 hover:border-farm-500/30 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          <span className="text-xs font-semibold text-white tracking-wide uppercase">{project.category}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-farm-500 transition-colors">
            {project.title}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-400 text-sm mb-6">
          <MapPin size={14} className="mr-1 text-farm-500" />
          {project.location}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg