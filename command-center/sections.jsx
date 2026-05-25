/* ─────────────────────────────────────────────────────
   AIATWORK Command Center — primary CRM sections
   Overview · Leads · Pipelines · Tasks
   ───────────────────────────────────────────────────── */

const fmtMoney = (n) => '$' + (n || 0).toLocaleString();
const fmtMoneyShort = (n) => {
  if (n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M';
  if (n >= 1e3) return '$' + (n/1e3).toFixed(0) + 'k';
  return '$' + (n || 0);
};

/* ─────────────────────────────────────────────────────
   OVERVIEW
   ───────────────────────────────────────────────────── */
function Overview({ onNavigate, pushToast }) {
  const { stats, jarvis } = CC;
  const leadTrend = Math.round(((stats.leadsThisWeek - stats.leadsLastWeek) / stats.leadsLastWeek) * 100);

  const kpis = [
    { label:'Active leads',   value: stats.totalLeads.toLocaleString(),       sub:`+${stats.leadsThisWeek} this week`, icon: UsersIcon,    trend: leadTrend },
    { label:'Pipeline value', value: fmtMoneyShort(stats.pipelineValue),       sub:`${stats.openDeals} open deals`,     icon: DollarSign,   trend: 22 },
    { label:'Close rate',     value: stats.closeRate + '%',                    sub:`${stats.wonDeals} won · ${stats.lostDeals} lost`, icon: Target, trend: 4 },
    { label:'Avg deal',       value: fmtMoneyShort(stats.avgDealSize),         sub:'Per won deal',                       icon: TrendingUp,  trend: 8 },
    { label:'Chatbot',        value: stats.aiConversations.toLocaleString(),   sub:`${stats.chatbotToday} today · ${stats.chatbotConverted} converted`, icon: Bot,    trend: 18 },
    { label:'Outreach',       value: stats.outreachSent.toString(),            sub:`${stats.outreachDrafts} drafts · ${stats.outreachQueued} queued`,   icon: Mail,   trend: 12 },
    { label:'Bookings',       value: stats.totalBookings.toString(),           sub:`${stats.pendingBookings} pending`,   icon: Calendar,    trend: 6 },
    { label:'Overdue',        value: stats.overdueTasks.toString(),            sub:'Action required',                    icon: AlertTriangle, trend: -2 },
  ];

  const sparks = [
    [30,40,55,45,60,80,72,90],
    [50,55,52,68,70,75,80,88],
    [40,45,55,50,62,65,68,72],
    [35,42,48,55,60,58,62,68],
    [20,28,35,42,48,55,62,68],
    [60,65,70,72,75,80,85,82],
    [40,42,45,52,55,60,62,65],
    [30,35,28,32,30,28,25,22],
  ];

  return (
    <div className="space-y-5 fade-in">
      {/* Hero header */}
      <div className="relative glass-strong rim rounded-3xl p-6 sm:p-8 overflow-hidden">
        <div className="fluid-mesh"/>
        <div className="relative flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-crimson-300/90 font-semibold mb-3">
              <span className="pulse-dot"/>
              Live · {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
            </div>
            <h1 className="font-display text-[34px] sm:text-[44px] leading-[1.02] font-semibold tracking-tight">
              <span className="text-white">Welcome back, </span>
              <span className="font-editorial text-fluid">{CC.user.name.split(' ')[0]}.</span>
            </h1>
            <p className="text-white/55 mt-2 text-[14px] max-w-md leading-relaxed">
              Pipeline up <span className="text-emerald-300 font-medium">+22%</span> this week. Jarvis flagged
              <span className="text-crimson-300 font-medium"> {stats.hotLeads} hot leads</span> for triage.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { onNavigate('leads'); pushToast({msg:'Switched to Leads', kind:'success'}); }}
                    className="btn btn-ghost"><UsersIcon className="w-3.5 h-3.5"/> Leads</button>
            <button onClick={() => onNavigate('jarvis')}
                    className="btn btn-ghost"><Brain className="w-3.5 h-3.5"/> Jarvis</button>
            <button onClick={() => onNavigate('tasks')}
                    className="btn btn-ghost"><Clock className="w-3.5 h-3.5"/> Tasks ({stats.overdueTasks})</button>
            <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/> New deal</button>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} spark={sparks[i]}/>)}
      </div>

      {/* Three-col: Pipeline / Tasks / Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PipelineMini onNavigate={onNavigate}/>
        <UrgentTasksMini onNavigate={onNavigate}/>
        <TodayScheduleMini onNavigate={onNavigate}/>
      </div>

      {/* Jarvis insights + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <JarvisInsightsMini onNavigate={onNavigate}/>
        </div>
        <ActivityFeed/>
      </div>

      {/* Recent leads + Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Recent leads" icon={Flame}
              action={<button onClick={() => onNavigate('leads')} className="text-[11px] text-crimson-300 hover:text-white">View all →</button>}
              padded={false}>
          <div className="px-3 pb-3">
            {CC.leads.slice(0, 6).map(l => (
              <div key={l.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.025] transition">
                <Avatar userId={l.owner || 'u1'} size="sm"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] text-white truncate">{l.first} {l.last}</div>
                  <div className="text-[10.5px] text-white/45 truncate">{l.company} · {l.interest}</div>
                </div>
                <ScoreBadge score={l.score}/>
                <StatusBadge status={l.status}/>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent conversations" icon={Bot}
              action={<button onClick={() => onNavigate('conversations')} className="text-[11px] text-crimson-300 hover:text-white">View all →</button>}
              padded={false}>
          <div className="px-3 pb-3">
            {CC.conversations.slice(0, 6).map(c => (
              <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.025] transition">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-crimson-400/30 to-crimson-700/0 border border-crimson-400/30 grid place-items-center">
                  <Bot className="w-3.5 h-3.5 text-crimson-300"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] text-white truncate">{c.name}</div>
                  <div className="text-[10.5px] text-white/45 truncate">{c.interest} · {c.msgs} msgs · {c.last}</div>
                </div>
                <StatusBadge status={c.status}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const cls = score >= 70 ? 'badge-emerald' : score >= 50 ? 'badge-amber' : 'badge-mute';
  return <span className={`badge ${cls} font-mono`}>{score}</span>;
}

function PipelineMini({ onNavigate }) {
  const stages = CC.stages;
  const counts = stages.map(s => CC.pipelineDeals[s.id]?.length || 0);
  const max = Math.max(...counts, 1);
  const totalValue = Object.values(CC.pipelineDeals).flat().reduce((s, d) => s + d.amount, 0);

  return (
    <Card title="Pipeline" icon={Target} action={
      <button onClick={() => onNavigate('pipelines')} className="text-[11px] text-crimson-300 hover:text-white">Open →</button>
    }>
      <div className="font-display text-2xl text-white font-semibold tracking-tight">
        {fmtMoneyShort(totalValue)}
      </div>
      <div className="text-[10.5px] text-white/45 mt-0.5">{Object.values(CC.pipelineDeals).flat().length} deals across {stages.length} stages</div>

      <div className="mt-4 space-y-2.5">
        {stages.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 text-[11.5px]">
            <span className="w-2 h-2 rounded-full" style={{background: s.color}}/>
            <span className="text-white/80 w-20 shrink-0">{s.name}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{width: `${(counts[i]/max)*100}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`}}/>
            </div>
            <span className="font-mono text-white/55 w-6 text-right">{counts[i]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function UrgentTasksMini({ onNavigate }) {
  const urgent = CC.tasks.filter(t => t.status === 'todo' && (t.priority === 'high' || t.due === 'overdue')).slice(0, 5);
  const total = CC.tasks.filter(t => t.status === 'todo').length;
  const done = CC.tasks.filter(t => t.status === 'done').length;
  const pct = Math.round((done / CC.tasks.length) * 100);

  return (
    <Card title="Tasks" icon={CheckSquare} action={
      <button onClick={() => onNavigate('tasks')} className="text-[11px] text-crimson-300 hover:text-white">Open →</button>
    }>
      <div className="flex items-center gap-3 mb-3">
        <div className="font-display text-2xl text-white font-semibold tracking-tight">{total}</div>
        <span className="text-[10.5px] text-white/45">active · {pct}% done</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
        <div className="h-full rounded-full bg-gradient-to-r from-crimson-500 to-crimson-700" style={{width: `${pct}%`}}/>
      </div>
      <div className="space-y-1.5">
        {urgent.map(t => (
          <div key={t.id} className="flex items-center gap-2 p-2 rounded-lg surface-1">
            <span className={`prio-dot prio-${t.priority}`}/>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-white truncate">{t.title}</div>
              <div className="text-[10px] text-white/40">{t.due === 'overdue' ? <span className="text-crimson-300">overdue</span> : t.due}</div>
            </div>
            <Avatar userId={t.owner} size="sm"/>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TodayScheduleMini({ onNavigate }) {
  const todays = CC.bookings.filter(b => b.date === 'Today' || b.date === 'Tomorrow').slice(0, 4);
  return (
    <Card title="Today's schedule" icon={Calendar} action={
      <button onClick={() => onNavigate('bookings')} className="text-[11px] text-crimson-300 hover:text-white">Open →</button>
    }>
      {todays.length === 0 ? (
        <div className="text-[12px] text-white/45 text-center py-6">No bookings today</div>
      ) : (
        <div className="space-y-2">
          {todays.map(b => (
            <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-lg surface-1">
              <div className="w-10 text-center shrink-0">
                <div className="text-[9px] uppercase text-white/45">{b.date}</div>
                <div className="text-[11px] font-mono text-white font-semibold">{b.time}</div>
              </div>
              <div className="w-px h-7 bg-white/8"/>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-white truncate">{b.client}</div>
                <div className="text-[10.5px] text-white/45">{b.type} · {b.duration}m</div>
              </div>
              <StatusBadge status={b.status}/>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function JarvisInsightsMini({ onNavigate }) {
  return (
    <Card title="Jarvis insights" icon={Brain} action={
      <button onClick={() => onNavigate('jarvis')} className="text-[11px] text-crimson-300 hover:text-white">View all →</button>
    }>
      <div className="grid sm:grid-cols-2 gap-2">
        {CC.jarvis.slice(0, 4).map(j => {
          const cls = j.urgency === 'high' ? 'badge-crimson' : j.urgency === 'medium' ? 'badge-amber' : 'badge-sky';
          const kindIcon = j.kind === 'alert' ? AlertTriangle : j.kind === 'action' ? Zap : Sparkles;
          const KindIcon = kindIcon;
          return (
            <div key={j.id} className="surface-1 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className={`badge ${cls}`}>
                  <KindIcon className="w-2.5 h-2.5"/>
                  {j.kind}
                </span>
                <button className="text-white/30 hover:text-white"><MoreH className="w-3.5 h-3.5"/></button>
              </div>
              <div className="text-[12.5px] text-white font-medium leading-snug">{j.title}</div>
              <div className="text-[11px] text-white/50 leading-relaxed">{j.desc}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ActivityFeed() {
  return (
    <Card title="Live activity" icon={Activity} padded={false}>
      <div className="px-5 pb-5">
        <div className="text-center py-8 text-white/40 text-[12px]">
          <Activity className="w-6 h-6 mx-auto mb-2 text-white/20"/>
          No activity yet — connect a data source to see live events here.
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────
   LEADS
   ───────────────────────────────────────────────────── */
function Leads({ pushToast }) {
  const [leads, setLeads] = useState(CC.leads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(new Set());
  const [openId, setOpenId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (l.first + ' ' + l.last).toLowerCase().includes(q)
          || l.company.toLowerCase().includes(q)
          || l.email.toLowerCase().includes(q);
    });
  }, [leads, search, statusFilter]);

  const toggleSel = (id) => setSelected(s => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => setSelected(s => s.size === filtered.length ? new Set() : new Set(filtered.map(l=>l.id)));

  const openLead = leads.find(l => l.id === openId);

  const handleCreate = (newLead) => {
    setLeads(curr => [{ ...newLead, id:'l'+Math.random().toString(36).slice(2), score:50, status:'new', created:new Date().toISOString().slice(0,10) }, ...curr]);
    setCreateOpen(false);
    pushToast({ kind:'success', msg:`Lead "${newLead.first} ${newLead.last}" created`});
  };

  const handleAssign = (leadIds, userId) => {
    setLeads(curr => curr.map(l => leadIds.includes(l.id) ? { ...l, owner: userId } : l));
    setSelected(new Set());
    const u = getUser(userId);
    pushToast({ kind:'success', msg:`${leadIds.length} lead${leadIds.length>1?'s':''} assigned to ${u.name}`});
  };

  const handleDelete = (leadIds) => {
    setLeads(curr => curr.filter(l => !leadIds.includes(l.id)));
    setSelected(new Set());
    pushToast({ kind:'success', msg:`${leadIds.length} lead${leadIds.length>1?'s':''} removed`});
  };

  const statusCounts = useMemo(() => {
    const c = { all: leads.length };
    leads.forEach(l => { c[l.status] = (c[l.status] || 0) + 1; });
    return c;
  }, [leads]);

  const filters = [
    { id:'all',       label:'All' },
    { id:'new',       label:'New' },
    { id:'qualified', label:'Qualified' },
    { id:'demo',      label:'Demo' },
    { id:'won',       label:'Won' },
    { id:'lost',      label:'Lost' },
  ];

  return (
    <div className="fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Leads</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{leads.length} total · {leads.filter(l => l.score >= 70).length} hot</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost"><Filter className="w-3.5 h-3.5"/>Filters</button>
          <button className="btn btn-ghost"><Mail className="w-3.5 h-3.5"/>Import</button>
          <button onClick={() => setCreateOpen(true)} className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New lead</button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f.id} onClick={() => setStatusFilter(f.id)}
                  className={`tab ${statusFilter === f.id ? 'active' : ''}`}>
            {f.label}
            <span className="ml-1.5 text-white/40 font-mono text-[10.5px]">{statusCounts[f.id] || 0}</span>
          </button>
        ))}
        <div className="flex-1"/>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search leads…" className="field pl-8 w-[240px]"/>
        </div>
      </div>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div className="surface-2 rounded-xl px-4 py-2.5 flex items-center justify-between fade-in">
          <div className="text-[12.5px] text-white">
            <span className="font-medium">{selected.size}</span> lead{selected.size > 1 ? 's' : ''} selected
          </div>
          <div className="flex items-center gap-2">
            <AssignDropdown onPick={(uid) => handleAssign([...selected], uid)}/>
            <button className="btn btn-ghost !py-1.5 !text-[11.5px]"><Mail className="w-3 h-3"/>Email</button>
            <button onClick={() => handleDelete([...selected])} className="btn btn-ghost !py-1.5 !text-[11.5px] !text-crimson-300"><Trash className="w-3 h-3"/>Delete</button>
            <button onClick={() => setSelected(new Set())} className="btn-icon !w-7 !h-7"><X className="w-3 h-3"/></button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="glass rim rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{width:32}}>
                <button onClick={toggleAll} className={`chk ${selected.size === filtered.length && filtered.length > 0 ? 'on' : ''}`}>
                  <Check/>
                </button>
              </th>
              <th>Name</th>
              <th>Company</th>
              <th>Score</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Value</th>
              <th>Source</th>
              <th style={{width:60}}/>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="cursor-pointer" onClick={() => setOpenId(l.id)}>
                <td onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => toggleSel(l.id)} className={`chk ${selected.has(l.id) ? 'on' : ''}`}><Check/></button>
                </td>
                <td>
                  <div className="flex items-center gap-2.5">
                    <Avatar userId={l.owner || 'u1'} size="sm"/>
                    <div>
                      <div className="text-white">{l.first} {l.last}</div>
                      <div className="text-[10.5px] text-white/40">{l.email}</div>
                    </div>
                  </div>
                </td>
                <td className="text-white/80">{l.company}</td>
                <td><ScoreBadge score={l.score}/></td>
                <td><StatusBadge status={l.status}/></td>
                <td>{l.owner ? <Avatar userId={l.owner} size="sm"/> : <span className="text-white/35 text-[11px] italic">unassigned</span>}</td>
                <td className="font-mono text-white/85">{fmtMoneyShort(l.value)}</td>
                <td className="text-white/55 capitalize">{l.source}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button className="btn-icon !w-7 !h-7"><MoreH className="w-3.5 h-3.5"/></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="9" className="text-center py-12 text-white/45 text-[12.5px]">No leads match your filter.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Lead drawer */}
      <LeadDrawer lead={openLead} onClose={() => setOpenId(null)} onAssign={(uid) => { handleAssign([openLead.id], uid); }}/>

      {/* Create modal */}
      <CreateLeadModal open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreate}/>
    </div>
  );
}

