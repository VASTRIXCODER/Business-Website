/* AIATWORK Command Center — Leads section (LeadHunter API)
   Backed by https://leadhunter-production-b3a8.up.railway.app
   Overwrites window.Leads after sections.jsx loads.
   ──────────────────────────────────────────────────────── */

/* ─ Lead status helper (score-based) ─────────────────── */
function leadHotness(score) {
  if (score >= 85) return { cls:'badge-crimson', label:'Fire' };
  if (score >= 75) return { cls:'badge-crimson', label:'Hot' };
  if (score >= 60) return { cls:'badge-ember',   label:'Warm' };
  if (score >= 40) return { cls:'badge-amber',   label:'Qualified' };
  return            { cls:'badge-mute',    label:'Cold' };
}

/* ─ Industry icon helper ─────────────────────────────── */
function leadIcon(lead) {
  return lead.industry_icon || '🏢';
}

/* ─ Score ring (visual chip) ─────────────────────────── */
function ScoreRing({ score, size = 36 }) {
  const s = score || 0;
  const r = (size - 6) / 2;
  const C = 2 * Math.PI * r;
  const offset = C - (s / 100) * C;
  const color = s >= 75 ? '#60A5FA' : s >= 50 ? '#22D3EE' : '#6B7280';
  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="block">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="3"
                strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
                transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono font-semibold text-white" style={{ fontSize: size * 0.32 }}>{s}</span>
    </div>
  );
}

/* ─ Scrape status banner ─────────────────────────────── */
function ScrapeBanner({ state, onStop }) {
  if (!state || !state.running) return null;
  return (
    <div className="surface-2 rounded-2xl p-4 flex items-center gap-4 border-crimson-500/25 fade-in" style={{borderColor:'rgba(244,63,94,0.25)'}}>
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-crimson-500/15 border border-crimson-500/30 grid place-items-center text-crimson-300">
          <Globe className="w-4 h-4"/>
        </div>
        <span className="absolute -top-0.5 -right-0.5 pulse-dot"/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] text-white font-semibold">Live scrape running</span>
          {state.current_location && (
            <span className="text-[10.5px] text-crimson-300 font-mono">📍 {state.current_location}</span>
          )}
        </div>
        <div className="text-[11.5px] text-white/55 truncate">{state.message}</div>
        <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-crimson-500 to-ember-500 transition-[width] duration-500"
               style={{ width: `${state.pct || 0}%` }}/>
        </div>
        <div className="flex justify-between text-[10px] text-white/40 font-mono mt-1.5">
          <span>{state.leads_this_run || 0} leads · {state.no_website_this_run || 0} no-website</span>
          <span>{state.pct || 0}%</span>
        </div>
      </div>
      <button onClick={onStop} className="btn btn-ghost !text-crimson-300 !text-[11.5px]"><X className="w-3 h-3"/>Stop</button>
    </div>
  );
}

