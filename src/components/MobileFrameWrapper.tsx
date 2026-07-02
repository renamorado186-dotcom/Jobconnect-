import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({ children }) => {
  const [deviceFrameMode, setDeviceFrameMode] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 font-sans antialiased flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Viewport toggle bar for desktop */}
      <div className="hidden sm:flex items-center gap-3 mb-3 bg-slate-800 text-slate-300 px-4 py-2 rounded-full border border-slate-700/60 shadow-lg text-xs font-medium">
        <span className="font-bold text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" /> JobConnect Mobile Preview
        </span>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setDeviceFrameMode(true)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
            deviceFrameMode ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device</span>
        </button>
        <button
          onClick={() => setDeviceFrameMode(false)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
            !deviceFrameMode ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Main App Canvas Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrameMode
            ? 'max-w-md bg-slate-50 min-h-screen sm:min-h-[840px] sm:max-h-[92vh] sm:rounded-[40px] sm:ring-12 sm:ring-slate-800 sm:shadow-2xl overflow-y-auto relative no-scrollbar'
            : 'max-w-3xl bg-slate-50 min-h-screen rounded-2xl shadow-xl overflow-y-auto'
        }`}
      >
        {/* Mobile Status Bar Simulation on frame mode */}
        {deviceFrameMode && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-extrabold text-slate-800 select-none bg-white">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" /> {/* Dynamic Island mockup */}
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <div className="w-3 h-2 bg-slate-800 rounded-xs" />
            </div>
          </div>
        )}

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
