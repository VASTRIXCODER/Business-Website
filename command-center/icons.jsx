// Command center icons (lucide-style)
const I = (path, vb = "0 0 24 24") => ({ className = "w-4 h-4", ...rest } = {}) =>
  <svg viewBox={vb} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>{path}</svg>;

const Dashboard = I(<><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>);
const UsersIcon = I(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>);
const Building = I(<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></>);
const Target = I(<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>);
const Check = I(<path d="m5 12 5 5L20 7"/>);
const CheckSquare = I(<><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>);
const TrendingUp = I(<><path d="m22 7-9 9-4-4-7 7"/><path d="M15 7h7v7"/></>);
const TrendingDown = I(<><path d="m22 17-9-9-4 4-7-7"/><path d="M15 17h7v-7"/></>);
const Calendar = I(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/></>);
const Message = I(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>);
const Messages = I(<><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M21 12a8 8 0 0 1-8 8 9 9 0 0 1-3-.5L3 21l1.5-7A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z"/></>);
const Mail = I(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></>);
const Bot = I(<><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 4v4"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/><circle cx="12" cy="3" r="1"/></>);
const Brain = I(<><path d="M12 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3"/><path d="M12 5a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3"/><path d="M9 8H6a3 3 0 0 0 0 6h3"/><path d="M15 8h3a3 3 0 0 1 0 6h-3"/><path d="M12 2v3"/><path d="M12 19v3"/></>);
const Zap = I(<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>);
const Settings = I(<><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></>);
const Shield = I(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></>);
const Activity = I(<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>);
const Server = I(<><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 7h.01"/><path d="M7 18h.01"/></>);
const UserCog = I(<><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h7"/><circle cx="18" cy="18" r="2.5"/><path d="m21.5 21-1.7-1"/><path d="m16.2 15-1.7-1"/><path d="M18 14.5V13"/><path d="M18 23v-1.5"/></>);
const Briefcase = I(<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>);
const Trophy = I(<><path d="M6 9H4a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3"/><path d="M18 9h2a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-3"/><path d="M6 4h12v6a6 6 0 0 1-12 0Z"/><path d="M9 16h6"/><path d="M12 16v4"/><path d="M8 20h8"/></>);
const Medal = I(<><circle cx="12" cy="15" r="6"/><path d="m9 11-3-7h12l-3 7"/></>);
const Phone = I(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>);
const PhoneOff = I(<><path d="m10.68 13.31 1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 18.6 14a2 2 0 0 1-2.18 1.92"/><path d="M2 2l20 20"/><path d="M5.91 5.83a19.79 19.79 0 0 0-3.78-1.65A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81"/></>);
const Plus = I(<><path d="M12 5v14"/><path d="M5 12h14"/></>);
const Search = I(<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>);
const Filter = I(<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>);
const MoreH = I(<><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="6" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="12" r="1" fill="currentColor"/></>);
const X = I(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>);
const ArrowRight = I(<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>);
const ArrowUp = I(<><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></>);
const ArrowDown = I(<><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>);
const ChevronDown = I(<path d="m6 9 6 6 6-6"/>);
const ChevronRight = I(<path d="m9 6 6 6-6 6"/>);
const Send = I(<><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></>);
const Sparkles = I(<><path d="M12 3v3"/><path d="m4.2 6.2 2.1 2.1"/><path d="M3 13.5h3"/><path d="m6.3 18.7-2.1 2.1"/><path d="M12 18v3"/><path d="m17.7 18.7 2.1 2.1"/><path d="M18 13.5h3"/><path d="m19.8 6.2-2.1 2.1"/><circle cx="12" cy="12" r="3"/></>);
const Bell = I(<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>);
const Clock = I(<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>);
const Flame = I(<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>);
const Eye = I(<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>);
const Lock = I(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>);
const Edit = I(<><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></>);
const Trash = I(<><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>);
const Copy = I(<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>);
const AlertTriangle = I(<><path d="m10.29 3.86-8.43 14.6A2 2 0 0 0 3.6 22h16.8a2 2 0 0 0 1.74-3.54l-8.43-14.6a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>);
const CircleCheck = I(<><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>);
const Globe = I(<><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></>);
const Database = I(<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></>);
const Hash = I(<><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>);
const DollarSign = I(<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>);
const PieChart = I(<><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></>);
const BarChart = I(<><path d="M3 3v18h18"/><path d="M7 14v3"/><path d="M12 9v8"/><path d="M17 5v12"/></>);
const Logout = I(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>);
const Video = I(<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>);
const Mic = I(<><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><path d="M12 19v3"/></>);
const Paperclip = I(<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.93 8.83l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>);
const Smile = I(<><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>);
const Pause = I(<><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></>);
const Play = I(<polygon points="6 4 20 12 6 20 6 4"/>);
const Power = I(<><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></>);
const Code = I(<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>);
const RefreshCw = I(<><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>);
const Star = I(<path d="m12 2 3.09 7.26L23 9.81l-5.5 4.84L19.18 23 12 18.97 4.82 23 6.5 14.65 1 9.81l7.91-.55Z"/>);

Object.assign(window, {
  Dashboard, UsersIcon, Building, Target, Check, CheckSquare, TrendingUp, TrendingDown,
  Calendar, Message, Messages, Mail, Bot, Brain, Zap, Settings, Shield, Activity, Server,
  UserCog, Briefcase, Trophy, Medal, Phone, PhoneOff, Plus, Search, Filter, MoreH, X,
  ArrowRight, ArrowUp, ArrowDown, ChevronDown, ChevronRight, Send, Sparkles, Bell, Clock,
  Flame, Eye, Lock, Edit, Trash, Copy, AlertTriangle, CircleCheck, Globe, Database, Hash,
  DollarSign, PieChart, BarChart, Logout, Video, Mic, Paperclip, Smile, Pause, Play, Power, Code,
  RefreshCw, Star,
});