/* ─ Assign dropdown ─────────────────────────────────── */
function AssignPicker({ value, onPick, compact }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);
  const owner = value ? getUser(value) : null;

  return (
    <div className="relative" ref={ref}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
              className={compact
                ? 'flex items-center gap-1.5 hover:bg-white/[0.04] rounded-md px-1 py-0.5 -mx-1 transition'
                : 'btn btn-ghost !py-1.5 !text-[11.5px]'}>
        {owner ? (
          <>
            <Avatar userId={owner.id} size="sm"/>
            {!compact && <span>{owner.name.split(' ')[0]}</span>}
          </>
        ) : (
          <>
            <span className="w-5 h-5 rounded-full border border-dashed border-white/20 grid place-items-center text-white/35">
              <Plus className="w-2.5 h-2.5"/>
            </span>
            {!compact && <span>Assign</span>}
          </>
        )}
        {!compact && <ChevronDown className="w-2.5 h-2.5"/>}
      </button>
      {open && (
        <div className="absolute right-0 mt-1.5 w-[220px] glass-strong rim rounded-xl p-1.5 z-40 fade-in">
          {value && (
            <button onClick={(e) => { e.stopPropagation(); onPick(null); setOpen(false); }}
                    className="w-full flex items-center gap-2 p-2 rounded-md text-[12px] text-white/65 hover:bg-white/[0.05]">
              <span className="w-5 h-5 rounded-full border border-dashed border-white/20 grid place-items-center text-white/35">
                <X className="w-2.5 h-2.5"/>
              </span>
              <span className="flex-1 text-left">Unassign</span>
            </button>
          )}
          {CC.team.map(u => (
            <button key={u.id} onClick={(e) => { e.stopPropagation(); onPick(u.id); setOpen(false); }}
                    className="w-full flex items-center gap-2 p-2 rounded-md text-[12px] text-white/85 hover:bg-white/[0.05]">
              <Avatar userId={u.id} size="sm"/>
              <div className="flex-1 text-left">
                <div className="text-white">{u.name}</div>
                <div className="text-[10px] text-white/40">{u.role}</div>
              </div>
              {value === u.id && <Check className="w-3 h-3 text-crimson-300"/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─ Lead drawer ──────────────────────────────────────── */
function LHLeadDrawer({ lead, owner, onClose, onAssign }) {
  if (!lead) return null;
  const hot = leadHotness(lead.opp_score || 0);
  const hours = (lead.opening_hours || '').split(' | ').filter(Boolean);
  const signals = lead.signals || [];

  return (
    <div className="fixed inset-0 z-[120]" role="dialog">
      <div className="absolute inset-0 bg-ink-950/65 backdrop-blur-sm" onClick={onClose}/>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[480px] glass-strong border-l border-white/10 overflow-y-auto thin-scroll fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-ink-950/85 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-crimson-400/25 to-crimson-700/0 border border-crimson-400/30 grid place-items-center text-xl shrink-0">
              {leadIcon(lead)}
            </div>
            <div className="min-w-0">
              <div className="font-display text-base font-semibold text-white truncate">{lead.name}</div>
              <div className="text-[11px] text-white/45 truncate">{[lead.industry, lead.city, lead.state].filter(Boolean).join(' · ')}</div>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon shrink-0"><X className="w-3.5 h-3.5"/></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Score block */}
          <div className="surface-1 rounded-2xl p-4 flex items-center gap-4">
            <ScoreRing score={lead.opp_score || 0} size={64}/>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Opportunity score</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`badge ${hot.cls}`}>{hot.label}</span>
                {!lead.website_live && <span className="badge badge-amber">No website</span>}
                {lead.business_status === 'OPERATIONAL' && <span className="badge badge-emerald">Open</span>}
              </div>
            </div>
          </div>

          {/* Primary actions */}
          <div className="grid grid-cols-2 gap-2">
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="btn btn-primary !justify-center"><Phone className="w-3.5 h-3.5"/>Call</a>
            )}
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="btn btn-ghost !justify-center"><Mail className="w-3.5 h-3.5"/>Email</a>
            )}
            {lead.website_url && (
              <a href={lead.website_url} target="_blank" rel="noopener" className="btn btn-ghost !justify-center"><Globe className="w-3.5 h-3.5"/>Website</a>
            )}
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.address || lead.name)}`}
               target="_blank" rel="noopener" className="btn btn-ghost !justify-center"><Eye className="w-3.5 h-3.5"/>Maps</a>
          </div>

          {/* Detail rows */}
          <div className="surface-1 rounded-xl p-4 space-y-2.5">
            <DetailRow k="Owner">
              <AssignPicker value={owner} onPick={onAssign}/>
            </DetailRow>
            {[
              ['Phone',     lead.phone],
              ['Email',     lead.email],
              ['Website',   lead.website_url],
              ['Live site', lead.website_live ? '✓ Yes' : '✗ No'],
              ['Domain',    lead.domain_exists ? '✓ Registered' : '✗ Not registered'],
              ['Address',   lead.address],
              ['City',      lead.city],
              ['State',     lead.state],
              ['Zip',       lead.zip_code],
              ['Rating',    lead.rating ? `★ ${lead.rating.toFixed(1)} (${(lead.review_count || 0).toLocaleString()})` : null],
              ['Price',     lead.price_level ? '$'.repeat(lead.price_level) : null],
              ['~Staff',    lead.employee_est],
              ['Status',    lead.business_status],
              ['Source',    lead.source],
              ['Scraped',   lead.scraped_at ? new Date(lead.scraped_at).toLocaleDateString() : null],
            ].filter(([_, v]) => v != null && v !== '').map(([k, v]) => (
              <DetailRow key={k} k={k}><span className="text-[12.5px] text-white font-mono text-right truncate max-w-[260px] block">{v}</span></DetailRow>
            ))}
          </div>

          {/* Description */}
          {lead.description && (
            <Section title="About">
              <p className="text-[12.5px] text-white/80 leading-relaxed surface-1 rounded-xl p-3">{lead.description}</p>
            </Section>
          )}

          {/* Hours */}
          {hours.length > 0 && (
            <Section title="Hours">
              <div className="surface-1 rounded-xl p-3 grid grid-cols-1 gap-1 font-mono text-[11.5px] text-white/70">
                {hours.map((h, i) => <div key={i}>{h}</div>)}
              </div>
            </Section>
          )}

          {/* Signals */}
          {signals.length > 0 && (
            <Section title={`Lead signals (${signals.length})`}>
              <div className="space-y-1.5">
                {signals.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 surface-1 rounded-lg px-3 py-2 text-[12px] text-white/85">
                    <Check className="w-3 h-3 text-crimson-300 shrink-0"/>{s}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ k, children }) {
  return (
    <div className="flex items-start justify-between gap-3 text-[12.5px]">
      <span className="text-white/45 w-20 shrink-0">{k}</span>
      <div className="flex-1 text-right min-w-0">{children}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-widest text-white/45 font-semibold mb-2.5">{title}</h4>
      {children}
    </div>
  );
}

/* ─ Scrape modal ─────────────────────────────────────── */
const PRESET_CITIES = [
  'New York, NY','Los Angeles, CA','Chicago, IL','Houston, TX','Phoenix, AZ',
  'Philadelphia, PA','San Antonio, TX','San Diego, CA','Dallas, TX','San Jose, CA',
  'Austin, TX','Seattle, WA','Denver, CO','Boston, MA','Atlanta, GA',
  'Miami, FL','Reston, VA','Washington, DC','Nashville, TN','Portland, OR',
];

function ScrapeModal({ open, onClose, onStarted, pushToast }) {
  const [locations, setLocations] = useState(['Reston, VA']);
  const [locInput, setLocInput] = useState('');
  const [industries, setIndustries] = useState({ grouped: {}, flat: [] });
  const [selectedInds, setSelectedInds] = useState(new Set());
  const [radius, setRadius] = useState(15);
  const [apiKey, setApiKey] = useState('');
  const [continuous, setContinuous] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!open) return;
    LH.industries().then(setIndustries).catch(() => {});
  }, [open]);

  const addLocation = (val) => {
    const v = (val || locInput).trim();
    if (!v || locations.includes(v)) return;
    setLocations(prev => [...prev, v]);
    setLocInput('');
  };
  const removeLocation = (i) => setLocations(prev => prev.filter((_, idx) => idx !== i));

  const toggleInd = (name) => setSelectedInds(s => {
    const next = new Set(s);
    next.has(name) ? next.delete(name) : next.add(name);
    return next;
  });

  const start = async () => {
    if (!locations.length) { pushToast({ kind:'error', msg:'Add at least one location' }); return; }
    setStarting(true);
    try {
      await LH.scrapeStart({
        locations,
        industries: [...selectedInds],
        radius_mi: Number(radius) || 15,
        api_key: apiKey || null,
        continuous,
        interval_h: 6,
      });
      pushToast({ kind:'success', msg:`Scraping ${locations.length} location${locations.length > 1 ? 's' : ''}…` });
      onStarted();
      onClose();
    } catch (e) {
      pushToast({ kind:'error', msg: e.message || 'Failed to start scrape' });
    } finally { setStarting(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Find new leads" maxWidth={560}>
      {/* Locations */}
      <div className="space-y-2">
        <div className="text-[10.5px] uppercase tracking-widest text-white/45 font-semibold">Locations</div>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc, i) => (
            <span key={i} className="flex items-center gap-1.5 surface-1 rounded-lg px-2.5 py-1 text-[12px] text-white font-mono">
              <span>{loc}</span>
              <button onClick={() => removeLocation(i)} className="text-white/40 hover:text-crimson-300"><X className="w-3 h-3"/></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={locInput} onChange={e => setLocInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addLocation())}
                 placeholder="City, State (e.g. Austin, TX)"
                 className="field flex-1"/>
          <button onClick={() => addLocation()} className="btn btn-ghost"><Plus className="w-3.5 h-3.5"/>Add</button>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PRESET_CITIES.map(c => (
            <button key={c} onClick={() => addLocation(c)}
                    className={`text-[10.5px] px-2 py-1 rounded-md border transition ${
                      locations.includes(c)
                        ? 'border-crimson-500/40 bg-crimson-500/10 text-crimson-300'
                        : 'border-white/8 bg-white/[0.025] text-white/55 hover:text-white hover:bg-white/[0.05]'}`}>
              {c.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="mt-5 space-y-2">
        <div className="text-[10.5px] uppercase tracking-widest text-white/45 font-semibold flex items-center justify-between">
          <span>Industries</span>
          <span className="text-crimson-300 font-mono normal-case tracking-normal text-[10.5px]">
            {selectedInds.size === 0 ? `All ${industries.flat?.length || 0}` : `${selectedInds.size} selected`}
          </span>
        </div>
        <div className="thin-scroll max-h-[200px] overflow-y-auto surface-1 rounded-xl p-2 space-y-2">
          {Object.entries(industries.grouped || {}).map(([group, items]) => (
            <div key={group}>
              <div className="text-[9.5px] uppercase tracking-widest text-white/35 font-semibold px-1 mb-1">{group}</div>
              <div className="flex flex-wrap gap-1">
                {items.map(it => (
                  <button key={it.name} onClick={() => toggleInd(it.name)}
                          className={`text-[10.5px] px-2 py-1 rounded-md border transition flex items-center gap-1 ${
                            selectedInds.has(it.name)
                              ? 'border-crimson-500/40 bg-crimson-500/15 text-crimson-300'
                              : 'border-white/8 bg-white/[0.025] text-white/65 hover:text-white'}`}>
                    <span>{it.icon}</span>{it.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(industries.grouped || {}).length === 0 && (
            <div className="text-center py-4 text-[12px] text-white/40">Loading industries…</div>
          )}
        </div>
        <p className="text-[10.5px] text-white/40">Leave empty to scan all industries.</p>
      </div>

      {/* Settings */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-[10.5px] uppercase tracking-widest text-white/45 font-semibold block mb-1.5">Radius (miles)</span>
          <input type="number" min="1" max="50" value={radius} onChange={e => setRadius(e.target.value)} className="field"/>
        </label>
        <label className="block">
          <span className="text-[10.5px] uppercase tracking-widest text-white/45 font-semibold block mb-1.5">Google Places key (optional)</span>
          <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIzaSy…" className="field"/>
        </label>
      </div>
      <label className="flex items-center gap-2 mt-3 cursor-pointer text-[12px] text-white/70">
        <input type="checkbox" checked={continuous} onChange={e => setContinuous(e.target.checked)}
               className="accent-crimson-500"/>
        Run continuously — re-cycle every 6 hours
      </label>

      <div className="flex justify-end gap-2 mt-6">
        <button onClick={onClose} className="btn btn-ghost">Cancel</button>
        <button onClick={start} disabled={starting} className="btn btn-primary disabled:opacity-60">
          {starting ? <><RefreshCw className="w-3.5 h-3.5 animate-spin-slow"/>Starting…</> : <><Globe className="w-3.5 h-3.5"/>Start scrape</>}
        </button>
      </div>
    </Modal>
  );
}

/* ─ MAIN LEADS SECTION ───────────────────────────────── */
function LeadsLH({ pushToast }) {
  const [leads, setLeads]   = useState([]);
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('opp_score');
  const [selected, setSelected] = useState(new Set());
  const [openId, setOpenId] = useState(null);
  const [scrapeOpen, setScrapeOpen] = useState(false);
  const [scrapeState, setScrapeState] = useState(null);

  // Owner assignments — local-only (LH backend doesn't track ownership)
  const [owners, setOwners] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_owners') || '{}'); }
    catch { return {}; }
  });
  const persistOwners = (next) => {
    setOwners(next);
    try { localStorage.setItem('lh_owners', JSON.stringify(next)); } catch {}
  };

  const fetchLeads = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const params = { sort_by: sortBy, sort_dir: 'DESC', limit: 500 };
      if (filter === 'nowebsite') params.has_website = 'false';
      if (filter === 'website')   params.has_website = 'true';
      if (filter === 'hot')       params.min_score   = 75;
      const [leadsRes, statsRes] = await Promise.all([
        LH.fetchLeads(params),
        LH.stats().catch(() => null),
      ]);
      setLeads(leadsRes.leads || []);
      if (statsRes) setStats(statsRes);
    } catch (e) {
      setError(e.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [filter, sortBy]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Poll scrape status while a job is running so the banner updates live
  const wasRunningRef = useRef(false);
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const s = await LH.scrapeStatus();
        if (cancelled) return;
        setScrapeState(s);
        if (wasRunningRef.current && !s.running) {
          // job just finished → refresh leads
          fetchLeads();
        }
        wasRunningRef.current = !!s.running;
      } catch {}
    };
    tick();
    const id = setInterval(tick, 3500);
    return () => { cancelled = true; clearInterval(id); };
  }, [fetchLeads]);

  const stopScrape = async () => {
    try { await LH.scrapeStop(); pushToast({ kind:'success', msg:'Stopping…' }); }
    catch (e) { pushToast({ kind:'error', msg: e.message }); }
  };

  // Local search
  const filtered = useMemo(() => {
    if (!search) return leads;
    const q = search.toLowerCase();
    return leads.filter(l =>
      [l.name, l.address, l.city, l.phone, l.industry, l.email, l.website_url, l.description]
        .some(v => v && String(v).toLowerCase().includes(q))
    );
  }, [leads, search]);

  // Selection helpers
  const toggleSel = (id) => setSelected(s => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () =>
    setSelected(s => s.size === filtered.length ? new Set() : new Set(filtered.map(l => l.id)));

  const bulkAssign = (userId) => {
    const next = { ...owners };
    selected.forEach(id => { if (userId) next[id] = userId; else delete next[id]; });
    persistOwners(next);
    setSelected(new Set());
    pushToast({ kind:'success',
      msg: userId
        ? `${selected.size} lead${selected.size > 1 ? 's' : ''} assigned to ${getUser(userId).name}`
        : `${selected.size} lead${selected.size > 1 ? 's' : ''} unassigned`
    });
  };

  const exportCSV = () => {
    if (!filtered.length) return;
    const cols = ['name','industry','address','city','state','zip_code','phone','email',
                  'website_url','website_live','rating','review_count','opp_score','source'];
    const rows = [cols.join(',')];
    filtered.forEach(l => {
      rows.push(cols.map(c => JSON.stringify(l[c] ?? '')).join(','));
    });
    const blob = new Blob([rows.join('\n')], { type:'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'leads_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    pushToast({ kind:'success', msg:`Exported ${filtered.length} leads` });
  };

  // Counts for filter pills
  const counts = useMemo(() => ({
    all:        stats?.total || leads.length,
    nowebsite:  stats?.no_website ?? leads.filter(l => !l.website_live).length,
    hot:        stats?.hot ?? leads.filter(l => (l.opp_score || 0) >= 75).length,
    website:    (stats?.total ?? leads.length) - (stats?.no_website ?? leads.filter(l => !l.website_live).length),
  }), [stats, leads]);

  const filters = [
    { id:'all',       label:'All' },
    { id:'nowebsite', label:'No website' },
    { id:'hot',       label:'Hot 75+' },
    { id:'website',   label:'Has website' },
  ];

  const sortOptions = [
    { id:'opp_score',    label:'Score' },
    { id:'review_count', label:'Reviews' },
    { id:'rating',       label:'Rating' },
    { id:'scraped_at',   label:'Newest' },
  ];

  const openLead = filtered.find(l => l.id === openId);

  return (
    <div className="fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Leads</h2>
          <p className="text-[12px] text-white/45 mt-0.5 flex items-center gap-2">
            <span className="pulse-dot pulse-dot-emerald"/>
            LeadHunter · {(stats?.total ?? leads.length).toLocaleString()} total
            {stats?.hot != null && <> · {stats.hot.toLocaleString()} hot</>}
            {stats?.avg_score != null && <> · avg score {stats.avg_score}</>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchLeads} className="btn btn-ghost" disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin-slow' : ''}`}/>Refresh
          </button>
          <button onClick={exportCSV} className="btn btn-ghost" disabled={!filtered.length}>
            <ArrowDown className="w-3.5 h-3.5"/>Export
          </button>
          <button onClick={() => setScrapeOpen(true)} className="btn btn-primary">
            <Globe className="w-3.5 h-3.5"/>Find leads
          </button>
        </div>
      </div>

      {/* Scrape progress banner */}
      <ScrapeBanner state={scrapeState} onStop={stopScrape}/>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
                  className={`tab ${filter === f.id ? 'active' : ''}`}>
            {f.label}
            <span className="ml-1.5 text-white/40 font-mono text-[10.5px]">{counts[f.id]?.toLocaleString?.() ?? counts[f.id] ?? 0}</span>
          </button>
        ))}
        <div className="flex-1"/>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="field !py-1.5 !text-[12px] w-auto">
          {sortOptions.map(o => <option key={o.id} value={o.id}>Sort: {o.label}</option>)}
        </select>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search business, city, phone…"
                 className="field pl-8 w-[260px]"/>
        </div>
      </div>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div className="surface-2 rounded-xl px-4 py-2.5 flex items-center justify-between fade-in">
          <div className="text-[12.5px] text-white">
            <span className="font-medium">{selected.size}</span> lead{selected.size > 1 ? 's' : ''} selected
          </div>
          <div className="flex items-center gap-2">
            <AssignPicker value={null} onPick={bulkAssign}/>
            <button onClick={exportCSV} className="btn btn-ghost !py-1.5 !text-[11.5px]"><ArrowDown className="w-3 h-3"/>Export</button>
            <button onClick={() => setSelected(new Set())} className="btn-icon !w-7 !h-7"><X className="w-3 h-3"/></button>
          </div>
        </div>
      )}

      {/* Table / states */}
      {loading && leads.length === 0 ? (
        <LoadingSkeleton/>
      ) : error ? (
        <ErrorState error={error} onRetry={fetchLeads}/>
      ) : filtered.length === 0 ? (
        <EmptyLeads onScrape={() => setScrapeOpen(true)} hasFilter={filter !== 'all' || !!search}/>
      ) : (
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
                <th>Business</th>
                <th>Industry</th>
                <th>Score</th>
                <th>Website</th>
                <th>Rating</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Owner</th>
                <th style={{width:60}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => {
                const hot = leadHotness(l.opp_score || 0);
                return (
                  <tr key={l.id} className="cursor-pointer" onClick={() => setOpenId(l.id)}>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleSel(l.id)} className={`chk ${selected.has(l.id) ? 'on' : ''}`}><Check/></button>
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg surface-1 grid place-items-center text-base shrink-0">{leadIcon(l)}</div>
                        <div className="min-w-0 max-w-[220px]">
                          <div className="text-white truncate">{l.name}</div>
                          <div className="text-[10.5px] text-white/40 truncate">{l.description || l.address || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-white/75 capitalize">{l.industry || '—'}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <ScoreRing score={l.opp_score || 0} size={28}/>
                        <span className={`badge ${hot.cls}`}>{hot.label}</span>
                      </div>
                    </td>
                    <td>
                      {l.website_live
                        ? <a href={l.website_url} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
                             className="badge badge-sky hover:underline">live</a>
                        : <span className="badge badge-amber">none</span>}
                    </td>
                    <td className="text-white/85 font-mono whitespace-nowrap">
                      {l.rating ? <>★ {l.rating.toFixed(1)} <span className="text-white/40">({(l.review_count || 0).toLocaleString()})</span></> : '—'}
                    </td>
                    <td className="text-white/70 font-mono">{l.phone || '—'}</td>
                    <td className="text-white/65 truncate max-w-[140px]">{[l.city, l.state].filter(Boolean).join(', ') || '—'}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <AssignPicker value={owners[l.id]} onPick={(uid) => {
                        const next = { ...owners };
                        if (uid) next[l.id] = uid; else delete next[l.id];
                        persistOwners(next);
                      }} compact/>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setOpenId(l.id)} className="btn-icon !w-7 !h-7"><MoreH className="w-3.5 h-3.5"/></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-white/[0.04] text-[11px] text-white/45 flex items-center justify-between">
            <span>{filtered.length.toLocaleString()} of {leads.length.toLocaleString()} loaded {search && <>· filtered by "{search}"</>}</span>
            <span className="font-mono">
              Avg score: <span className="text-white">{filtered.length ? Math.round(filtered.reduce((s, l) => s + (l.opp_score || 0), 0) / filtered.length) : 0}</span>
            </span>
          </div>
        </div>
      )}

      {/* Drawer */}
      <LHLeadDrawer
        lead={openLead}
        owner={openLead ? owners[openLead.id] : null}
        onClose={() => setOpenId(null)}
        onAssign={(uid) => {
          const next = { ...owners };
          if (uid) next[openLead.id] = uid; else delete next[openLead.id];
          persistOwners(next);
        }}
      />

      {/* Scrape modal */}
      <ScrapeModal
        open={scrapeOpen}
        onClose={() => setScrapeOpen(false)}
        onStarted={fetchLeads}
        pushToast={pushToast}
      />
    </div>
  );
}

