import React, { useState } from 'react';
import { 
  Briefcase, Clock, CheckCircle2, MapPin, Star, 
  UserCheck, MessageSquare, ChevronDown, ChevronUp, AlertCircle, Plus 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Job, JobStatus } from '../types';

export const MyJobsScreen: React.FC = () => {
  const { 
    jobs, 
    workers, 
    hireWorkerForJob, 
    completeJob, 
    setSelectedWorker, 
    getOrCreateConversation, 
    setActiveConversationId, 
    setActiveTab,
    setSelectedJobForBooking
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(jobs[0]?.id || null);

  const filteredJobs = jobs.filter((j) => {
    if (statusFilter === 'All') return true;
    return j.status === statusFilter;
  });

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Open':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold">Open</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">In Progress</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-extrabold">{status}</span>;
    }
  };

  const handleMessageApplicant = (workerId: string, jobId: string) => {
    const convId = getOrCreateConversation(workerId, jobId);
    setActiveConversationId(convId);
    setActiveTab('messages');
  };

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Posted Jobs</h1>
          <p className="text-xs text-slate-500">Track applicants, hires and active tasks</p>
        </div>
        <button
          onClick={() => setActiveTab('post-job')}
          className="p-2 bg-blue-600 text-white rounded-xl shadow-md text-xs font-bold flex items-center gap-1 hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Job</span>
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-xs">
        {(['All', 'Open', 'In Progress', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              statusFilter === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {filteredJobs.map((job) => {
          const isExpanded = expandedJobId === job.id;
          const assignedWorker = job.assignedWorkerId ? workers.find(w => w.id === job.assignedWorkerId) : null;

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all"
            >
              {/* Job Summary Card Header */}
              <div
                onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                className="p-4 cursor-pointer space-y-2 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px]">
                        {job.category}
                      </span>
                      {getStatusBadge(job.status)}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-blue-600">L {job.budget.toLocaleString()}</span>
                    <p className="text-[10px] text-slate-400">Budget</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[180px]">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <span>{job.applicants.length} Applicants</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              </div>

              {/* Expanded Job Details & Applicants Section */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-4 animate-in fade-in duration-150">
                  {/* Job Description Box */}
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Description</h4>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Assigned Worker Info if In Progress */}
                  {assignedWorker && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                          Assigned Professional
                        </span>
                        {job.status === 'In Progress' && (
                          <button
                            onClick={() => completeJob(job.id)}
                            className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 cursor-pointer shadow-xs"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-emerald-100">
                        <img src={assignedWorker.avatar} alt={assignedWorker.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{assignedWorker.name}</p>
                          <p className="text-[10px] text-slate-500">{assignedWorker.category} • L {assignedWorker.hourlyRate}/hr</p>
                        </div>
                        <button
                          onClick={() => handleMessageApplicant(assignedWorker.id, job.id)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Applicants List */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Applicants ({job.applicants.length})
                    </h4>

                    {job.applicants.map((app) => {
                      const worker = workers.find(w => w.id === app.workerId);
                      if (!worker) return null;

                      return (
                        <div key={app.workerId} className="bg-white rounded-xl p-3 border border-slate-200 space-y-2.5 shadow-xs">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <img src={worker.avatar} alt={worker.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                              <div>
                                <h5 className="text-xs font-bold text-slate-900">{worker.name}</h5>
                                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="font-bold text-slate-800">{worker.rating}</span>
                                  <span>({worker.completedJobsCount} jobs)</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-extrabold text-blue-600">L {app.proposedBudget}</span>
                              <p className="text-[9px] text-slate-400">Bid Amount</p>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg italic">
                            "{app.message}"
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                            <button
                              onClick={() => setSelectedWorker(worker)}
                              className="text-xs font-semibold text-slate-600 hover:text-blue-600 cursor-pointer"
                            >
                              View Profile
                            </button>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleMessageApplicant(worker.id, job.id)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                              >
                                Chat
                              </button>
                              
                              {job.status === 'Open' && (
                                <button
                                  onClick={() => {
                                    setSelectedJobForBooking({
                                      worker,
                                      jobTitle: job.title,
                                      estimatedHours: 2,
                                      estimatedCost: app.proposedBudget
                                    });
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer shadow-xs"
                                >
                                  Hire Now
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {job.applicants.length === 0 && (
                      <p className="text-xs text-slate-400 py-4 text-center bg-white rounded-xl border border-slate-100">
                        No applicants yet. Nearby workers will be notified soon!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No jobs found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You haven't posted any jobs under this status yet.
            </p>
            <button
              onClick={() => setActiveTab('post-job')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-700"
            >
              Post a Job Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
