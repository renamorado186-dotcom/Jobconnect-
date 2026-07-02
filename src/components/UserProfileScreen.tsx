import React from 'react';
import { 
  User, MapPin, Phone, Mail, Heart, CreditCard, Shield, 
  HelpCircle, LogOut, Star, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfileScreen: React.FC = () => {
  const { user, workers, setSelectedWorker, setActiveTab, toggleSaveWorker } = useApp();

  const savedWorkers = workers.filter(w => user.savedWorkerIds.includes(w.id));

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-extrabold text-slate-900 truncate">{user.name}</h1>
          <div className="space-y-0.5 text-xs text-slate-500 mt-1 font-medium">
            <p className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{user.location}</span>
            </p>
            <p className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{user.phone}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Saved Favorite Workers */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Saved Workers ({savedWorkers.length})
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            Find more
          </button>
        </div>

        {savedWorkers.length > 0 ? (
          <div className="space-y-2">
            {savedWorkers.map((worker) => (
              <div
                key={worker.id}
                onClick={() => setSelectedWorker(worker)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer border border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <img src={worker.avatar} alt={worker.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{worker.name}</h3>
                    <p className="text-[10px] text-slate-500">{worker.category} Specialist • L {worker.hourlyRate}/hr</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center text-xs font-bold text-slate-800">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {worker.rating}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveWorker(worker.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-3 text-center">No saved workers yet. Tap the heart icon on any worker profile to save them!</p>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Payment Methods</h2>
        </div>

        <div className="space-y-2">
          {user.paymentMethods.map((pm) => (
            <div key={pm.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">{pm.title}</p>
                <p className="text-[10px] text-slate-500">{pm.subtitle}</p>
              </div>
              {pm.isDefault && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[9px] font-extrabold">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Settings Menu Options */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs">
        <button className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left cursor-pointer">
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Trust, Safety & Guarantee Policy</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left cursor-pointer">
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Help & Support Center</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left cursor-pointer text-rose-600">
          <div className="flex items-center gap-3 font-semibold">
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};
