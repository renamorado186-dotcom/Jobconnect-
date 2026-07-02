import React, { useState } from 'react';
import { MapPin, Bell, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { user } = useApp();
  const [selectedCity, setSelectedCity] = useState('Tegucigalpa, Honduras');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const CITIES = [
    'Tegucigalpa, Honduras',
    'San Pedro Sula, Honduras',
    'La Ceiba, Honduras',
    'Comayagua, Honduras',
    'Roatán, Honduras'
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2.5">
          <img 
            src="/logo.svg" 
            alt="JobConnect Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-md shadow-blue-500/20 shrink-0" 
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold tracking-tight text-slate-900">Job</span>
              <span className="text-xl font-bold tracking-tight text-blue-600">Connect</span>
            </div>
            
            {/* Location dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="truncate max-w-[140px] font-medium">{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLocationMenu && (
                <div className="absolute top-full left-0 mt-2.5 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Seleccionar Ciudad
                  </div>
                  {CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-blue-50 transition-colors flex items-center justify-between ${
                        selectedCity === city ? 'text-blue-600 bg-blue-50/50 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>
          
          <div className="w-9 h-9 rounded-full ring-2 ring-blue-50 overflow-hidden shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

