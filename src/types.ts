export type JobCategory = 'Plumbing' | 'Electrical' | 'Cleaning' | 'Gardening' | 'Painting' | 'Moving' | 'AC Repair' | 'Carpentry';

export interface WorkPhoto {
  id: string;
  url: string;
  title: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerPhoto?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Worker {
  id: string;
  name: string;
  category: JobCategory;
  rating: number;
  reviewsCount: number;
  completedJobsCount: number;
  hourlyRate: number; // in Lempiras (L)
  distanceKm: number;
  location: string;
  avatar: string;
  verified: boolean;
  backgroundChecked: boolean;
  yearsExperience: number;
  bio: string;
  specialties: string[];
  workPhotos: WorkPhoto[];
  reviews: Review[];
  phone: string;
  availableNow: boolean;
}

export type JobStatus = 'Open' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Applicant {
  workerId: string;
  appliedDate: string;
  proposedBudget: number; // in Lempiras
  message: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  budget: number; // in Lempiras (L)
  location: string;
  datePosted: string;
  status: JobStatus;
  urgency: 'Low' | 'Medium' | 'High';
  applicants: Applicant[];
  assignedWorkerId?: string;
  completedDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'worker';
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface Conversation {
  id: string;
  workerId: string;
  jobId?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  savedWorkerIds: string[];
  paymentMethods: {
    id: string;
    type: 'card' | 'tigo_money' | 'cash';
    title: string;
    subtitle: string;
    isDefault: boolean;
  }[];
}
