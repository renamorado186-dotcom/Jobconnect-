import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';
import { useApp, ActiveTab } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, conversations } = useApp();

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'post-job', label: 'Post Job', icon: PlusCircle },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isPostJob = item.id === 'post-job';

          if (isPostJob) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab('post-job')}
                className="flex flex-col items-center group -mt-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-active:scale-95 transition-transform">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-blue-600 mt-1">Post Job</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.id === 'messages' && totalUnread > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-white">
                    {totalUnread}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
