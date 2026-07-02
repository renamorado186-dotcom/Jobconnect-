import React, { useState } from 'react';
import { 
  ChevronLeft, Star, MapPin, CheckCircle2, ShieldCheck, 
  MessageSquare, Calendar, Briefcase, Clock, DollarSign, Share2, Heart, Check, ArrowRight
} from 'lucide-react';
import { Worker } from '../types';
import { useApp } from '../context/AppContext';

interface WorkerProfileScreenProps {
  worker: Worker;
  onClose: () => void;
}

export const WorkerProfileScreen: React.FC<WorkerProfileScreenProps> = ({ worker, onClose }) => {
  const { 
    setSelectedJobForBooking, 
    getOrCreateConversation, 
    setActiveConversationId, 
    setActiveTab,
    user,
    toggleSaveWorker,
    showToast
  } = useApp();

  const [activeTabSection, setActiveTabSection] = useState<'about' | 'gallery' | 'reviews'>('about');
  const isSaved = user.savedWorkerIds.includes(worker.id);

  const handleMessage = () => {
    const convId = getOrCreateConversation(worker.id);
    setActiveConversationId(convId);
    setActiveTab('messages');
  };

  const handleBook = () => {
    setSelectedJobForBooking({
      worker,
      jobTitle: `Service with ${worker.name}`,
      estimatedHours: 2,
      estimatedCost: worker.hourlyRate * 2
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 animate-in fade-in duration-200">
      {/* Top Profile Banner Header */}
      <div className="relative bg-blue-600 text-white pt-4 pb-8 px-4 rounded-b-3xl shadow-md">
        {/* Navigation Top Row */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Enlace de perfil copiado');
              }}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveWorker(worker.id)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Worker Avatar & Name */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
            {worker.verified && (
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1 ring-2 ring-white">
                <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">{worker.name}</h1>
            <p className="text-blue-100 text-xs font-semibold mt-0.5">{worker.category} Specialist</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-blue-100">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300 shrink-0" />
            <span className="font-bold text-white">{worker.rating.toFixed(1)}</span>
            <span>({worker.reviewsCount} reviews)</span>
            <span>•</span>
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{worker.location}</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 pt-1">
            {worker.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-[11px] font-semibold border border-emerald-400/30 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                Verified
              </span>
            )}
            {worker.backgroundChecked && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-[11px] font-semibold border border-emerald-400/30 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Background Checked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-4 -mt-4 space-y-4">
        {/* Quick Stats Grid Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 grid grid-cols-4 gap-2 text-center divide-x divide-slate-100">
          <div className="space-y-0.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-1">
              <Briefcase className="w-4 h-4" />
            </div>
            <p className="text-sm font-extrabold text-slate-900">{worker.completedJobsCount}</p>
            <p className="text-[10px] text-slate-400 font-medium leading-tight">Jobs Done</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-sm font-extrabold text-slate-900">{worker.rating.toFixed(1)}</p>
            <p className="text-[10px] text-slate-400 font-medium leading-tight">Avg Rating</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-sm font-extrabold text-slate-900">{worker.yearsExperience}+ yrs</p>
            <p className="text-[10px] text-slate-400 font-medium leading-tight">Experience</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-1">
              <span className="font-extrabold text-xs">L</span>
            </div>
            <p className="text-sm font-extrabold text-blue-600">L {worker.hourlyRate}</p>
            <p className="text-[10px] text-slate-400 font-medium leading-tight">Hourly Rate</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-xs">
          <button
            onClick={() => setActiveTabSection('about')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTabSection === 'about'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTabSection('gallery')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTabSection === 'gallery'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Work Photos ({worker.workPhotos.length})
          </button>
          <button
            onClick={() => setActiveTabSection('reviews')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTabSection === 'reviews'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reviews ({worker.reviews.length})
          </button>
        </div>

        {/* About Tab Content */}
        {activeTabSection === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">About Me</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {worker.bio}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Specialized Services</h3>
              <div className="flex flex-wrap gap-2">
                {worker.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/80 text-blue-800 border border-blue-100 rounded-xl text-xs font-semibold"
                  >
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Work Photos Gallery Tab */}
        {activeTabSection === 'gallery' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Past Project Photos</h3>
            {worker.workPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {worker.workPhotos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden bg-slate-100 aspect-4/3 border border-slate-100">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90 p-2.5 flex items-end">
                      <p className="text-[11px] font-medium text-white line-clamp-1">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No photos uploaded yet by this worker.</p>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTabSection === 'reviews' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Client Reviews</h3>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{worker.rating.toFixed(1)} out of 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {worker.reviews.map((rev) => (
                <div key={rev.id} className="space-y-2 pb-3 border-b border-slate-50 last:border-none last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {rev.reviewerPhoto ? (
                          <img src={rev.reviewerPhoto} alt={rev.reviewerName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          rev.reviewerName[0]
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{rev.reviewerName}</p>
                        <p className="text-[10px] text-slate-400">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions Bar (Exact UX matching user screenshot!) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 max-w-md mx-auto shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={handleMessage}
            className="flex-1 py-3.5 px-4 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message</span>
          </button>

          <button
            onClick={handleBook}
            className="flex-[1.5] py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-98"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Worker</span>
          </button>
        </div>
      </div>
    </div>
  );
};
