import React, { useState } from 'react';
import { PlusCircle, MapPin, DollarSign, Tag, FileText, Send, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCategory } from '../types';

export const PostJobScreen: React.FC = () => {
  const { addJob, setActiveTab } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('Plumbing');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<string>('500');
  const [location, setLocation] = useState('Colonia Palmira, Tegucigalpa');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const CATEGORIES_LIST: JobCategory[] = [
    'Plumbing', 'Electrical', 'Cleaning', 'Gardening', 'Painting', 'Moving', 'AC Repair', 'Carpentry'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill out the job title and description');
      return;
    }

    const numericBudget = parseFloat(budget) || 300;

    addJob({
      title: title.trim(),
      category,
      description: description.trim(),
      budget: numericBudget,
      location: location.trim() || 'Tegucigalpa, Honduras',
      urgency,
    });

    // Reset and navigate to My Jobs
    setTitle('');
    setDescription('');
    setActiveTab('my-jobs');
  };

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
            <PlusCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Post a New Job</h1>
            <p className="text-blue-100 text-xs">Describe what you need done & get fast local bids</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-4">
        {/* Job Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Job Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix leaking pipe under bathroom sink"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Service Category <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as JobCategory)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none appearance-none cursor-pointer"
            >
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget in Lempiras */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Budget in Lempiras (L) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="font-extrabold text-blue-600 text-xs absolute left-3.5 top-1/2 -translate-y-1/2">
              L
            </span>
            <input
              type="number"
              required
              min="100"
              step="50"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="500"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs font-extrabold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>
          <p className="text-[10px] text-slate-400">Average price for {category} in Tegucigalpa is L 300 - L 800</p>
        </div>

        {/* Location Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Location Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Colonia Palmira, Tegucigalpa"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Urgency Level */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Urgency / Timeline
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Low', label: 'Flexible' },
              { id: 'Medium', label: 'This Week' },
              { id: 'High', label: 'Urgent (Today)' }
            ].map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUrgency(u.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  urgency === u.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Job Description & Details <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what needs to be fixed, any materials needed, access details..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none resize-none transition-all"
          />
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
        >
          <Send className="w-4 h-4" />
          <span>Publish Job Request</span>
        </button>
      </form>
    </div>
  );
};
