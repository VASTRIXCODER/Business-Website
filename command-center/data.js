/* AIATWORK Command Center — base config & user state
   All business data (leads, deals, tasks, bookings, etc.) lives in
   real backends. This file holds only platform configuration:
   the current user, team roster, stage definitions, and channel list.
   ──────────────────────────────────────────────────────── */
window.CC = {
  user: {
    name: "Alex Morgan",
    email: "alex@aiatwork.com",
    role: "superadmin",
    avatar: "AM",
  },

  // Workspace team (configured users, not mock business data)
  team: [
    { id:'u1', name:'Alex Morgan',   role:'Founder',        avatar:'AM', cls:'avatar-1', status:'online'  },
    { id:'u2', name:'Priya Shah',    role:'Head of Sales',  avatar:'PS', cls:'avatar-3', status:'online'  },
    { id:'u3', name:'Marcus Patel',  role:'AE',             avatar:'MP', cls:'avatar-2', status:'online'  },
    { id:'u4', name:'Sarah Wen',     role:'AE',             avatar:'SW', cls:'avatar-4', status:'away'    },
    { id:'u5', name:'Jordan Brooks', role:'SDR',            avatar:'JB', cls:'avatar-5', status:'online'  },
    { id:'u6', name:'Lena Hayes',    role:'SDR',            avatar:'LH', cls:'avatar-6', status:'offline' },
    { id:'u7', name:'Omar Hilmi',    role:'Ops',            avatar:'OH', cls:'avatar-2', status:'online'  },
  ],

  // Pipeline stage taxonomy (blue spectrum)
  stages: [
    { id:'s1', name:'New',         color:'#93C5FD' },
    { id:'s2', name:'Qualified',   color:'#60A5FA' },
    { id:'s3', name:'Demo',        color:'#3B82F6' },
    { id:'s4', name:'Proposal',    color:'#22D3EE' },
    { id:'s5', name:'Closed-won',  color:'#34D399' },
  ],

  // Team chat channels (real messages live in backend)
  chatChannels: [
    { id:'general',     name:'general',     unread:0, last:'' },
    { id:'sales',       name:'sales',       unread:0, last:'' },
    { id:'engineering', name:'engineering', unread:0, last:'' },
    { id:'wins',        name:'wins',        unread:0, last:'' },
    { id:'random',      name:'random',      unread:0, last:'' },
  ],

  // Integration definitions (status comes from real connectors)
  integrations: [
    { id:'i1', name:'Supabase',   cat:'Database',    status:'disconnected', desc:'Primary data store',         last:'—' },
    { id:'i2', name:'ElevenLabs', cat:'Voice',       status:'disconnected', desc:'Voice agent engine',         last:'—' },
    { id:'i3', name:'Twilio',     cat:'Telephony',   status:'disconnected', desc:'Dialer + SMS infrastructure',last:'—' },
    { id:'i4', name:'OpenAI',     cat:'AI',          status:'disconnected', desc:'Agent reasoning model',      last:'—' },
    { id:'i5', name:'Resend',     cat:'Email',       status:'disconnected', desc:'Transactional email',        last:'—' },
    { id:'i6', name:'Stripe',     cat:'Billing',     status:'disconnected', desc:'Client invoicing',           last:'—' },
    { id:'i7', name:'Slack',      cat:'Comms',       status:'disconnected', desc:'Team comms bridge',          last:'—' },
    { id:'i8', name:'HubSpot',    cat:'CRM Sync',    status:'disconnected', desc:'Two-way CRM sync',           last:'—' },
    { id:'i9', name:'Calendly',   cat:'Scheduling',  status:'disconnected', desc:'Booking pages',              last:'—' },
    { id:'i10', name:'LeadHunter',cat:'Prospecting', status:'connected',    desc:'Local business intelligence', last:'live' },
  ],

  // Everything below is intentionally empty — populated by real backends.
  stats: {
    totalLeads: 0, leadsThisWeek: 0, leadsLastWeek: 0,
    pipelineValue: 0, closeRate: 0, avgDealSize: 0,
    totalBookings: 0, aiConversations: 0,
    openDeals: 0, wonDeals: 0, lostDeals: 0,
    pendingBookings: 0, hotLeads: 0, unownedLeads: 0,
    overdueTasks: 0, outreachDrafts: 0, outreachSent: 0,
    outreachQueued: 0, chatbotToday: 0, chatbotConverted: 0,
  },
  leads: [],
  pipelineDeals: { s1: [], s2: [], s3: [], s4: [], s5: [] },
  tasks: [],
  bookings: [],
  conversations: [],
  chatMessages: [],
  jarvis: [],
  logs: [],
  requests: [],
  reps: [],
  projects: [],
};
