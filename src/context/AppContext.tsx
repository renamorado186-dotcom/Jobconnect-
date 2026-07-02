import React, { createContext, useContext, useState, useEffect } from 'react';
import { Worker, Job, Conversation, UserProfile, JobCategory, ChatMessage } from '../types';
import { MOCK_WORKERS, MOCK_JOBS, MOCK_CONVERSATIONS, INITIAL_USER } from '../data/mockData';

export type ActiveTab = 'home' | 'search' | 'post-job' | 'my-jobs' | 'messages' | 'profile';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  workers: Worker[];
  jobs: Job[];
  conversations: Conversation[];
  user: UserProfile;
  selectedWorker: Worker | null;
  setSelectedWorker: (worker: Worker | null) => void;
  selectedJobForBooking: { worker: Worker; jobTitle?: string; estimatedHours?: number; estimatedCost?: number } | null;
  setSelectedJobForBooking: (data: { worker: Worker; jobTitle?: string; estimatedHours?: number; estimatedCost?: number } | null) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  selectedCategoryFilter: JobCategory | 'All';
  setSelectedCategoryFilter: (cat: JobCategory | 'All') => void;
  
  // Actions
  addJob: (jobData: Omit<Job, 'id' | 'datePosted' | 'status' | 'applicants'>) => Job;
  toggleSaveWorker: (workerId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  getOrCreateConversation: (workerId: string, jobId?: string) => string;
  hireWorkerForJob: (jobId: string, workerId: string, cost: number) => void;
  completeJob: (jobId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'jobconnect_honduras_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [workers] = useState<Worker[]>(MOCK_WORKERS);
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_jobs');
    return saved ? JSON.parse(saved) : MOCK_JOBS;
  });
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_convs');
    return saved ? JSON.parse(saved) : MOCK_CONVERSATIONS;
  });
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedJobForBooking, setSelectedJobForBooking] = useState<{
    worker: Worker;
    jobTitle?: string;
    estimatedHours?: number;
    estimatedCost?: number;
  } | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<JobCategory | 'All'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_convs', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_user', JSON.stringify(user));
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'datePosted' | 'status' | 'applicants'>): Job => {
    const newJob: Job = {
      ...jobData,
      id: 'j_' + Date.now(),
      datePosted: 'Just now',
      status: 'Open',
      applicants: [
        // Auto-generate 1 relevant mock applicant for immediate feedback
        {
          workerId: workers.find(w => w.category === jobData.category)?.id || workers[0].id,
          appliedDate: 'Just now',
          proposedBudget: jobData.budget,
          message: `Hola Elena! Vi tu publicación "${jobData.title}" y puedo asistirte hoy mismo en ${jobData.location}.`,
          status: 'Pending'
        }
      ]
    };

    setJobs(prev => [newJob, ...prev]);
    showToast('¡Trabajo publicado con éxito!');
    return newJob;
  };

  const toggleSaveWorker = (workerId: string) => {
    setUser(prev => {
      const exists = prev.savedWorkerIds.includes(workerId);
      const updated = exists
        ? prev.savedWorkerIds.filter(id => id !== workerId)
        : [...prev.savedWorkerIds, workerId];
      
      showToast(exists ? 'Trabajador eliminado de guardados' : 'Trabajador guardado en favoritos');
      return { ...prev, savedWorkerIds: updated };
    });
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender: 'client',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Auto worker reply simulation after 1.5s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'm_reply_' + Date.now(),
        sender: 'worker',
        text: '¡Entendido! Gracias por el mensaje. Confirmo los detalles enseguida.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev =>
        prev.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  const getOrCreateConversation = (workerId: string, jobId?: string): string => {
    const existing = conversations.find(c => c.workerId === workerId);
    if (existing) {
      return existing.id;
    }

    const worker = workers.find(w => w.id === workerId);
    const newConv: Conversation = {
      id: 'c_' + Date.now(),
      workerId,
      jobId,
      lastMessage: `Inició conversación con ${worker?.name || 'trabajador'}`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: 'm_init',
          sender: 'client',
          text: `Hola ${worker?.name}, me interesa contratar tus servicios.`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    return newConv.id;
  };

  const hireWorkerForJob = (jobId: string, workerId: string, cost: number) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'In Progress',
            assignedWorkerId: workerId,
            budget: cost,
            applicants: j.applicants.map(a => ({
              ...a,
              status: a.workerId === workerId ? 'Accepted' : 'Rejected'
            }))
          };
        }
        return j;
      })
    );

    const worker = workers.find(w => w.id === workerId);
    showToast(`¡Has contratado a ${worker?.name || 'Trabajador'} con éxito!`);
  };

  const completeJob = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'Completed',
            completedDate: new Date().toLocaleDateString('es-HN', { month: 'short', day: 'numeric', year: 'numeric' })
          };
        }
        return j;
      })
    );
    showToast('¡Trabajo marcado como completado!');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        workers,
        jobs,
        conversations,
        user,
        selectedWorker,
        setSelectedWorker,
        selectedJobForBooking,
        setSelectedJobForBooking,
        activeConversationId,
        setActiveConversationId,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        addJob,
        toggleSaveWorker,
        sendMessage,
        getOrCreateConversation,
        hireWorkerForJob,
        completeJob,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
