/* ─────────────────────────────────────────────────────
   AIATWORK Command Center — secondary & admin sections
   Companies · AI Interactions · Projects · Rep Hub · Leaderboard
   Integrations · Settings · Users · Workspaces · Logs · Requests
   ───────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────
   COMPANIES
   ───────────────────────────────────────────────────── */
function Companies() {
  const data = useMemo(() => {
    const map = {};
    CC.leads.forEach(l => {
      if (!map[l.company]) {
        map[l.company] = { name: l.company, leads: 0, value: 0, owner: l.owner, lastActivity: l.created };
      }
      map[l.company].leads += 1;
      map[l.company].value += l.value;
    });
    return Object.values(map).sort((a, b) => b.value - a.value);
  }, []);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Companies</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{data.length} accounts in pipeline</p>
        </div>
        <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New company</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map(c => (
          <div key={c.name} className="glass rim rounded-2xl p-5 hover:bg-white/[0.005] transition cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-400/25 to-crimson-700/0 border border-crimson-400/30 grid place-items-center text-crimson-300">
                <Building className="w-5 h-5"/>
              </div>
              <button className="btn-icon !w-7 !h-7"><MoreH className="w-3.5 h-3.5"/></button>
            </div>
            <h3 className="text-[14px] font-semibold text-white mb-1 truncate">{c.name}</h3>
            <div className="text-[11px] text-white/45 mb-4">{c.leads} lead{c.leads > 1 ? 's' : ''}</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Value</div>
                <div className="font-display text-[18px] text-white font-semibold">{fmtMoneyShort(c.value)}</div>
              </div>
              <Avatar userId={c.owner}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   AI INTERACTIONS
   ───────────────────────────────────────────────────── */
function AIInteractions() {
  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">AI Interactions</h2>
          <p className="text-[12px] text-white/45 mt-0.5">Every conversation — voice, chatbot, SMS</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost"><Filter className="w-3.5 h-3.5"/>Filter</button>
          <button className="btn btn-primary"><Sparkles className="w-3.5 h-3.5"/>Bulk analyze</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Total today"    value="0"   sub="—"               icon={Activity}/>
        <KpiCard label="Booked"          value="0"   sub="—"               icon={Calendar}/>
        <KpiCard label="Avg duration"    value="—"   sub="across channels" icon={Clock}/>
        <KpiCard label="Spend"           value="$0"  sub="$0.00 avg/call"  icon={DollarSign}/>
      </div>

      <div className="glass rim rounded-2xl py-20 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-crimson-400/15 to-crimson-700/0 border border-crimson-400/25 grid place-items-center text-crimson-300 mb-4">
          <Bot className="w-6 h-6"/>
        </div>
        <h3 className="font-display text-lg font-semibold text-white tracking-tight">No AI interactions yet</h3>
        <p className="text-[13px] text-white/55 mt-2 max-w-sm mx-auto leading-relaxed">
          Connect your voice agent and chatbot in <span className="text-white">Integrations</span> to start
          capturing live conversations here.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   PROJECTS
   ───────────────────────────────────────────────────── */
function Projects() {
  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Projects</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{CC.projects.length} client deployments in flight</p>
        </div>
        <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New project</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CC.projects.map(p => (
          <div key={p.id} className="glass rim rounded-2xl p-5 hover:bg-white/[0.005] transition">
            <div className="flex items-center justify-between mb-3">
              <span className={`badge ${p.status === 'review' ? 'badge-amber' : p.status === 'kickoff' ? 'badge-sky' : 'badge-violet'} capitalize`}>{p.status}</span>
              <button className="btn-icon !w-7 !h-7"><MoreH className="w-3.5 h-3.5"/></button>
            </div>
            <h3 className="font-display text-[15px] font-semibold text-white tracking-tight mb-1">{p.name}</h3>
            <div className="text-[11px] text-white/45 mb-4">Due {p.due}</div>

            <div className="mb-3">
              <div className="flex justify-between text-[10.5px] mb-1.5">
                <span className="text-white/55">Progress</span>
                <span className="text-white font-mono">{p.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-crimson-500 to-ember-500" style={{width: `${p.progress}%`}}/>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar userId={p.owner} size="sm"/>
                <span className="text-[11.5px] text-white/65">{getUser(p.owner)?.name}</span>
              </div>
              <div className="flex -space-x-1.5">
                {CC.team.slice(1, 4).map(u => <Avatar key={u.id} userId={u.id} size="sm"/>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   REP HUB
   ───────────────────────────────────────────────────── */
function RepHub() {
  return (
    <div className="fade-in space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Rep Hub</h2>
        <p className="text-[12px] text-white/45 mt-0.5">Your personalized command deck</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Calls"     value="0"  sub="No activity yet" icon={Phone}/>
        <KpiCard label="Connected" value="0"  sub="—"               icon={CircleCheck}/>
        <KpiCard label="Booked"    value="0"  sub="—"               icon={Calendar}/>
        <KpiCard label="Revenue"   value="$0" sub="—"               icon={DollarSign}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Your day" icon={Sparkles} className="lg:col-span-2">
          <div className="text-center py-10 text-white/45 text-[13px]">
            <Sparkles className="w-7 h-7 mx-auto mb-3 text-white/25"/>
            <div className="font-medium text-white/70 mb-1">Nothing scheduled</div>
            <div className="text-[12px]">Tasks and calls assigned to you will show here.</div>
          </div>
        </Card>
        <Card title="This week" icon={Trophy}>
          <div className="font-display text-[28px] text-white/40 font-semibold">0 / —</div>
          <div className="text-[11px] text-white/45 mb-3">no quota set</div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4"/>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[12px]"><span className="text-white/65">Rank</span><span className="text-white/35 font-mono">—</span></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-white/65">Streak</span><span className="text-white/35 font-mono">—</span></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-white/65">Best hour</span><span className="text-white/35 font-mono">—</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   LEADERBOARD
   ───────────────────────────────────────────────────── */
function Leaderboard() {
  const [range, setRange] = useState('week');
  const reps = CC.reps;

  if (!reps.length) {
    return (
      <div className="fade-in space-y-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Leaderboard</h2>
          <p className="text-[12px] text-white/45 mt-0.5">Who's closing this {range}</p>
        </div>
        <div className="glass rim rounded-2xl py-20 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-crimson-400/15 to-crimson-700/0 border border-crimson-400/25 grid place-items-center text-crimson-300 mb-4">
            <Trophy className="w-6 h-6"/>
          </div>
          <h3 className="font-display text-lg font-semibold text-white tracking-tight">No closes yet</h3>
          <p className="text-[13px] text-white/55 mt-2 max-w-sm mx-auto leading-relaxed">
            Standings appear here once your team starts closing deals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Leaderboard</h2>
          <p className="text-[12px] text-white/45 mt-0.5">Who's closing this {range}</p>
        </div>
        <div className="flex gap-1">
          {['day','week','month','quarter'].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`tab ${range === r ? 'active' : ''} capitalize`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="glass-strong rim rounded-3xl p-8 relative overflow-hidden">
        <div className="fluid-mesh"/>
        <div className="relative grid grid-cols-3 gap-4 items-end">
          {[reps[1], reps[0], reps[2]].map((r, i) => {
            const places = [2, 1, 3];
            const heights = ['h-32', 'h-44', 'h-24'];
            const place = places[i];
            return (
              <div key={r.id} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <Avatar userId={r.id} size="lg"/>
                    {place === 1 && <span className="absolute -top-2 -right-2 text-base">👑</span>}
                  </div>
                </div>
                <div className="text-[13px] text-white font-semibold">{r.name}</div>
                <div className="text-[10.5px] text-white/45 mb-3">{fmtMoneyShort(r.rev)}</div>
                <div className={`${heights[i]} rounded-t-2xl ${place === 1 ? 'bg-gradient-to-t from-crimson-600 to-crimson-400' : place === 2 ? 'bg-gradient-to-t from-ink-600 to-ink-500' : 'bg-gradient-to-t from-ink-700 to-ink-600'} flex items-start justify-center pt-3 border-t border-l border-r border-white/10`}>
                  <div className={`font-display ${place === 1 ? 'text-[36px]' : 'text-[28px]'} font-semibold ${place === 1 ? 'text-white' : 'text-white/70'}`}>#{place}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Card title="Full standings" icon={Trophy}>
        <div className="space-y-2">
          {reps.map((r, i) => (
            <div key={r.id} className="flex items-center gap-3 surface-1 rounded-lg p-3">
              <div className={`font-display text-[16px] w-6 text-center ${i === 0 ? 'text-fluid' : 'text-white/40'} font-semibold`}>#{i+1}</div>
              <Avatar userId={r.id}/>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-white">{r.name}</div>
                <div className="text-[10.5px] text-white/45">{r.calls} calls · {r.booked} booked · {r.closed} closed</div>
              </div>
              <div className="flex-1 max-w-[180px]">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-crimson-500 to-ember-500" style={{width:`${(r.rev/268400)*100}%`}}/>
                </div>
              </div>
              <div className="text-right w-24">
                <div className="font-display text-[15px] text-white font-semibold">{fmtMoneyShort(r.rev)}</div>
                <div className={`text-[10px] ${r.change > 0 ? 'text-emerald-300' : 'text-crimson-300'} flex items-center justify-end gap-0.5`}>
                  {r.change > 0 ? <ArrowUp className="w-2.5 h-2.5"/> : <ArrowDown className="w-2.5 h-2.5"/>}{Math.abs(r.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   INTEGRATIONS
   ───────────────────────────────────────────────────── */
function Integrations({ pushToast }) {
  const [items, setItems] = useState(CC.integrations);
  const [filter, setFilter] = useState('all');

  const visible = items.filter(i => filter === 'all' ? true : i.status === filter);

  const toggle = (id) => {
    setItems(curr => curr.map(i => i.id === id ? { ...i, status: i.status === 'connected' ? 'disconnected' : 'connected' } : i));
    pushToast({ kind:'success', msg:'Integration updated' });
  };

  const counts = {
    all: items.length,
    connected: items.filter(i => i.status === 'connected').length,
    disconnected: items.filter(i => i.status === 'disconnected').length,
    error: items.filter(i => i.status === 'error').length,
  };

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Integrations</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{counts.connected} active · {counts.error} need attention</p>
        </div>
        <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>Add integration</button>
      </div>

      <div className="flex gap-2">
        {[['all','All'],['connected','Connected'],['disconnected','Inactive'],['error','Errors']].map(([id,label]) => (
          <button key={id} onClick={() => setFilter(id)} className={`tab ${filter === id ? 'active' : ''}`}>
            {label} <span className="ml-1.5 text-white/40 font-mono text-[10.5px]">{counts[id]}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {visible.map(it => (
          <div key={it.id} className="glass rim rounded-2xl p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/8 to-white/0 border border-white/8 grid place-items-center text-white">
                <Database className="w-4 h-4"/>
              </div>
              <StatusBadge status={it.status}/>
            </div>
            <h3 className="font-display text-[15px] font-semibold text-white tracking-tight">{it.name}</h3>
            <div className="text-[10.5px] uppercase tracking-widest text-white/40 mt-0.5">{it.cat}</div>
            <p className="text-[11.5px] text-white/55 mt-3 flex-1 leading-relaxed">{it.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10.5px] text-white/40">Synced {it.last}</span>
              <div className="flex gap-1.5">
                <button className="btn-icon !w-7 !h-7"><Settings className="w-3 h-3"/></button>
                <button onClick={() => toggle(it.id)} className="btn btn-ghost !py-1.5 !px-3 !text-[11px]">
                  {it.status === 'connected' ? <><PhoneOff className="w-3 h-3"/>Disconnect</> : <><Plus className="w-3 h-3"/>Connect</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SETTINGS
   ───────────────────────────────────────────────────── */
function SettingsSection({ pushToast }) {
  const [tab, setTab] = useState('workspace');
  const tabs = [
    { id:'workspace', label:'Workspace' },
    { id:'profile',   label:'Profile'   },
    { id:'security',  label:'Security'  },
    { id:'billing',   label:'Billing'   },
    { id:'voice',     label:'Voice Agent' },
    { id:'notifications', label:'Notifications' },
  ];

  return (
    <div className="fade-in space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Settings</h2>
        <p className="text-[12px] text-white/45 mt-0.5">Workspace and account configuration</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3 glass rim rounded-2xl p-2 h-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`nav-item w-full text-left ${tab === t.id ? 'active' : ''}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-9 glass rim rounded-2xl p-6">
          {tab === 'workspace' && <SettingsWorkspace pushToast={pushToast}/>}
          {tab === 'profile'   && <SettingsProfile pushToast={pushToast}/>}
          {tab === 'security'  && <SettingsSecurity pushToast={pushToast}/>}
          {tab === 'billing'   && <SettingsBilling/>}
          {tab === 'voice'     && <SettingsVoice pushToast={pushToast}/>}
          {tab === 'notifications' && <SettingsNotifs/>}
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, sub, children }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-white/[0.04]">
      <div className="flex-1">
        <div className="text-[13px] text-white font-medium">{label}</div>
        {sub && <div className="text-[11.5px] text-white/45 mt-0.5">{sub}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} className={`w-9 h-5 rounded-full transition-colors relative ${on ? 'bg-crimson-500' : 'bg-white/10'}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`}/>
    </button>
  );
}

function SettingsWorkspace({ pushToast }) {
  const [name, setName] = useState('AIATWORK');
  const [domain, setDomain] = useState('theaiatwork.com');
  return (
    <div>
      <h3 className="font-display text-[15px] font-semibold text-white mb-4">Workspace</h3>
      <SettingRow label="Workspace name" sub="Displayed across the product and emails">
        <input className="field w-[240px]" value={name} onChange={e => setName(e.target.value)}/>
      </SettingRow>
      <SettingRow label="Primary domain" sub="Used for SSO and email">
        <input className="field w-[240px]" value={domain} onChange={e => setDomain(e.target.value)}/>
      </SettingRow>
      <SettingRow label="Default lead owner" sub="New unassigned leads route here">
        <select className="field w-[240px]"><option>Priya Shah</option><option>Round-robin</option></select>
      </SettingRow>
      <SettingRow label="Brand color" sub="Used in client-facing portals">
        <div className="flex gap-2">
          {['#3B82F6','#22D3EE','#A78BFA','#38BDF8','#10B981'].map((c, i) => (
            <button key={c} className={`w-7 h-7 rounded-lg border-2 ${i===0 ? 'border-white' : 'border-transparent'}`} style={{background: c}}/>
          ))}
        </div>
      </SettingRow>
      <div className="flex justify-end mt-5">
        <button onClick={() => pushToast({kind:'success', msg:'Workspace saved'})} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  );
}

function SettingsProfile({ pushToast }) {
  return (
    <div>
      <h3 className="font-display text-[15px] font-semibold text-white mb-4">Your profile</h3>
      <div className="flex items-center gap-4 pb-5 mb-3 border-b border-white/[0.04]">
        <div className="avatar avatar-lg avatar-1" style={{width:64, height:64, fontSize:20}}>AM</div>
        <div>
          <button className="btn btn-ghost !py-1.5 !text-[11.5px]">Upload photo</button>
          <div className="text-[10.5px] text-white/40 mt-1.5">JPG or PNG · max 2MB</div>
        </div>
      </div>
      <SettingRow label="Full name"><input className="field w-[240px]" defaultValue="Alex Morgan"/></SettingRow>
      <SettingRow label="Email"><input className="field w-[240px]" defaultValue="alex@aiatwork.com"/></SettingRow>
      <SettingRow label="Phone"><input className="field w-[240px]" defaultValue="(703) 826-4327"/></SettingRow>
      <SettingRow label="Role"><select className="field w-[240px]"><option>Superadmin</option><option>Admin</option><option>Rep</option></select></SettingRow>
      <div className="flex justify-end mt-5">
        <button onClick={() => pushToast({kind:'success', msg:'Profile saved'})} className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}

function SettingsSecurity({ pushToast }) {
  const [mfa, setMfa] = useState(true);
  const [sso, setSso] = useState(false);
  return (
    <div>
      <h3 className="font-display text-[15px] font-semibold text-white mb-4">Security</h3>
      <SettingRow label="Two-factor authentication" sub="Required for admin accounts"><Toggle on={mfa} onChange={setMfa}/></SettingRow>
      <SettingRow label="Single sign-on" sub="SAML 2.0 · Google Workspace"><Toggle on={sso} onChange={setSso}/></SettingRow>
      <SettingRow label="Active sessions" sub="Sign out all other devices">
        <button className="btn btn-ghost !text-crimson-300">Sign out other sessions</button>
      </SettingRow>
      <SettingRow label="Password" sub="Last changed 28 days ago">
        <button className="btn btn-ghost">Change password</button>
      </SettingRow>
      <div className="surface-1 rounded-xl p-4 mt-5 flex items-center gap-3">
        <Shield className="w-5 h-5 text-emerald-300"/>
        <div className="flex-1">
          <div className="text-[12.5px] text-white">SOC 2 Type II compliant · audit log enabled</div>
          <div className="text-[10.5px] text-white/45">Last audit: April 2026</div>
        </div>
        <button className="btn btn-ghost !text-[11px]">View report</button>
      </div>
    </div>
  );
}

function SettingsBilling() {
  return (
    <div>
      <h3 className="font-display text-[15px] font-semibold text-white mb-4">Billing</h3>
      <div className="surface-2 rounded-2xl p-5 mb-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[10.5px] uppercase tracking-widest text-white/40">Current plan</div>
            <div className="font-display text-2xl text-white font-semibold mt-1">Enterprise · Trial</div>
          </div>
          <span className="badge badge-amber">Trial</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            ['Seats',     `${CC.team.length} / 25`],
            ['MTD spend', '$0.00'],
            ['Renews',    '—'],
          ].map(([l, v]) => (
            <div key={l}>
              <div className="text-[10px] uppercase tracking-wider text-white/40">{l}</div>
              <div className="text-[13px] text-white font-semibold mt-0.5">{v}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button className="btn btn-primary !py-1.5 !px-3 !text-[11.5px]">Upgrade</button>
          <button className="btn btn-ghost !py-1.5 !px-3 !text-[11.5px]">Manage seats</button>
        </div>
      </div>

      <div className="glass rim rounded-2xl py-12 text-center">
        <DollarSign className="w-8 h-8 mx-auto mb-3 text-white/25"/>
        <h4 className="font-display text-base font-semibold text-white">No invoices yet</h4>
        <p className="text-[12px] text-white/55 mt-1.5">Your first invoice will appear here once your trial concludes.</p>
      </div>
    </div>
  );
}

function SettingsVoice({ pushToast }) {
  const [voice, setVoice] = useState('nova');
  return (
    <div>
      <h3 className="font-display text-[15px] font-semibold text-white mb-4">Voice Agent</h3>
      <SettingRow label="Voice" sub="Used for outbound and reception">
        <select value={voice} onChange={e => setVoice(e.target.value)} className="field w-[240px]">
          <option value="nova">Nova · warm, professional</option>
          <option value="atlas">Atlas · confident, baritone</option>
          <option value="luna">Luna · upbeat, friendly</option>
        </select>
      </SettingRow>
      <SettingRow label="Latency target" sub="Lower = more interruptions; higher = more pauses">
        <select className="field w-[240px]"><option>250ms · responsive</option><option>500ms · natural</option></select>
      </SettingRow>
      <SettingRow label="Knowledge base" sub="Documents Jarvis uses for context">
        <button className="btn btn-ghost">Upload docs</button>
      </SettingRow>
      <SettingRow label="Greeting" sub="First message on inbound calls">
        <textarea className="field w-[280px] min-h-[60px]" defaultValue="Hi, thanks for calling AIATWORK. How can I help?"/>
      </SettingRow>
      <div className="surface-1 rounded-xl p-4 mt-5">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-400 to-crimson-700 grid place-items-center text-white"><Play className="w-3.5 h-3.5"/></button>
          <div className="flex-1">
            <div className="text-[12.5px] text-white">Preview greeting</div>
            <div className="text-[10.5px] text-white/45">Hear how Nova sounds before going live</div>
          </div>
          <button onClick={() => pushToast({msg:'Sample queued'})} className="btn btn-ghost !text-[11px]">Play</button>
        </div>
      </div>
    </div>
  );
}

function SettingsNotifs() {
  const [notifs, setNotifs] = useState({ email:true, browser:true, mobile:false, daily:true, weekly:true });
  return (
    <div>
      <h3 className="font-display text-[15px] font-semibold text-white mb-4">Notifications</h3>
      {[
        ['email',   'Email notifications',   'Hot leads, mentions, daily digest'],
        ['browser', 'Browser push',          'Live in-product alerts'],
        ['mobile',  'Mobile push',           'iOS and Android'],
        ['daily',   'Daily digest',          'Pipeline + tasks summary at 8am'],
        ['weekly',  'Weekly report',         'Monday morning performance report'],
      ].map(([k, l, s]) => (
        <SettingRow key={k} label={l} sub={s}>
          <Toggle on={notifs[k]} onChange={v => setNotifs(n => ({ ...n, [k]: v }))}/>
        </SettingRow>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   USER MANAGEMENT
   ───────────────────────────────────────────────────── */
function UserManagement({ pushToast }) {
  const [team, setTeam] = useState(CC.team);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">User Management</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{team.length} members · 7 of 25 seats</p>
        </div>
        <button onClick={() => setInviteOpen(true)} className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>Invite</button>
      </div>

      <div className="glass rim rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="tbl">
          <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Last active</th><th>2FA</th><th style={{width:40}}/></tr></thead>
          <tbody>
            {team.map(u => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar userId={u.id}/>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-ink-950 ${u.status === 'online' ? 'bg-emerald-400' : u.status === 'away' ? 'bg-amber-400' : 'bg-white/20'}`}/>
                    </div>
                    <div>
                      <div className="text-white">{u.name}</div>
                      <div className="text-[10.5px] text-white/40">{u.id === 'u1' ? 'alex@aiatwork.com' : u.name.split(' ')[0].toLowerCase() + '@aiatwork.com'}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <select defaultValue={u.role} className="field !py-1 !text-[11px] !pr-2">
                    <option>Founder</option><option>Admin</option><option>Head of Sales</option><option>AE</option><option>SDR</option><option>Ops</option>
                  </select>
                </td>
                <td><span className={`badge ${u.status === 'online' ? 'badge-emerald' : u.status === 'away' ? 'badge-amber' : 'badge-mute'} capitalize`}>{u.status}</span></td>
                <td className="text-white/55">{u.status === 'online' ? 'now' : '2 hr ago'}</td>
                <td>{u.id === 'u1' || u.id === 'u2' ? <CircleCheck className="w-4 h-4 text-emerald-300"/> : <X className="w-4 h-4 text-white/30"/>}</td>
                <td><button className="btn-icon !w-7 !h-7"><MoreH className="w-3.5 h-3.5"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite team member">
        <div className="space-y-3">
          <FormField label="Email" full><input className="field" placeholder="teammate@company.com"/></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Role"><select className="field"><option>Rep</option><option>Admin</option><option>AE</option></select></FormField>
            <FormField label="Workspace"><select className="field"><option>AIATWORK</option></select></FormField>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setInviteOpen(false)} className="btn btn-ghost">Cancel</button>
            <button onClick={() => { setInviteOpen(false); pushToast({kind:'success', msg:'Invite sent'}); }} className="btn btn-primary"><Send className="w-3.5 h-3.5"/>Send invite</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   WORKSPACES
   ───────────────────────────────────────────────────── */
function Workspaces() {
  const workspaces = [
    { id:'w1', name:'AIATWORK', members: CC.team.length, plan:'Enterprise', current:true, storage:0 },
  ];

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Workspaces</h2>
          <p className="text-[12px] text-white/45 mt-0.5">Manage tenants and client environments</p>
        </div>
        <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New workspace</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {workspaces.map(w => (
          <div key={w.id} className={`glass rim rounded-2xl p-5 ${w.current ? 'ring-1 ring-crimson-500/40' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="logo-mark"/>
              {w.current && <span className="badge badge-crimson">Current</span>}
            </div>
            <h3 className="font-display text-base font-semibold text-white">{w.name}</h3>
            <div className="text-[11px] text-white/45 mt-1">{w.plan} · {w.members} members</div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[10.5px] mb-1">
                <span className="text-white/45">Storage</span>
                <span className="text-white/70 font-mono">{w.storage}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-crimson-500 to-ember-500" style={{width:`${w.storage}%`}}/>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn btn-ghost !py-1.5 !text-[11px] flex-1">{w.current ? 'Manage' : 'Switch'}</button>
              <button className="btn-icon !w-8 !h-8"><Settings className="w-3.5 h-3.5"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SYSTEM LOGS
   ───────────────────────────────────────────────────── */
function SystemLogs() {
  const [level, setLevel] = useState('all');
  const logs = CC.logs;
  const visible = logs.filter(l => level === 'all' ? true : l.level === level);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">System Logs</h2>
          <p className="text-[12px] text-white/45 mt-0.5 flex items-center gap-2">
            <span className={`pulse-dot ${logs.length ? 'pulse-dot-emerald' : ''}`}/>
            {logs.length ? `Streaming · ${visible.length} entries` : 'No live source connected'}
          </p>
        </div>
        <div className="flex gap-1">
          {['all','info','warn','error'].map(l => (
            <button key={l} onClick={() => setLevel(l)} className={`tab ${level === l ? 'active' : ''} capitalize`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="glass rim rounded-2xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="py-20 text-center">
            <Activity className="w-8 h-8 mx-auto mb-3 text-white/25"/>
            <h3 className="font-display text-base font-semibold text-white">Log stream is quiet</h3>
            <p className="text-[12px] text-white/55 mt-2 max-w-sm mx-auto">Connect a backend service in Integrations to start receiving live events.</p>
          </div>
        ) : (
          <div className="font-mono text-[11.5px] divide-y divide-white/[0.04]">
            {visible.map(l => (
              <div key={l.id} className="flex items-center gap-3 px-4 py-2 hover:bg-white/[0.02]">
                <span className="text-white/35 w-20 shrink-0">{l.time}</span>
                <span className={`badge ${l.level === 'error' ? 'badge-crimson' : l.level === 'warn' ? 'badge-amber' : 'badge-mute'} w-14 justify-center !font-mono`}>{l.level}</span>
                <span className="text-crimson-300/80 w-32 shrink-0 truncate">{l.src}</span>
                <span className="text-white/80 flex-1 truncate">{l.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ACCOUNT REQUESTS
   ───────────────────────────────────────────────────── */
function AccountRequests({ pushToast }) {
  const [requests, setRequests] = useState(CC.requests);

  const approve = (id) => {
    setRequests(curr => curr.filter(r => r.id !== id));
    pushToast({ kind:'success', msg:'Account approved · invite sent' });
  };
  const deny = (id) => {
    setRequests(curr => curr.filter(r => r.id !== id));
    pushToast({ msg:'Request denied' });
  };

  return (
    <div className="fade-in space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Account Requests</h2>
        <p className="text-[12px] text-white/45 mt-0.5">{requests.length} pending</p>
      </div>

      <div className="space-y-3">
        {requests.map(r => (
          <div key={r.id} className="glass rim rounded-2xl p-5 flex items-start gap-4">
            <div className="avatar avatar-lg avatar-3">{r.name.split(' ').map(p=>p[0]).join('')}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[13.5px] text-white font-semibold">{r.name}</div>
                <span className="badge badge-mute capitalize">{r.role}</span>
              </div>
              <div className="text-[11.5px] text-white/55 mb-2">{r.email}</div>
              <p className="text-[12.5px] text-white/75 leading-relaxed surface-1 rounded-lg p-3">"{r.reason}"</p>
              <div className="text-[10.5px] text-white/40 mt-2">Requested {r.date}</div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={() => approve(r.id)} className="btn btn-primary !py-1.5 !px-3 !text-[11px]"><Check className="w-3 h-3"/>Approve</button>
              <button onClick={() => deny(r.id)} className="btn btn-ghost !py-1.5 !px-3 !text-[11px]"><X className="w-3 h-3"/>Deny</button>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <div className="glass rim rounded-2xl py-16 text-center text-white/45 text-[13px]">
            <CircleCheck className="w-8 h-8 mx-auto mb-3 text-emerald-300"/>
            No pending requests.
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  Companies, AIInteractions, Projects, RepHub, Leaderboard,
  Integrations, SettingsSection, UserManagement, Workspaces,
  SystemLogs, AccountRequests,
});