function AssignDropdown({ onPick }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="btn btn-ghost !py-1.5 !text-[11.5px]"><UsersIcon className="w-3 h-3"/>Assign<ChevronDown className="w-2.5 h-2.5"/></button>
      {open && (
        <div className="absolute right-0 mt-1.5 w-[200px] glass-strong rim rounded-xl p-1.5 z-40 fade-in">
          {CC.team.map(u => (
            <button key={u.id} onClick={() => { onPick(u.id); setOpen(false); }}
                    className="w-full flex items-center gap-2 p-2 rounded-md text-[12px] text-white/85 hover:bg-white/[0.05]">
              <Avatar userId={u.id} size="sm"/>
              <div className="flex-1 text-left">
                <div className="text-white">{u.name}</div>
                <div className="text-[10px] text-white/40">{u.role}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LeadDrawer({ lead, onClose, onAssign }) {
  if (!lead) return null;
  const owner = getUser(lead.owner);
  return (
    <div className="fixed inset-0 z-[120]" role="dialog">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[480px] glass-strong border-l border-white/10 overflow-y-auto thin-scroll fade-in">
        <div className="sticky top-0 bg-ink-950/85 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Avatar userId={lead.owner || 'u1'} size="lg"/>
            <div>
              <div className="font-display text-base font-semibold text-white">{lead.first} {lead.last}</div>
              <div className="text-[11px] text-white/45">{lead.company}</div>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon"><X className="w-3.5 h-3.5"/></button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex gap-2 flex-wrap">
            <StatusBadge status={lead.status}/>
            <ScoreBadge score={lead.score}/>
            <span className="badge badge-mute capitalize">{lead.source}</span>
            <span className="badge badge-mute font-mono">{fmtMoneyShort(lead.value)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-primary !justify-center"><Phone className="w-3.5 h-3.5"/>Call</button>
            <button className="btn btn-ghost !justify-center"><Mail className="w-3.5 h-3.5"/>Email</button>
            <button className="btn btn-ghost !justify-center"><Calendar className="w-3.5 h-3.5"/>Book</button>
            <button className="btn btn-ghost !justify-center"><Message className="w-3.5 h-3.5"/>Note</button>
          </div>

          <div className="surface-1 rounded-xl p-4 space-y-2.5">
            {[
              ['Email', lead.email],
              ['Phone', lead.phone],
              ['Interest', lead.interest],
              ['Source', lead.source],
              ['Created', lead.created],
            ].map(([k,v]) => (
              <div key={k} className="flex items-start justify-between gap-3 text-[12.5px]">
                <span className="text-white/45 w-20 shrink-0">{k}</span>
                <span className="text-white text-right truncate">{v}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 text-[12.5px]">
              <span className="text-white/45 w-20 shrink-0">Owner</span>
              <AssignDropdown onPick={onAssign}/>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/45 font-semibold mb-3">Activity</h4>
            <div className="space-y-3">
              {[
                { icon: Phone,    t:'AI agent called and qualified',  d:'2 hr ago',  detail:'8min call · interest confirmed' },
                { icon: Mail,     t:'Discovery email sent',           d:'1 day ago', detail:'Opened 3× · clicked pricing'    },
                { icon: Bot,      t:'Chatbot opened conversation',    d:'2 days ago',detail:'Asked about Voice Agent pricing'},
                { icon: Calendar, t:'Lead created from chatbot',      d:'2 days ago',detail:'Source: website /pricing'      },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] grid place-items-center text-white/70 shrink-0">
                    <a.icon className="w-3.5 h-3.5"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] text-white">{a.t}</div>
                    <div className="text-[10.5px] text-white/40 mt-0.5">{a.detail} · {a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/45 font-semibold mb-3">Notes</h4>
            <textarea placeholder="Add a note…" className="field min-h-[80px] resize-none"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateLeadModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ first:'', last:'', company:'', email:'', phone:'', interest:'AI Voice Agent', value:0, source:'inbound' });
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.first || !form.last || !form.email) return;
    onCreate({ ...form, value: Number(form.value) || 0 });
    setForm({ first:'', last:'', company:'', email:'', phone:'', interest:'AI Voice Agent', value:0, source:'inbound' });
  };

  return (
    <Modal open={open} onClose={onClose} title="New lead" maxWidth={500}>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="First name"><input className="field" value={form.first} onChange={e => u('first', e.target.value)}/></FormField>
        <FormField label="Last name"><input className="field" value={form.last} onChange={e => u('last', e.target.value)}/></FormField>
        <FormField label="Company" full><input className="field" value={form.company} onChange={e => u('company', e.target.value)}/></FormField>
        <FormField label="Email"><input className="field" type="email" value={form.email} onChange={e => u('email', e.target.value)}/></FormField>
        <FormField label="Phone"><input className="field" value={form.phone} onChange={e => u('phone', e.target.value)}/></FormField>
        <FormField label="Interest">
          <select className="field" value={form.interest} onChange={e => u('interest', e.target.value)}>
            {['AI Voice Agent','AI Power Dialer','CRM Automation','AI Receptionist','AI Websites','AI Video'].map(o => <option key={o}>{o}</option>)}
          </select>
        </FormField>
        <FormField label="Source">
          <select className="field" value={form.source} onChange={e => u('source', e.target.value)}>
            {['inbound','outbound','chatbot','website','referral'].map(o => <option key={o}>{o}</option>)}
          </select>
        </FormField>
        <FormField label="Estimated value" full><input className="field" type="number" value={form.value} onChange={e => u('value', e.target.value)}/></FormField>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button onClick={onClose} className="btn btn-ghost">Cancel</button>
        <button onClick={submit} className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>Create lead</button>
      </div>
    </Modal>
  );
}

function FormField({ label, full, children }) {
  return (
    <label className={`block ${full ? 'col-span-2' : ''}`}>
      <span className="text-[10.5px] uppercase tracking-widest text-white/45 font-semibold block mb-1.5">{label}</span>
      {children}
    </label>
  );
}

/* ─────────────────────────────────────────────────────
   PIPELINES (Kanban)
   ───────────────────────────────────────────────────── */
function Pipelines({ pushToast }) {
  const [deals, setDeals] = useState(() => JSON.parse(JSON.stringify(CC.pipelineDeals)));
  const [drag, setDrag] = useState(null);

  const move = (dealId, fromStage, toStage) => {
    if (fromStage === toStage) return;
    setDeals(curr => {
      const d = curr[fromStage].find(x => x.id === dealId);
      if (!d) return curr;
      return {
        ...curr,
        [fromStage]: curr[fromStage].filter(x => x.id !== dealId),
        [toStage]: [d, ...curr[toStage]],
      };
    });
    pushToast({ kind:'success', msg:`Moved deal to ${CC.stages.find(s => s.id === toStage).name}` });
  };

  const totalsByStage = CC.stages.reduce((acc, s) => {
    acc[s.id] = (deals[s.id] || []).reduce((sum, d) => sum + d.amount, 0);
    return acc;
  }, {});
  const totalValue = Object.values(totalsByStage).reduce((a,b) => a+b, 0);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Pipelines</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{fmtMoneyShort(totalValue)} across {Object.values(deals).flat().length} deals · drag to move</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost"><Filter className="w-3.5 h-3.5"/>Filter</button>
          <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New deal</button>
        </div>
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="grid grid-cols-5 gap-3 min-w-[1100px]">
          {CC.stages.map(s => (
            <div key={s.id} className="kanban-col"
                 onDragOver={e => e.preventDefault()}
                 onDrop={() => { if (drag) { move(drag.id, drag.from, s.id); setDrag(null); } }}>
              <div className="flex items-center justify-between px-1 py-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{background: s.color, boxShadow: `0 0 8px ${s.color}80`}}/>
                  <span className="text-[12px] text-white font-medium">{s.name}</span>
                  <span className="text-[10px] text-white/40 font-mono">{(deals[s.id] || []).length}</span>
                </div>
                <button className="btn-icon !w-6 !h-6"><Plus className="w-3 h-3"/></button>
              </div>
              <div className="text-[10.5px] text-white/40 px-1 mb-2 font-mono">{fmtMoneyShort(totalsByStage[s.id])}</div>
              <div className="space-y-2">
                {(deals[s.id] || []).map(d => (
                  <div key={d.id}
                       draggable
                       onDragStart={() => setDrag({ id: d.id, from: s.id })}
                       onDragEnd={() => setDrag(null)}
                       className="surface-2 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:bg-white/[0.06] transition">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-[12.5px] text-white font-medium leading-snug">{d.name}</div>
                      <button onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-white"><MoreH className="w-3.5 h-3.5"/></button>
                    </div>
                    <div className="font-display text-[18px] font-semibold text-white tracking-tight">{fmtMoneyShort(d.amount)}</div>
                    <div className="flex items-center justify-between mt-3">
                      <Avatar userId={d.owner} size="sm"/>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-white/45 font-mono">{d.prob}%</span>
                        <span className="text-[10px] text-white/30">·</span>
                        <span className="text-[10px] text-white/45">{d.age}d</span>
                      </div>
                    </div>
                    {/* Probability bar */}
                    <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${d.prob}%`, background: `linear-gradient(90deg, ${s.color} 0%, ${s.color}80 100%)` }}/>
                    </div>
                  </div>
                ))}
                {(deals[s.id] || []).length === 0 && (
                  <div className="text-center py-8 text-[11px] text-white/35 border border-dashed border-white/10 rounded-xl">
                    Drop deals here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   TASKS
   ───────────────────────────────────────────────────── */
function Tasks({ pushToast }) {
  const [tasks, setTasks] = useState(CC.tasks);
  const [filter, setFilter] = useState('all'); // all | overdue | today | mine | done
  const [createOpen, setCreateOpen] = useState(false);

  const toggle = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, status: x.status === 'done' ? 'todo' : 'done' } : x));

  const visible = useMemo(() => {
    return tasks.filter(t => {
      if (filter === 'overdue') return t.status === 'todo' && t.due === 'overdue';
      if (filter === 'today')   return t.status === 'todo' && t.due === 'today';
      if (filter === 'mine')    return t.status === 'todo' && t.owner === 'u1';
      if (filter === 'done')    return t.status === 'done';
      return t.status === 'todo';
    });
  }, [tasks, filter]);

  const counts = {
    all: tasks.filter(t => t.status === 'todo').length,
    overdue: tasks.filter(t => t.status === 'todo' && t.due === 'overdue').length,
    today: tasks.filter(t => t.status === 'todo' && t.due === 'today').length,
    mine: tasks.filter(t => t.status === 'todo' && t.owner === 'u1').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const filters = [
    { id:'all',     label:'All open' },
    { id:'overdue', label:'Overdue' },
    { id:'today',   label:'Today' },
    { id:'mine',    label:'My tasks' },
    { id:'done',    label:'Done' },
  ];

  const grouped = useMemo(() => {
    const groups = {};
    visible.forEach(t => {
      const k = t.due;
      if (!groups[k]) groups[k] = [];
      groups[k].push(t);
    });
    return groups;
  }, [visible]);

  const order = ['overdue', 'today', 'tomorrow', 'thu', 'done'];
  const labelFor = (k) => ({ overdue:'Overdue', today:'Today', tomorrow:'Tomorrow', thu:'Thursday', done:'Completed' }[k] || k);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Tasks</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{counts.all} open · {counts.overdue} overdue · {counts.done} done</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New task</button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
                  className={`tab ${filter === f.id ? 'active' : ''}`}>
            {f.label}
            <span className="ml-1.5 text-white/40 font-mono text-[10.5px]">{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {order.filter(k => grouped[k]?.length).map(group => (
          <div key={group}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-[11px] uppercase tracking-widest text-white/45 font-semibold">{labelFor(group)}</h3>
              <div className="flex-1 h-px bg-white/[0.06]"/>
              <span className="text-[10.5px] text-white/40 font-mono">{grouped[group].length}</span>
            </div>
            <div className="glass rim rounded-2xl divide-y divide-white/[0.05] overflow-hidden">
              {grouped[group].map(t => (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition">
                  <button onClick={() => toggle(t.id)} className={`chk ${t.status === 'done' ? 'on' : ''}`}><Check/></button>
                  <span className={`prio-dot prio-${t.priority}`}/>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] ${t.status === 'done' ? 'text-white/40 line-through' : 'text-white'}`}>{t.title}</div>
                    <div className="text-[10.5px] text-white/40 mt-0.5 flex items-center gap-2">
                      <span className={`badge badge-mute capitalize !py-0 !px-1.5`}>{t.tag}</span>
                      <span>{group === 'overdue' ? <span className="text-crimson-300">Overdue</span> : labelFor(group)}</span>
                    </div>
                  </div>
                  <Avatar userId={t.owner} size="sm"/>
                  <button className="btn-icon !w-7 !h-7"><MoreH className="w-3.5 h-3.5"/></button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="glass rim rounded-2xl py-16 text-center text-white/45 text-[13px]">
            <CircleCheck className="w-8 h-8 mx-auto mb-3 text-emerald-300"/>
            All clear — no tasks in this view.
          </div>
        )}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New task">
        <NewTaskForm onCreate={(t) => {
          setTasks(curr => [{ ...t, id:'t'+Math.random().toString(36).slice(2), status:'todo', owner:'u1' }, ...curr]);
          setCreateOpen(false);
          pushToast({ kind:'success', msg:'Task created' });
        }}/>
      </Modal>
    </div>
  );
}

function NewTaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [prio, setPrio] = useState('medium');
  const [due, setDue] = useState('today');
  return (
    <div className="space-y-3">
      <FormField label="Title" full><input autoFocus className="field" value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to happen?"/></FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Priority">
          <select className="field" value={prio} onChange={e => setPrio(e.target.value)}>
            <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
          </select>
        </FormField>
        <FormField label="Due">
          <select className="field" value={due} onChange={e => setDue(e.target.value)}>
            <option value="today">Today</option><option value="tomorrow">Tomorrow</option><option value="thu">Thursday</option>
          </select>
        </FormField>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={() => onCreate({ title, priority:prio, due, tag:'op' })} disabled={!title} className="btn btn-primary disabled:opacity-50">Create</button>
      </div>
    </div>
  );
}

Object.assign(window, { Overview, Leads, Pipelines, Tasks, fmtMoney, fmtMoneyShort, ScoreBadge });
