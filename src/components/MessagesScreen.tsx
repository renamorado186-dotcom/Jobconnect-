import React, { useState } from 'react';
import { MessageSquare, Send, ChevronLeft, Calendar, Phone, CheckCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Conversation, Worker } from '../types';

export const MessagesScreen: React.FC = () => {
  const { 
    conversations, 
    workers, 
    sendMessage, 
    activeConversationId, 
    setActiveConversationId,
    setSelectedJobForBooking,
    setSelectedWorker
  } = useApp();

  const [messageInput, setMessageInput] = useState('');

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeWorker = activeConversation ? workers.find(w => w.id === activeConversation.workerId) : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConversationId || !messageInput.trim()) return;

    sendMessage(activeConversationId, messageInput.trim());
    setMessageInput('');
  };

  const QUICK_RESPONSES = [
    '¿A qué hora puedes llegar?',
    '¿Incluye los materiales?',
    'Perfecto, te espero a esa hora.',
    '¿Cuál es tu costo por hora?'
  ];

  // If in active chat view
  if (activeConversation && activeWorker) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50 -mx-4 -mt-2 animate-in fade-in duration-200">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-14 z-20 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveConversationId(null)}
              className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div 
              onClick={() => setSelectedWorker(activeWorker)} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={activeWorker.avatar}
                  alt={activeWorker.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-300"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {activeWorker.name}
                </h3>
                <p className="text-[10px] text-slate-500">{activeWorker.category} Specialist • L {activeWorker.hourlyRate}/hr</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${activeWorker.phone}`}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-blue-600 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setSelectedJobForBooking({
                  worker: activeWorker,
                  jobTitle: `Service with ${activeWorker.name}`,
                  estimatedHours: 2,
                  estimatedCost: activeWorker.hourlyRate * 2
                });
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-center my-2">
            <span className="px-3 py-1 rounded-full bg-slate-200/60 text-slate-600 text-[10px] font-semibold">
              Today • Direct message encrypted
            </span>
          </div>

          {activeConversation.messages.map((msg) => {
            const isClient = msg.sender === 'client';

            return (
              <div
                key={msg.id}
                className={`flex ${isClient ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-xs space-y-1 ${
                    isClient
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-xs leading-relaxed font-medium">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 text-[9px] ${isClient ? 'text-blue-100' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isClient && <CheckCheck className="w-3 h-3 text-blue-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Response Chips */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 flex gap-2 overflow-x-auto no-scrollbar">
          {QUICK_RESPONSES.map((chip) => (
            <button
              key={chip}
              onClick={() => sendMessage(activeConversation.id, chip)}
              className="px-3 py-1 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-full text-[11px] font-medium whitespace-nowrap text-slate-600 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Typing Input */}
        <form onSubmit={handleSend} className="bg-white p-3 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Message ${activeWorker.name}...`}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-2.5 rounded-xl bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  // Conversation List View
  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Messages</h1>
        <p className="text-xs text-slate-500">Conversations with local workers</p>
      </div>

      <div className="space-y-2">
        {conversations.map((conv: Conversation) => {
          const worker = workers.find(w => w.id === conv.workerId);
          if (!worker) return null;

          return (
            <div
              key={conv.id}
              onClick={() => setActiveConversationId(conv.id)}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:border-blue-200 transition-all cursor-pointer flex items-center gap-3"
            >
              <div className="relative shrink-0">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                />
                {conv.unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full ring-2 ring-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{worker.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{conv.lastMessageTime}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">{conv.lastMessage}</p>
                <p className="text-[10px] text-blue-600 font-semibold mt-1">{worker.category} Specialist</p>
              </div>
            </div>
          );
        })}

        {conversations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No messages yet</h3>
            <p className="text-xs text-slate-500">
              When you message or hire a worker, your conversations will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
