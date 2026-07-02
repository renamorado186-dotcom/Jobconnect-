import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-full shadow-xl text-sm font-medium transition-all animate-bounce">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};
