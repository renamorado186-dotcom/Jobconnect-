import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, Droplets, Zap, Sparkles, Flower2, 
  Paintbrush, Truck, Star, ShieldCheck, CheckCircle2, ChevronRight, 
  ArrowRight, Award, PlusCircle, Wrench
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { Worker, JobCategory } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    workers, 
    jobs, 
    setActiveTab, 
    setSelectedWorker, 
    setSelectedCategoryFilter,
    setSelectedJobForBooking
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return Droplets;
      case 'Zap': return Zap;
      case 'Sparkles': return Sparkles;
      case 'Flower2': return Flower2;
      case 'Paintbrush': return Paintbrush;
      case 'Truck': return Truck;
      default: return Wrench;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('search');
  };

  const handleCategorySelect = (categoryName: JobCategory) => {
    setSelectedCategoryFilter(categoryName);
    setActiveTab('search');
  };

  const activeJobs = jobs.filter(j => j.status === 'Open' || j.status === 'In Progress');

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-5 rounded-2xl shadow-lg shadow-blue-600/15">
        <h1 className="text-2xl font-extrabold tracking-tight mb-1">
          Need a quick job done?
        </h1>
        <p className="text-blue-100 text-xs mb-4">
          Connect with trusted local plumbers, electricians & helpers in Tegucigalpa
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center bg-white rounded-xl shadow-md overflow-hidden text-slate-800">
            <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a worker near you (e.g. plumber)"
              className="w-full py-3.5 px-3 text-sm placeholder:text-slate-400 focus:outline-none font-medium"
            />
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className="p-2.5 mr-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Primary Call To Action - Post a Job */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1">
          <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold tracking-wider uppercase">
            Quick Hiring
          </span>
          <h3 className="text-sm font-bold">Have a custom task?</h3>
          <p className="text-xs text-slate-300">Post your job & receive bids from nearby pros</p>
        </div>
        <button
          onClick={() => setActiveTab('post-job')}
          className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Job</span>
        </button>
      </div>

      {/* Category Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Browse by Category</h2>
          <button 
            onClick={() => { setSelectedCategoryFilter('All'); setActiveTab('search'); }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-slate-800 text-center">{cat.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{cat.count} pros</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Posted Jobs Banner if any */}
      {activeJobs.length > 0 && (
        <section className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">Your Active Job Posts ({activeJobs.length})</h3>
            </div>
            <button 
              onClick={() => setActiveTab('my-jobs')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Manage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{activeJobs[0].title}</p>
              <p className="text-[11px] text-slate-500">
                Budget: <span className="font-semibold text-slate-800">L {activeJobs[0].budget.toLocaleString()}</span> • {activeJobs[0].location}
              </p>
            </div>
            <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              {activeJobs[0].status}
            </span>
          </div>
        </section>
      )}

      {/* Featured Workers Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Featured Workers</h2>
            <p className="text-xs text-slate-500">Top-rated local experts near Tegucigalpa</p>
          </div>
          <button 
            onClick={() => setActiveTab('search')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            See all
          </button>
        </div>

        {/* Worker Cards Grid */}
        <div className="space-y-3">
          {workers.map((worker: Worker) => (
            <div
              key={worker.id}
              onClick={() => {
                setSelectedWorker(worker);
                setActiveTab('search');
              }}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex gap-3.5">
                {/* Avatar with Verified badge */}
                <div className="relative shrink-0">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-50 group-hover:ring-blue-200 transition-all"
                  />
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
                      <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                    </div>
                  )}
                </div>

                {/* Worker Main Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {worker.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{worker.category} Specialist</p>
                    </div>
                    {/* Hourly Rate */}
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-blue-600">L {worker.hourlyRate}</span>
                      <span className="text-[10px] text-slate-400 font-normal"> /hr</span>
                    </div>
                  </div>

                  {/* Rating & Stats */}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{worker.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({worker.reviewsCount})</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span>{worker.completedJobsCount} jobs</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{worker.distanceKm} km away</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    {worker.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                    {worker.backgroundChecked && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Background Checked</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 truncate max-w-[200px]">
                  📍 {worker.location}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJobForBooking({
                      worker,
                      jobTitle: `Service with ${worker.name}`,
                      estimatedHours: 2,
                      estimatedCost: worker.hourlyRate * 2
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety First Banner */}
      <section className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold">Trust & Safety First</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            All workers on JobConnect undergo identity verification and background checks for your peace of mind.
          </p>
        </div>
      </section>
    </div>
  );
};
