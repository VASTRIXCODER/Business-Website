// Inline icon set (lucide-style, current-color, 1.6 stroke)
const I = (path, vb = "0 0 24 24") => ({ className = "w-4 h-4", ...rest } = {}) =>
  <svg viewBox={vb} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>{path}</svg>;

const ArrowRight = I(<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>);
const ArrowUpRight = I(<><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>);
const Phone = I(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>);
const Mic = I(<><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><path d="M12 19v3"/></>);
const Globe = I(<><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></>);
const BarChart = I(<><path d="M3 3v18h18"/><path d="M7 14v3"/><path d="M12 9v8"/><path d="M17 5v12"/></>);
const Film = I(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 12h18"/><path d="M3 7.5h4"/><path d="M3 16.5h4"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></>);
const Message = I(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>);
const Shield = I(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>);
const Clock = I(<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>);
const Zap = I(<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>);
const Badge = I(<><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z"/><path d="m9 12 2 2 4-4"/></>);
const Server = I(<><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 7h.01"/><path d="M7 18h.01"/></>);
const Lock = I(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>);
const Users = I(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>);
const TrendingUp = I(<><path d="m22 7-9 9-4-4-7 7"/><path d="M15 7h7v7"/></>);
const Star = I(<path d="M12 2 15 9l8 .8-6 5.3 1.8 7.9L12 18.7 5.2 23 7 15.1 1 9.8 9 9Z"/>);
const Quote = I(<><path d="M7 7h4v4l-2 4H7a4 4 0 0 1 0-8Z" fill="currentColor" stroke="none"/><path d="M15 7h4v4l-2 4h-2a4 4 0 0 1 0-8Z" fill="currentColor" stroke="none"/></>);
const Menu = I(<><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>);
const X = I(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>);
const Send = I(<><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></>);
const Sparkles = I(<><path d="M12 3v3"/><path d="m4.2 6.2 2.1 2.1"/><path d="M3 13.5h3"/><path d="m6.3 18.7-2.1 2.1"/><path d="M12 18v3"/><path d="m17.7 18.7 2.1 2.1"/><path d="M18 13.5h3"/><path d="m19.8 6.2-2.1 2.1"/><circle cx="12" cy="12" r="3"/></>);
const Check = I(<path d="m5 12 5 5L20 7"/>);
const Bot = I(<><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 4v4"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/><path d="M12 4v0"/><circle cx="12" cy="3" r="1"/></>);
const Cpu = I(<><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2"/><path d="M15 2v2"/><path d="M9 20v2"/><path d="M15 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M20 15h2"/></>);
const Calendar = I(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/></>);

Object.assign(window, {
  ArrowRight, ArrowUpRight, Phone, Mic, Globe, BarChart, Film, Message,
  Shield, Clock, Zap, Badge, Server, Lock, Users, TrendingUp, Star, Quote,
  Menu, X, Send, Sparkles, Check, Bot, Cpu, Calendar,
});