/* ─ Empty / loading / error states ───────────────────── */
function LoadingSkeleton() {
  return (
    <div className="glass rim rounded-2xl p-2 space-y-1.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2.5">
          <div className="skeleton w-4 h-4 rounded-sm"/>
          <div className="skeleton w-8 h-8 rounded-lg"/>
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-3 w-1/3"/>
            <div className="skeleton h-2 w-1/2"/>
          </div>
          <div className="skeleton h-7 w-16 rounded-md"/>
          <div className="skeleton h-7 w-16 rounded-md"/>
          <div className="skeleton h-7 w-20 rounded-md"/>
        </div>
      ))}
    </div>
  );
}

function EmptyLeads({ onScrape, hasFilter }) {
  return (
    <div className="glass rim rounded-2xl py-16 px-8 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-crimson-400/20 to-crimson-700/0 border border-crimson-400/30 grid place-items-center text-crimson-300 mb-4">
        <Globe className="w-6 h-6"/>
      </div>
      <h3 className="font-display text-lg font-semibold text-white tracking-tight">
        {hasFilter ? 'No leads match this filter' : 'No leads yet'}
      </h3>
      <p className="text-[13px] text-white/55 mt-2 max-w-sm mx-auto leading-relaxed">
        {hasFilter
          ? 'Clear filters above, or run LeadHunter to find more businesses in a new location.'
          : 'Run LeadHunter to scan a location for local businesses without websites. Results stream in as they\'re found.'}
      </p>
      <button onClick={onScrape} className="btn btn-primary mt-5 mx-auto">
        <Globe className="w-3.5 h-3.5"/>Find leads
      </button>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="glass rim rounded-2xl py-12 px-8 text-center" style={{borderColor:'rgba(244,63,94,0.25)'}}>
      <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-crimson-300"/>
      <h3 className="font-display text-base font-semibold text-white">Couldn't reach LeadHunter</h3>
      <p className="text-[12px] text-white/55 mt-2 font-mono">{error}</p>
      <button onClick={onRetry} className="btn btn-ghost mt-4 mx-auto"><RefreshCw className="w-3.5 h-3.5"/>Try again</button>
    </div>
  );
}

/* ─ Replace default Leads with the LeadHunter-backed one ───── */
window.Leads = LeadsLH;
