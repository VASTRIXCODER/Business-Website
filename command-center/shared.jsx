/* AIATWORK Command Center — shared components */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ─ Toast system ─────────────────────────────────────── */
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((cur) => [...cur, { id, ...t }]);
    setTimeout(() => setToasts((cur) => cur.filter(x => x.id !== id)), t.duration || 2800);
  };
  const node = (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 items-end">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          {t.kind === 'success' && <CircleCheck className="w-4 h-4 text-emerald-300"/>}
          {t.kind === 'error'   && <AlertTriangle className="w-4 h-4 text-crimson-300"/>}
          {!t.kind && <Sparkles className="w-4 h-4 text-crimson-300"/>}
          <span className="text-[13px]">{t.msg}</span>
        </div>
      ))}
    </div>
  );
  return { push, node };
}

/* ─ Sidebar ──────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    label: 'CRM',
    items: [
      { id:'overview',     name:'Overview',         icon: Dashboard },
      { id:'projects',     name:'Projects',         icon: Briefcase },
      { id:'rephub',       name:'Rep Hub',          icon: Trophy },
      { id:'leaderboard',  name:'Leaderboard',      icon: Medal },
      { id:'leads',        name:'Leads',            icon: UsersIcon, badge:'NEW' },
      { id:'companies',    name:'Companies',        icon: Building },
      { id:'pipelines',    name:'Pipelines',        icon: Target },
      { id:'tasks',        name:'Tasks',            icon: CheckSquare },
      { id:'interactions', name:'AI Interactions',  icon: Message },
      { id:'conversations',name:'Conversations',    icon: Bot },
      { id:'bookings',     name:'Bookings',         icon: Calendar },
      { id:'analytics',    name:'Analytics',        icon: TrendingUp },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id:'chat',         name:'Team Chat',        icon: Messages },
      { id:'dm',           name:'Direct Messages',  icon: Mail },
    ],
  },
  {
    label: 'Admin',
    items: [
      { id:'jarvis',       name:'Jarvis Control',   icon: Brain, pulse:true },
      { id:'integrations', name:'Integrations',     icon: Zap },
      { id:'settings',     name:'Settings',         icon: Settings },
      { id:'users',        name:'User Management',  icon: UserCog },
      { id:'workspaces',   name:'Workspaces',       icon: Server },
      { id:'logs',         name:'System Logs',      icon: Activity },
      { id:'requests',     name:'Account Requests', icon: Shield },
    ],
  },
];

function Sidebar({ active, onSelect, collapsed, onToggleCollapse }) {
  return (
    <aside
      className={`relative shrink-0 transition-[width] duration-300 ease-out ${
        collapsed ? 'w-[64px]' : 'w-[244px]'
      } border-r border-white/[0.05] bg-ink-950/40 backdrop-blur-xl flex flex-col h-screen sticky top-0`}>
      {/* Brand */}
      <div className="h-14 flex items-center gap-2.5 px-3.5 border-b border-white/[0.04] shrink-0">
        <span className={`logo-mark ${collapsed ? 'logo-mark-sm' : ''}`} />
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-display text-[13.5px] font-semibold text-white tracking-wide leading-none">
              AIAT<span className="text-crimson-300">WORK</span>
            </div>
            <div className="text-[9.5px] uppercase tracking-[0.22em] text-white/35 mt-1">Command Center</div>
          </div>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35"/>
            <input placeholder="Search…" className="field pl-7 pr-12 py-1.5 text-[12px]"/>
            <span className="kbd absolute right-2 top-1/2 -translate-y-1/2">⌘K</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto thin-scroll py-3 px-2">
        {NAV_GROUPS.map((g) => (
          <div key={g.label}>
            {!collapsed && <div className="nav-section-label">{g.label}</div>}
            {collapsed && <div className="h-px bg-white/[0.05] mx-3 my-3"/>}
            <div className="space-y-0.5">
              {g.items.map((it) => (
                <button
                  key={it.id}
                  onClick={() => onSelect(it.id)}
                  className={`nav-item w-full text-left ${active === it.id ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? it.name : ''}>
                  <it.icon className="w-4 h-4 shrink-0"/>
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{it.name}</span>
                      {it.badge && <span className="badge badge-crimson">{it.badge}</span>}
                      {it.pulse && <span className="pulse-dot"/>}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User chip */}
      <div className="border-t border-white/[0.04] p-2.5">
        <button className={`w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] ${collapsed ? 'justify-center' : ''}`}>
          <div className="avatar avatar-1">{CC.user.avatar}</div>
          {!collapsed && (
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[12.5px] text-white font-medium truncate">{CC.user.name}</div>
              <div className="text-[10.5px] text-white/40 truncate">{CC.user.role}</div>
            </div>
          )}
          {!collapsed && <ChevronRight className="w-3.5 h-3.5 text-white/40"/>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-ink-800 border border-white/10 grid place-items-center text-white/60 hover:text-white hover:bg-ink-700 transition-colors"
        title={collapsed ? 'Expand' : 'Collapse'}>
        {collapsed ? <ChevronRight className="w-3 h-3"/> : <ChevronRight className="w-3 h-3 rotate-180"/>}
      </button>
    </aside>
  );
}

/* ─ Topbar ───────────────────────────────────────────── */
function Topbar({ section, onLogout }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profOpen,  setProfOpen]  = useState(false);
  const notifRef = useRef(null);
  const profRef  = useRef(null);

  // Click outside to close dropdowns
  useEffect(() => {
    if (!notifOpen && !profOpen) return;
    const onClick = (e) => {
      if (notifOpen && notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profOpen  && profRef.current  && !profRef.current.contains(e.target))  setProfOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [notifOpen, profOpen]);

  const titles = {
    overview:'Overview', leads:'Leads', companies:'Companies', pipelines:'Pipelines',
    tasks:'Tasks', interactions:'AI Interactions', conversations:'Conversations',
    bookings:'Bookings', analytics:'Analytics', chat:'Team Chat', dm:'Direct Messages',
    jarvis:'Jarvis Control', integrations:'Integrations', settings:'Settings',
    users:'User Management', workspaces:'Workspaces', logs:'System Logs',
    requests:'Account Requests', rephub:'Rep Hub', projects:'Projects', leaderboard:'Leaderboard',
  };

  const breadcrumb = titles[section] || section;

  return (
    <header className="h-14 sticky top-0 z-40 shrink-0 border-b border-white/[0.05] bg-ink-950/60 backdrop-blur-xl flex items-center px-5 gap-4">
      <div className="flex items-center gap-2 text-[12.5px]">
        <span className="text-white/40">Workspace</span>
        <ChevronRight className="w-3 h-3 text-white/30"/>
        <span className="text-white/40">AIATWORK</span>
        <ChevronRight className="w-3 h-3 text-white/30"/>
        <span className="text-white font-medium">{breadcrumb}</span>
      </div>

      <div className="flex-1"/>

      <div className="hidden md:flex items-center gap-1 surface-1 rounded-lg pl-3 pr-2 py-1.5 w-[280px]">
        <Search className="w-3.5 h-3.5 text-white/40"/>
        <input placeholder="Search leads, deals, tasks…" className="bg-transparent text-[12.5px] text-white placeholder:text-white/35 flex-1 outline-none"/>
        <span className="kbd">⌘K</span>
      </div>

      {/* Live indicator */}
      <div className="hidden md:flex items-center gap-2 text-[11px] text-white/55 surface-1 rounded-lg px-2.5 py-1.5">
        <span className="pulse-dot pulse-dot-emerald"/>
        Live · synced 2s ago
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button onClick={() => { setNotifOpen(o => !o); setProfOpen(false); }}
                className="btn-icon relative">
          <Bell className="w-4 h-4"/>
        </button>
        {notifOpen && (
          <div className="absolute right-0 mt-2 w-[340px] glass-strong rim rounded-xl p-2 z-50 fade-in">
            <div className="px-2 py-2 flex items-center justify-between">
              <div className="text-[12px] text-white/60 font-semibold uppercase tracking-wider">Notifications</div>
              <button className="text-[10px] text-crimson-300 hover:text-white">Mark all read</button>
            </div>
            <div className="text-center py-8 text-[12px] text-white/40">
              <Bell className="w-6 h-6 mx-auto mb-2 text-white/20"/>
              No new notifications
            </div>
          </div>
        )}
      </div>

      <button className="btn-icon"><Sparkles className="w-4 h-4"/></button>

      {/* Profile */}
      <div className="relative" ref={profRef}>
        <button onClick={() => { setProfOpen(o => !o); setNotifOpen(false); }}
                className="flex items-center gap-2 surface-1 rounded-full pl-1 pr-2.5 py-1 hover:bg-white/[0.05] transition-colors">
          <div className="avatar avatar-1">{CC.user.avatar}</div>
          <div className="text-left leading-tight pr-1">
            <div className="text-[12px] text-white font-medium leading-none">{CC.user.name}</div>
            <div className="text-[9.5px] text-white/45 mt-0.5">{CC.user.role}</div>
          </div>
          <ChevronDown className="w-3 h-3 text-white/40"/>
        </button>
        {profOpen && (
          <div className="absolute right-0 mt-2 w-[220px] glass-strong rim rounded-xl p-1.5 z-50 fade-in">
            <div className="px-3 py-2.5 border-b border-white/[0.06]">
              <div className="text-[12.5px] text-white font-medium">{CC.user.name}</div>
              <div className="text-[10.5px] text-white/45">{CC.user.email}</div>
            </div>
            <div className="py-1">
              {[
                { icon: UserCog,  t: 'Account settings'  },
                { icon: Shield,   t: 'Security'          },
                { icon: Sparkles, t: 'What\'s new'       },
              ].map((it, i) => (
                <button key={i} className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-[12.5px] text-white/80 hover:bg-white/[0.05]">
                  <it.icon className="w-3.5 h-3.5 text-white/55"/>{it.t}
                </button>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-1">
              <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-[12.5px] text-crimson-300 hover:bg-crimson-500/10">
                <Logout className="w-3.5 h-3.5"/>Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ─ Generic Card ─────────────────────────────────────── */
function Card({ children, className = "", title, action, icon: Icon, padded = true }) {
  return (
    <div className={`glass rim rounded-2xl ${className}`}>
      {(title || action) && (
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          {Icon && <Icon className="w-4 h-4 text-crimson-300"/>}
          {title && <h3 className="text-[13px] font-semibold text-white tracking-tight">{title}</h3>}
          <div className="flex-1"/>
          {action}
        </div>
      )}
      <div className={padded ? 'p-5 pt-1' : ''}>{children}</div>
    </div>
  );
}

/* ─ KPI Card ─────────────────────────────────────────── */
function KpiCard({ label, value, sub, icon: Icon, trend, spark }) {
  return (
    <div className="glass rim rounded-2xl p-4 flex flex-col gap-3 hover:bg-white/[0.005] transition-colors">
      <div className="flex items-start justify-between">
        <div className="text-[10.5px] uppercase tracking-widest text-white/45 font-semibold">{label}</div>
        {Icon && <Icon className="w-3.5 h-3.5 text-crimson-300/80"/>}
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="font-display text-[24px] font-semibold text-white tracking-tight leading-none">{value}</div>
          <div className="text-[10.5px] text-white/45 mt-1.5 truncate max-w-[150px]">{sub}</div>
        </div>
        {trend !== undefined && trend !== 0 && (
          <span className={`badge ${trend > 0 ? 'badge-emerald' : 'badge-crimson'} shrink-0`}>
            {trend > 0 ? <ArrowUp className="w-2.5 h-2.5"/> : <ArrowDown className="w-2.5 h-2.5"/>}
            {Math.abs(trend)}%
          </span>
        )}
        {spark && (
          <div className="spark w-[60px] shrink-0">
            {spark.map((h, i) => <span key={i} style={{height: `${h}%`}}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─ Modal primitive ──────────────────────────────────── */
function Modal({ open, onClose, title, children, maxWidth = 480 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="absolute inset-0" onClick={onClose}/>
      <div className="relative modal-card glass-strong rim" style={{maxWidth}}>
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="font-display text-base font-semibold text-white tracking-tight">{title}</h2>
          <button onClick={onClose} className="btn-icon !w-7 !h-7"><X className="w-3.5 h-3.5"/></button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

/* ─ Status badge helper ──────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    new:        ['badge-sky',     'New'],
    qualified:  ['badge-violet',  'Qualified'],
    demo:       ['badge-amber',   'Demo'],
    proposal:   ['badge-ember',   'Proposal'],
    won:        ['badge-emerald', 'Won'],
    lost:       ['badge-mute',    'Lost'],
    confirmed:  ['badge-emerald', 'Confirmed'],
    pending:    ['badge-amber',   'Pending'],
    converted:  ['badge-emerald', 'Converted'],
    active:     ['badge-sky',     'Active'],
    connected:  ['badge-emerald', 'Connected'],
    disconnected:['badge-mute',   'Disconnected'],
    error:      ['badge-crimson', 'Error'],
    todo:       ['badge-amber',   'To do'],
    done:       ['badge-emerald', 'Done'],
    high:       ['badge-crimson', 'High'],
    medium:     ['badge-amber',   'Medium'],
    low:        ['badge-emerald', 'Low'],
  };
  const [cls, label] = map[status] || ['badge-mute', status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

/* ─ Reveal-on-scroll hook ────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─ Lookup helper ────────────────────────────────────── */
function getUser(id) { return CC.team.find(u => u.id === id); }
function Avatar({ userId, size = 'md' }) {
  const u = getUser(userId);
  if (!u) return <div className={`avatar ${size === 'sm' ? 'avatar-sm' : size === 'lg' ? 'avatar-lg' : ''}`}>—</div>;
  return <div className={`avatar ${u.cls} ${size === 'sm' ? 'avatar-sm' : size === 'lg' ? 'avatar-lg' : ''}`} title={u.name}>{u.avatar}</div>;
}

Object.assign(window, {
  useToasts, Sidebar, Topbar, Card, KpiCard, Modal, StatusBadge, useReveal, getUser, Avatar,
});
