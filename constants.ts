import { Theme, User, Post, Conversation, PostStatus } from './types';

export const THEMES: Theme[] = [
  {
    name: 'Navy Emerald',
    background: 'bg-slate-900',
    gradientFrom: 'from-slate-900',
    gradientTo: 'to-emerald-900/30',
    primary: 'bg-emerald-600',
    secondary: 'bg-slate-800',
    accent: 'bg-emerald-500',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    cardBg: 'bg-slate-800/60 backdrop-blur-sm',
    buttonText: 'text-white'
  },
  {
    name: 'Spectrum',
    background: 'bg-gray-900',
    gradientFrom: 'from-gray-900',
    gradientTo: 'to-indigo-900/40',
    primary: 'bg-indigo-600',
    secondary: 'bg-gray-800',
    accent: 'bg-pink-500',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400',
    cardBg: 'bg-gray-800/50 backdrop-blur-sm',
    buttonText: 'text-white'
  },
  {
    name: 'Ivy',
    background: 'bg-green-50',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-yellow-100/50',
    primary: 'bg-green-800',
    secondary: 'bg-green-100',
    accent: 'bg-yellow-500',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-600',
    cardBg: 'bg-white/70 backdrop-blur-sm',
    buttonText: 'text-white'
  },
  {
    name: 'Midnight',
    background: 'bg-slate-900',
    gradientFrom: 'from-slate-900',
    gradientTo: 'to-sky-900/40',
    primary: 'bg-sky-500',
    secondary: 'bg-slate-800',
    accent: 'bg-emerald-400',
    textPrimary: 'text-slate-200',
    textSecondary: 'text-slate-400',
    cardBg: 'bg-slate-800/60 backdrop-blur-sm',
    buttonText: 'text-white'
  },
  {
      name: 'Sunrise',
      background: 'bg-orange-50',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-teal-100/50',
      primary: 'bg-orange-500',
      secondary: 'bg-orange-100',
      accent: 'bg-teal-400',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      cardBg: 'bg-white/80 backdrop-blur-sm',
      buttonText: 'text-white'
  }
];

export const OFFER_CATEGORIES: string[] = [
  "Previous Year Papers",
  "Sample Papers",
  "Class Notes",
  "Textbooks",
  "Lab Equipment",
  "Stationery",
  "Tutoring Session",
  "Digital Resources",
];

export const GREETINGS: string[] = [
  "Hello...",
  "Hola...",
  "Bonjour...",
  "Ciao...",
  "Olá...",
  "Guten Tag...",
  "Konnichiwa...",
  "Namaste...",
  "Salaam...",
];

export const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/alex/100', school: 'Eastwood High', transactionCount: 12, offers: ["Class Notes", "Textbooks"] },
    { id: 'u2', name: 'Ben Carter', avatarUrl: 'https://picsum.photos/seed/ben/100', school: 'Northwood Academy', transactionCount: 5, offers: ["Sample Papers"] },
    { id: 'u3', name: 'Chloe Garcia', avatarUrl: 'https://picsum.photos/seed/chloe/100', school: 'Eastwood High', transactionCount: 21, offers: ["Tutoring Session", "Previous Year Papers"] },
];

export const MOCK_POSTS: Post[] = [
    { id: 'p1', author: MOCK_USERS[1], title: 'Physics 101 Textbook (Mint Condition)', description: 'Barely used textbook for the introductory physics course. No highlights or marks.', category: 'Textbooks', imageUrl: 'https://picsum.photos/seed/physics/600/400', status: PostStatus.AVAILABLE, interestedUsers: ['u3'], timestamp: '2 hours ago' },
    { id: 'p2', author: MOCK_USERS[2], title: 'Complete Calculus III Notes', description: 'Detailed, handwritten notes covering the entire semester of Calculus III. Includes diagrams and solved examples.', category: 'Class Notes', status: PostStatus.AVAILABLE, interestedUsers: [], timestamp: '1 day ago' },
    { id: 'p3', author: MOCK_USERS[0], title: 'SAT Prep Sample Papers (2023)', description: 'A bundle of 5 official sample papers from last year.', category: 'Sample Papers', imageUrl: 'https://picsum.photos/seed/sat/600/400', status: PostStatus.COMPLETED, interestedUsers: ['u2'], timestamp: '3 days ago' },
    { id: 'p4', author: MOCK_USERS[2], title: 'Chemistry Lab Coat & Goggles', description: 'Standard issue lab coat (size M) and safety goggles.', category: 'Lab Equipment', status: PostStatus.UNAVAILABLE, interestedUsers: ['u1'], timestamp: '5 days ago' },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        participants: [MOCK_USERS[0], MOCK_USERS[2]],
        messages: [
            { id: 'm1', senderId: 'u3', text: 'Hey! I saw your post for the SAT papers. Are they still available?', timestamp: '3 days ago' },
            { id: 'm2', senderId: 'u1', text: 'Hi Chloe! Yes, they are. We can meet at the library tomorrow.', timestamp: '3 days ago' },
            { id: 'm3', senderId: 'u3', text: 'Perfect, see you then!', timestamp: '3 days ago' },
        ]
    },
    {
        id: 'c2',
        participants: [MOCK_USERS[0], MOCK_USERS[1]],
        messages: [
            { id: 'm4', senderId: 'u2', text: 'Hey Alex, is the lab coat still up for grabs?', timestamp: '6 days ago' },
        ]
    }
];