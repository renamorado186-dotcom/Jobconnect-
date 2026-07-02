import { Worker, Job, Conversation, UserProfile, JobCategory } from '../types';

export const CATEGORIES: { name: JobCategory; iconName: string; description: string; count: number }[] = [
  { name: 'Plumbing', iconName: 'Droplets', description: 'Leaks, pipes, sinks, toilets', count: 24 },
  { name: 'Electrical', iconName: 'Zap', description: 'Wiring, fixtures, breaker panels', count: 18 },
  { name: 'Cleaning', iconName: 'Sparkles', description: 'Deep house cleaning, offices', count: 32 },
  { name: 'Gardening', iconName: 'Flower2', description: 'Lawn care, pruning, landscaping', count: 15 },
  { name: 'Painting', iconName: 'Paintbrush', description: 'Interior, exterior, touch-ups', count: 21 },
  { name: 'Moving', iconName: 'Truck', description: 'Furniture moving, heavy lifting', count: 19 },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Carlos Martínez',
    category: 'Plumbing',
    rating: 4.9,
    reviewsCount: 128,
    completedJobsCount: 128,
    hourlyRate: 250,
    distanceKm: 1.8,
    location: 'Tegucigalpa, Honduras',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    verified: true,
    backgroundChecked: true,
    yearsExperience: 5,
    bio: 'Professional plumber with over 5 years of experience providing high-quality plumbing services in Tegucigalpa and surrounding areas. Committed to delivering reliable, honest, and efficient work.',
    specialties: ['Plumbing', 'Pipe Repair', 'Leak Detection', 'Water Heater Installation', 'Drain Cleaning'],
    phone: '+504 9876-5432',
    availableNow: true,
    workPhotos: [
      { id: 'wp1', url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80', title: 'Under-sink pipe replacement' },
      { id: 'wp2', url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80', title: 'Modern bathroom fixture setup' },
      { id: 'wp3', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', title: 'Water heater installation' },
      { id: 'wp4', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', title: 'Faucet repair & leak fix' }
    ],
    reviews: [
      {
        id: 'r1',
        reviewerName: 'Ana López',
        reviewerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excelente servicio, muy puntual y profesional. Arregló la fuga del lavabo de la cocina rápidamente. Recomendado 100%.'
      },
      {
        id: 'r2',
        reviewerName: 'Jorge Zelaya',
        reviewerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Muy honesto con el presupuesto y dejó el área totalmente limpia después de terminar. Volveré a contratarlo.'
      },
      {
        id: 'r3',
        reviewerName: 'María Fernanda Valle',
        reviewerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 4.8,
        date: '2 months ago',
        comment: 'Llegó a tiempo en Colonia Palmira y resolvió la fuga en menos de 2 horas. Excelente trato al cliente.'
      }
    ]
  },
  {
    id: 'w2',
    name: 'José Rodriguez',
    category: 'Electrical',
    rating: 4.9,
    reviewsCount: 156,
    completedJobsCount: 156,
    hourlyRate: 300,
    distanceKm: 2.3,
    location: 'Colonia Las Minitas, Tegucigalpa',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    verified: true,
    backgroundChecked: true,
    yearsExperience: 7,
    bio: 'Certified master electrician specialized in residential and commercial electrical systems, breaker replacement, short circuit diagnostics, and LED lighting design.',
    specialties: ['Circuit Wiring', 'Breaker Box Upgrade', 'Lighting Fixtures', 'Generator Hookups', 'Short Circuit Fix'],
    phone: '+504 9912-3456',
    availableNow: true,
    workPhotos: [
      { id: 'wp2_1', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', title: 'Main electrical panel rewire' },
      { id: 'wp2_2', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', title: 'Recessed ceiling lights installation' }
    ],
    reviews: [
      {
        id: 'r2_1',
        reviewerName: 'David Suazo',
        reviewerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Instaló todo el cableado de la segunda planta. Trabajo limpio, seguro y certificado.'
      }
    ]
  },
  {
    id: 'w3',
    name: 'Miguel Aguilar',
    category: 'Cleaning',
    rating: 5.0,
    reviewsCount: 200,
    completedJobsCount: 200,
    hourlyRate: 280,
    distanceKm: 3.1,
    location: 'Colonia Tepeyac, Tegucigalpa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    verified: true,
    backgroundChecked: true,
    yearsExperience: 4,
    bio: 'Dedicated cleaning specialist providing deep residential sanitization, post-construction cleanup, window washing, and office maintenance.',
    specialties: ['Deep Home Cleaning', 'Sanitization', 'Post-Construction', 'Carpet Cleaning', 'Window Washing'],
    phone: '+504 9788-1122',
    availableNow: false,
    workPhotos: [
      { id: 'wp3_1', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', title: 'Spotless kitchen deep clean' }
    ],
    reviews: [
      {
        id: 'r3_1',
        reviewerName: 'Claudia Meza',
        reviewerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Dejó la casa reluciente antes de la fiesta de mi hija. Puntual y muy detallista.'
      }
    ]
  },
  {
    id: 'w4',
    name: 'Sofia Mendoza',
    category: 'Painting',
    rating: 4.9,
    reviewsCount: 112,
    completedJobsCount: 112,
    hourlyRate: 260,
    distanceKm: 4.2,
    location: 'El Hatillo, Tegucigalpa',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    backgroundChecked: true,
    yearsExperience: 6,
    bio: 'Experienced interior painter focusing on clean edge lines, wall repair, waterproofing coats, and modern accent wall textures.',
    specialties: ['Interior Painting', 'Wall Sanding & Prep', 'Exterior Waterproofing', 'Accent Walls'],
    phone: '+504 9655-4433',
    availableNow: true,
    workPhotos: [
      { id: 'wp4_1', url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80', title: 'Living room accent wall painting' }
    ],
    reviews: [
      {
        id: 'r4_1',
        reviewerName: 'Mario Villeda',
        reviewerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Pintó toda la fachada exterior de la casa. Excelente combinación de colores y pintura duradera.'
      }
    ]
  },
  {
    id: 'w5',
    name: 'Juan Pablo Alvarado',
    category: 'Moving',
    rating: 4.7,
    reviewsCount: 85,
    completedJobsCount: 85,
    hourlyRate: 320,
    distanceKm: 2.5,
    location: 'Colonia Lomas del Guijarro, Tegucigalpa',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    backgroundChecked: true,
    yearsExperience: 4,
    bio: 'Equipped with a spacious pickup truck and heavy-duty moving straps. Specialized in safe home furniture relocations and appliance transport.',
    specialties: ['Furniture Moving', 'Truck Transport', 'Heavy Appliance Lifting', 'Packing Assistance'],
    phone: '+504 9544-3322',
    availableNow: true,
    workPhotos: [],
    reviews: [
      {
        id: 'r5_1',
        reviewerName: 'Sonia Reyes',
        rating: 4.8,
        date: '3 weeks ago',
        comment: 'Cuidó muchísimo mis muebles de madera durante la mudanza desde Florencia a Lomas.'
      }
    ]
  },
  {
    id: 'w6',
    name: 'Roberto Flores',
    category: 'Gardening',
    rating: 4.8,
    reviewsCount: 94,
    completedJobsCount: 94,
    hourlyRate: 220,
    distanceKm: 0.9,
    location: 'Colonia Alameda, Tegucigalpa',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    verified: true,
    backgroundChecked: true,
    yearsExperience: 8,
    bio: 'Passionate gardener offering lawn mowing, tree trimming, garden weed clearance, and flower bed design.',
    specialties: ['Lawn Care', 'Pruning', 'Irrigation Systems', 'Weed Control'],
    phone: '+504 9433-2211',
    availableNow: true,
    workPhotos: [],
    reviews: [
      {
        id: 'r6_1',
        reviewerName: 'Luis Bueso',
        rating: 5,
        date: '1 week ago',
        comment: 'Transformó completamente el patio de mi casa. Los árboles quedaron perfectamente podados.'
      }
    ]
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Fix kitchen sink and pipe leak',
    category: 'Plumbing',
    description: 'The kitchen sink pipe is leaking beneath the cabinet and needs sealing or pipe segment replacement. Need someone to visit today or tomorrow morning.',
    budget: 500,
    location: 'Colonia Palmira, Tegucigalpa',
    datePosted: 'Today at 09:30 AM',
    status: 'In Progress',
    urgency: 'High',
    assignedWorkerId: 'w1',
    applicants: [
      {
        workerId: 'w1',
        appliedDate: '10 mins ago',
        proposedBudget: 500,
        message: 'Hola Elena! Tengo disponibilidad inmediata para inspeccionar y solucionar la fuga en Colonia Palmira. Llevo mis herramientas.',
        status: 'Accepted'
      }
    ]
  },
  {
    id: 'j2',
    title: 'Paint 2 bedroom apartment walls',
    category: 'Painting',
    description: 'Looking for a skilled painter to paint two medium bedrooms with off-white interior latex paint. Paint materials provided.',
    budget: 1800,
    location: 'Colonia Lomas del Mayab, Tegucigalpa',
    datePosted: 'Yesterday at 04:15 PM',
    status: 'Open',
    urgency: 'Medium',
    applicants: [
      {
        workerId: 'w4',
        appliedDate: '2 hours ago',
        proposedBudget: 1750,
        message: 'Hola, tengo la experiencia ideal para pintar ambas habitaciones en 1 día laboral. Dejaré el piso totalmente protegido.',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'j3',
    title: 'Garden lawn maintenance & tree pruning',
    category: 'Gardening',
    description: 'Trim back overgrown hibiscus bushes and cut grass in front lawn.',
    budget: 600,
    location: 'Colonia Humuya, Tegucigalpa',
    datePosted: 'May 18, 2026',
    status: 'Completed',
    urgency: 'Low',
    assignedWorkerId: 'w6',
    completedDate: 'May 19, 2026',
    applicants: [
      {
        workerId: 'w6',
        appliedDate: 'May 18, 2026',
        proposedBudget: 600,
        message: 'Listo para atender su jardín con mi propia podadora.',
        status: 'Accepted'
      }
    ]
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    workerId: 'w1',
    jobId: 'j1',
    lastMessage: 'Perfecto, llegaré a las 10:00 AM a Colonia Palmira.',
    lastMessageTime: '10:14 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: 'client',
        text: 'Hola Carlos, vi tu perfil. ¿Estás disponible para reparar la fuga en mi cocina hoy?',
        timestamp: '10:05 AM'
      },
      {
        id: 'm2',
        sender: 'worker',
        text: '¡Hola Elena! Sí, estoy en zona cercana. El costo estimado por 2 horas de trabajo es L 500 más tarifa del servicio.',
        timestamp: '10:08 AM'
      },
      {
        id: 'm3',
        sender: 'client',
        text: 'Excelente. Te reservaré directamente por la aplicación.',
        timestamp: '10:11 AM'
      },
      {
        id: 'm4',
        sender: 'worker',
        text: 'Perfecto, llegaré a las 10:00 AM a Colonia Palmira.',
        timestamp: '10:14 AM',
        read: false
      }
    ]
  },
  {
    id: 'c2',
    workerId: 'w4',
    jobId: 'j2',
    lastMessage: '¿Ustedes proporcionan la pintura o la compro yo?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm2_1',
        sender: 'worker',
        text: 'Hola Elena, vi tu publicación para pintar 2 habitaciones en Lomas del Mayab. ¿Ustedes proporcionan la pintura o la compro yo?',
        timestamp: 'Yesterday 05:00 PM'
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Elena Gómez',
  email: 'elena.gomez@gmail.com',
  phone: '+504 9812-7788',
  location: 'Tegucigalpa, Honduras',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  savedWorkerIds: ['w1', 'w3'],
  paymentMethods: [
    {
      id: 'pm1',
      type: 'card',
      title: 'Credit / Debit Card',
      subtitle: 'Visa ending in •••• 4242',
      isDefault: true
    },
    {
      id: 'pm2',
      type: 'tigo_money',
      title: 'Mobile Money (Tigo Money)',
      subtitle: '+504 9812-7788',
      isDefault: false
    },
    {
      id: 'pm3',
      type: 'cash',
      title: 'Cash',
      subtitle: 'Pay in cash after service',
      isDefault: false
    }
  ]
};
