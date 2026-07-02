import React, { useState } from 'react';
import { Search, Filter, Star, CheckCircle2, ShieldCheck, MapPin, X, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Worker, JobCategory } from '../types';
import { CATEGORIES } from '../data/mockData';
import { WorkerProfileScreen } from './WorkerProfileScreen';

export const SearchScreen: React.FC = () => {
  const { 
    workers, 
    selectedWorker, 
    setSelectedWorker, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    setSelectedJobForBooking,
    user,
    toggleSaveWorker
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [maxRate, setMaxRate] = useState<number>(400);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Filter logic
  const filteredWorkers = workers.filter((w) => {
    const matchesCategory = selectedCategoryFilter === 'All' || w.category === selectedCategoryFilter;
    const matchesSearch = 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      w.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRate = w.hourlyRate <= maxRate;
    const matchesRating = w.rating >= minRating;

    return matchesCategory && matchesSearch && matchesRate && matchesRating;
  });

  if (selectedWorker) {
    return <WorkerProfileScreen worker={selectedWorker} onClose={() => setSelectedWorker(null)} />;
  }

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-200">
      {/* Top Search bar with Filter Button */}
      <div className="sticky top-14 z-20 bg-slate-50/95 backdrop-blur-md py-2 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, skill, or service..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
              maxRate < 400 || minRating > 0 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategoryFilter === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategoryFilter(cat.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategoryFilter === cat.name
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Drawer */}
      {showFilterDrawer && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-lg space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Filter Workers</h3>
            <button
              onClick={() => { setMaxRate(400); setMinRating(0); }}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Reset
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Max Hourly Rate:</span>
              <span className="font-bold text-blue-600">L {maxRate} /hr</span>
            </div>
            <input
              type="range"
              min="150"
              max="500"
              step="10"
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Min Rating:</span>
              <span className="font-bold text-amber-500">{minRating === 0 ? 'Any' : `${minRating}★ & up`}</span>
            </div>
            <div className="flex gap-2">
              {[0, 4.5, 4.8, 4.9].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    minRating === rating
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}★`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong className="text-slate-900">{filteredWorkers.length}</strong> available workers</span>
        {selectedCategoryFilter !== 'All' && (
          <span className="text-blue-600 font-medium">Category: {selectedCategoryFilter}</span>
        )}
      </div>

      {/* Worker List Cards */}
      <div className="space-y-3">
        {filteredWorkers.map((worker: Worker) => {
          const isSaved = user.savedWorkerIds.includes(worker.id);

          return (
            <div
              key={worker.id}
              onClick={() => setSelectedWorker(worker)}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-all cursor-pointer space-y-3"
            >
              <div className="flex gap-3">
                <div className="relative shrink-0">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 truncate">{worker.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{worker.category} Specialist</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-blue-600">L {worker.hourlyRate}</span>
                      <span className="text-[10px] text-slate-400">/hr</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                    <div className="flex items-center gap-0.5 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{worker.rating.toFixed(1)}</span>
                    </div>
                    <span>({worker.reviewsCount} reviews)</span>
                    <span>•</span>
                    <span>{worker.distanceKm} km</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {worker.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                    {worker.backgroundChecked && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Background Checked</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50/80 p-2.5 rounded-xl">
                "{worker.bio}"
              </p>

              {/* Specialties Chips */}
              <div className="flex flex-wrap gap-1">
                {worker.specialties.slice(0, 3).map((spec) => (
                  <span key={spec} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium">
                    {spec}
                  </span>
                ))}
                {worker.specialties.length > 3 && (
                  <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                    +{worker.specialties.length - 3} more
                  </span>
                )}
              </div>

              {/* Action footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveWorker(worker.id);
                  }}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    isSaved ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {isSaved ? '❤️ Guardado' : '🤍 Guardar'}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWorker(worker);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>
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
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
                  >
                    Hire
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredWorkers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No workers found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Try adjusting your search terms or filters to find workers near Tegucigalpa.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategoryFilter('All'); setMaxRate(400); setMinRating(0); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
