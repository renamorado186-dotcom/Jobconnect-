import React, { useState } from 'react';
import { MapPin, Bell, ChevronDown, Share2, Github, Smartphone, Download, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { user } = useApp();
  const [selectedCity, setSelectedCity] = useState('Tegucigalpa, Honduras');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const CITIES = [
    'Tegucigalpa, Honduras',
    'San Pedro Sula, Honduras',
    'La Ceiba, Honduras',
    'Comayagua, Honduras',
    'Roatán, Honduras'
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
            title="GitHub y Safari Mobile"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub / Safari</span>
          </button>

          <button className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>
          
          <div className="w-8 h-8 rounded-full ring-2 ring-blue-50 overflow-hidden shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Safari & GitHub Export/Install Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="App Logo" className="w-11 h-11 rounded-xl shadow-md" />
              <div>
                <h3 className="text-base font-extrabold text-slate-900">JobConnect Mobile</h3>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  App 100% Ligera & PWA Lista
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {/* Safari Install Guide */}
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>Instalar en Teléfono desde Safari (iOS)</span>
                </div>
                <ol className="list-decimal list-inside text-slate-600 space-y-1 pl-1 font-medium">
                  <li>Abre esta URL en Safari en tu teléfono.</li>
                  <li>Toca el botón <b>Compartir</b> (icono de cuadrado con flecha).</li>
                  <li>Selecciona <b>"Agregar a Inicio"</b> (Add to Home Screen).</li>
                  <li>¡Listo! El icono de JobConnect aparecerá en tu teléfono como app nativa.</li>
                </ol>
              </div>

              {/* GitHub Export Guide */}
              <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-100">
                  <Github className="w-4 h-4 text-blue-400" />
                  <span>Subir a tu Cuenta de GitHub</span>
                </div>
                <p className="text-slate-300 font-medium leading-relaxed">
                  Puedes exportar o descargar este proyecto comprimido ZIP o vincular tu repositorio de GitHub directamente desde el menú <b>Settings / Export</b> de la plataforma.
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-1 flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace App'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

