/* ─────────────────────────────────────────────────────
   AIATWORK Command Center — communication & intelligence
   Conversations · Bookings · Analytics · Team Chat · DMs · Jarvis
   ───────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────
   CONVERSATIONS — full inbox UX
   ───────────────────────────────────────────────────── */
function Conversations({ pushToast }) {
  const [openId, setOpenId] = useState(CC.conversations[0]?.id || null);
  const [filter, setFilter] = useState('all');

  const filtered = CC.conversations.filter(c => filter === 'all' ? true : c.status === filter);
  const cur = CC.conversations.find(c => c.id === openId) || filtered[0];

  return (
    <div className="fade-in flex flex-col h-[calc(100vh-7rem)] gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Conversations</h2>
          <p className="text-[12px] text-white/45 mt-0.5">AI agent interactions across voice, chatbot, and SMS</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost"><Mic className="w-3.5 h-3.5"/>Voice settings</button>
          <button className="btn btn-primary"><Bot className="w-3.5 h-3.5"/>Train Jarvis</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* List */}
        <div className="col-span-12 lg:col-span-4 glass rim rounded-2xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/[0.06]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40"/>
              <input placeholder="Search conversations…" className="field pl-8"/>
            </div>
            <div className="flex gap-1 mt-2">
              {['all','active','converted','lost'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                        className={`tab !text-[11px] !py-1 ${filter === f ? 'active' : ''} capitalize`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto thin-scroll">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setOpenId(c.id)}
                      className={`w-full text-left px-4 py-3 border-b border-white/[0.04] transition ${openId === c.id ? 'bg-crimson-500/10 border-l-2 border-l-crimson-400' : 'hover:bg-white/[0.025]'}`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${c.source === 'voice' ? 'bg-gradient-to-br from-ember-400/30 to-ember-500/0 border border-ember-400/30 text-ember-400' : 'bg-gradient-to-br from-crimson-400/30 to-crimson-700/0 border border-crimson-400/30 text-crimson-300'}`}>
                      {c.source === 'voice' ? <Mic className="w-3.5 h-3.5"/> : <Bot className="w-3.5 h-3.5"/>}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] text-white truncate">{c.name}</div>
                      <div className="text-[10.5px] text-white/40 truncate">{c.email || 'Anonymous'}</div>
                    </div>
                  </div>
                  <StatusBadge status={c.status}/>
                </div>
                <div className="text-[11px] text-white/55 truncate">{c.interest}</div>
                <div className="text-[10px] text-white/35 mt-1 flex items-center gap-1">
                  <span>{c.msgs} msgs</span>
                  <span>·</span>
                  <span>{c.last}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation panel */}
        <div className="col-span-12 lg:col-span-8 glass rim rounded-2xl flex flex-col overflow-hidden">
          {cur ? <ConversationPanel conv={cur} pushToast={pushToast}/> : <EmptyState/>}
        </div>
      </div>
    </div>
  );
}

function ConversationPanel({ conv, pushToast }) {
  const [reply, setReply] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [messages, setMessages] = useState(() => sampleMessagesFor(conv));
  const scrollRef = useRef(null);

  useEffect(() => { setMessages(sampleMessagesFor(conv)); }, [conv.id]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!reply.trim()) return;
    setMessages(m => [...m, { who:'agent', t:reply, time:'now' }]);
    setReply('');
    pushToast({ kind:'success', msg:'Reply sent' });
  };

  const askJarvis = async () => {
    setAiBusy(true);
    try {
      const suggestion = await window.claude.complete({
        messages: [{ role:'user', content:
          `You are an AI sales agent helping reply to a customer. Customer is asking about: "${conv.interest}". Last message: "${messages[messages.length-1]?.t || ''}". Suggest a concise, friendly reply (max 2 sentences) that moves them toward booking a demo.`
        }],
      });
      setReply(suggestion);
    } catch { setReply("Thanks for reaching out! Want to grab 15 minutes this week to see how it works on your data?"); }
    finally { setAiBusy(false); }
  };

  return (
    <>
      <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
        <Avatar userId="u3" size="lg"/>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] text-white font-semibold">{conv.name}</div>
          <div className="text-[10.5px] text-white/45">{conv.interest} · via {conv.source}</div>
        </div>
        <button className="btn btn-ghost !py-1.5 !text-[11px]"><Calendar className="w-3 h-3"/>Book</button>
        <button className="btn btn-ghost !py-1.5 !text-[11px]"><UsersIcon className="w-3 h-3"/>Convert to lead</button>
        <StatusBadge status={conv.status}/>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto thin-scroll p-5 space-y-3 bg-ink-950/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.who === 'visitor' ? '' : 'justify-end'}`}>
            {m.who === 'visitor' && (
              <div className="avatar avatar-sm avatar-4">{conv.name.split(' ').map(p => p[0]).join('').slice(0,2)}</div>
            )}
            <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-snug ${
              m.who === 'visitor'
                ? 'bg-white/[0.05] border border-white/[0.06] rounded-tl-sm text-white/90'
                : 'bg-gradient-to-br from-crimson-500 to-crimson-700 rounded-tr-sm text-white'}`}>
              {m.t}
            </div>
            {m.who !== 'visitor' && (
              <div className="avatar avatar-sm avatar-1">
                {m.who === 'agent' ? <Bot className="w-3 h-3"/> : 'JA'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06] p-3">
        <div className="surface-1 rounded-xl p-2 flex items-center gap-2">
          <button onClick={askJarvis} disabled={aiBusy}
                  className="btn btn-ghost !py-1.5 !px-2 !text-[11px] shrink-0 disabled:opacity-50">
            {aiBusy ? <span className="animate-spin-slow"><RefreshCw className="w-3 h-3"/></span> : <Sparkles className="w-3 h-3"/>}
            Suggest
          </button>
          <input value={reply} onChange={e => setReply(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && send()}
                 placeholder="Reply…"
                 className="bg-transparent text-[13px] flex-1 outline-none text-white placeholder:text-white/35"/>
          <button className="btn-icon"><Paperclip className="w-3.5 h-3.5"/></button>
          <button onClick={send} disabled={!reply.trim()}
                  className="btn btn-primary !py-1.5 !px-3 !text-[11.5px] disabled:opacity-50"><Send className="w-3 h-3"/>Send</button>
        </div>
      </div>
    </>
  );
}

function sampleMessagesFor(conv) {
  return [
    { who:'visitor', t:'Hi, I saw your AI receptionist demo on the homepage. Does it work for my industry?', time:'10:14 AM' },
    { who:'agent',   t:`Hey ${conv.name.split(' ')[0]}! Yes — it's tuned per-industry. What kind of business?`, time:'10:14 AM' },
    { who:'visitor', t:`We do ${conv.interest.toLowerCase()}.  About 80 calls/day, lose ~25% after hours.`, time:'10:15 AM' },
    { who:'agent',   t:`Common problem. Our setup answers in <2 rings, captures intent, and books. Want a 15-min live demo on your data?`, time:'10:15 AM' },
    { who:'visitor', t:`Sure, what's the pricing?`, time:'10:16 AM' },
  ];
}

function EmptyState() {
  return (
    <div className="flex-1 grid place-items-center text-white/45 text-[13px]">
      <div className="text-center">
        <Bot className="w-10 h-10 mx-auto mb-3 text-white/30"/>
        Select a conversation to view
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   BOOKINGS
   ───────────────────────────────────────────────────── */
function Bookings({ pushToast }) {
  const [bookings, setBookings] = useState(CC.bookings);
  const [filter, setFilter] = useState('all');

  const confirmBooking = (id) => {
    setBookings(b => b.map(x => x.id === id ? { ...x, status:'confirmed' } : x));
    pushToast({ kind:'success', msg:'Booking confirmed' });
  };
  const cancelBooking = (id) => {
    setBookings(b => b.filter(x => x.id !== id));
    pushToast({ kind:'success', msg:'Booking cancelled' });
  };

  const visible = bookings.filter(b => filter === 'all' ? true : b.status === filter);
  const grouped = visible.reduce((acc, b) => { (acc[b.date] = acc[b.date] || []).push(b); return acc; }, {});

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Bookings</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{bookings.length} scheduled · {bookings.filter(b => b.status === 'pending').length} pending</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost"><Calendar className="w-3.5 h-3.5"/>Calendar view</button>
          <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>Book a call</button>
        </div>
      </div>

      <div className="flex gap-2">
        {[['all','All'],['confirmed','Confirmed'],['pending','Pending']].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} className={`tab ${filter === id ? 'active' : ''}`}>{label}</button>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([day, items]) => (
          <div key={day}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-[11px] uppercase tracking-widest text-white/45 font-semibold">{day}</h3>
              <div className="flex-1 h-px bg-white/[0.06]"/>
              <span className="text-[10.5px] text-white/40 font-mono">{items.length}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {items.map(b => (
                <div key={b.id} className="glass rim rounded-2xl p-4 flex items-start gap-4">
                  <div className="w-12 shrink-0 text-center">
                    <div className="text-[9px] uppercase text-white/40">{b.date}</div>
                    <div className="font-mono text-[13px] text-white font-semibold mt-0.5">{b.time}</div>
                    <div className="text-[9.5px] text-white/35 mt-1">{b.duration} min</div>
                  </div>
                  <div className="w-px self-stretch bg-white/8"/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-[13.5px] text-white font-medium">{b.client}</div>
                      <StatusBadge status={b.status}/>
                    </div>
                    <div className="text-[11.5px] text-white/55 mb-2">{b.type}</div>
                    <div className="flex items-center gap-2 text-[11px] text-white/55">
                      <Avatar userId={b.owner} size="sm"/>
                      <span>{getUser(b.owner)?.name}</span>
                      <span className="text-white/25">·</span>
                      <a className="font-mono text-crimson-300 hover:text-white truncate">{b.meet}</a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button className="btn btn-ghost !py-1.5 !px-2 !text-[11px]"><Video className="w-3 h-3"/>Join</button>
                    {b.status === 'pending' && (
                      <button onClick={() => confirmBooking(b.id)} className="btn btn-primary !py-1.5 !px-2 !text-[11px]"><Check className="w-3 h-3"/>Confirm</button>
                    )}
                    <button onClick={() => cancelBooking(b.id)} className="btn-icon !w-full !h-7 !text-crimson-300/60 hover:!text-crimson-300"><Trash className="w-3 h-3"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="glass rim rounded-2xl py-16 text-center text-white/45 text-[13px]">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-white/30"/>
            No bookings in this view.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ANALYTICS
   ───────────────────────────────────────────────────── */
function Analytics() {
  const [range, setRange] = useState('30d');
  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Analytics</h2>
          <p className="text-[12px] text-white/45 mt-0.5">Revenue, conversion, and team performance</p>
        </div>
        <div className="flex gap-1">
          {['7d','30d','90d','YTD'].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`tab ${range === r ? 'active' : ''}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Revenue"     value="$0"   sub="No closed deals yet"   icon={DollarSign}/>
        <KpiCard label="Conversion"  value="—"    sub="lead → won"            icon={Target}/>
        <KpiCard label="Avg deal"    value="—"    sub="across 0 wins"         icon={TrendingUp}/>
        <KpiCard label="Cycle time"  value="—"    sub="lead → close"          icon={Clock}/>
      </div>

      <div className="glass rim rounded-2xl py-20 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-crimson-400/15 to-crimson-700/0 border border-crimson-400/25 grid place-items-center text-crimson-300 mb-4">
          <BarChart className="w-6 h-6"/>
        </div>
        <h3 className="font-display text-lg font-semibold text-white tracking-tight">No analytics data yet</h3>
        <p className="text-[13px] text-white/55 mt-2 max-w-sm mx-auto leading-relaxed">
          Charts and metrics appear here once your CRM has closed deals and call activity.
          Find your first leads via LeadHunter to get started.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   TEAM CHAT
   ───────────────────────────────────────────────────── */
function TeamChat({ pushToast }) {
  const [active, setActive] = useState(CC.chatChannels[0]?.id || 'general');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(CC.chatMessages);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    setMessages(m => [...m, { id:'m'+Date.now(), who:'u1', t:draft, time:'just now' }]);
    setDraft('');
  };

  const cur = CC.chatChannels.find(c => c.id === active);

  return (
    <div className="fade-in flex flex-col h-[calc(100vh-7rem)] gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Team Chat</h2>
          <p className="text-[12px] text-white/45 mt-0.5">{CC.team.filter(u => u.status==='online').length} online</p>
        </div>
        <button className="btn btn-primary"><Plus className="w-3.5 h-3.5"/>New channel</button>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Channels list */}
        <div className="col-span-12 lg:col-span-3 glass rim rounded-2xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/[0.06]">
            <div className="text-[10px] uppercase tracking-widest text-white/45 font-semibold mb-2 px-1">Channels</div>
            <div className="space-y-0.5">
              {CC.chatChannels.map(c => (
                <button key={c.id} onClick={() => setActive(c.id)}
                        className={`nav-item w-full text-left ${active === c.id ? 'active' : ''}`}>
                  <Hash className="w-3.5 h-3.5"/>
                  <span className="flex-1 truncate">{c.name}</span>
                  {c.unread > 0 && <span className="badge badge-crimson !px-1.5 !py-0 !text-[9.5px]">{c.unread}</span>}
                </button>
              ))}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/45 font-semibold mt-4 mb-2 px-1">Team</div>
            <div className="space-y-0.5">
              {CC.team.slice(0, 6).map(u => (
                <button key={u.id} className="nav-item w-full text-left">
                  <div className="relative">
                    <Avatar userId={u.id} size="sm"/>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-ink-950 ${u.status === 'online' ? 'bg-emerald-400' : u.status === 'away' ? 'bg-amber-400' : 'bg-white/20'}`}/>
                  </div>
                  <span className="flex-1 truncate text-[12px]">{u.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Channel */}
        <div className="col-span-12 lg:col-span-9 glass rim rounded-2xl flex flex-col overflow-hidden">
          <div className="border-b border-white/[0.06] px-5 py-3 flex items-center gap-3">
            <Hash className="w-4 h-4 text-white/55"/>
            <div>
              <div className="text-[14px] text-white font-semibold">{cur.name}</div>
              <div className="text-[10.5px] text-white/45">{CC.team.length} members</div>
            </div>
            <div className="flex-1"/>
            <div className="flex -space-x-1.5">
              {CC.team.slice(0, 5).map(u => <Avatar key={u.id} userId={u.id} size="sm"/>)}
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto thin-scroll px-5 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="grid place-items-center h-full text-center text-white/40 text-[12px]">
                <div>
                  <Hash className="w-8 h-8 mx-auto mb-2 text-white/20"/>
                  This is the beginning of #{cur?.name}.<br/>Be the first to say hello.
                </div>
              </div>
            )}
            {messages.map((m) => {
              const u = getUser(m.who);
              return (
                <div key={m.id} className="flex gap-2.5">
                  <Avatar userId={m.who}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13px] text-white font-semibold">{u?.name}</span>
                      <span className="text-[10px] text-white/40">{m.time}</span>
                    </div>
                    <p className="text-[13px] text-white/85 mt-0.5">{m.t}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/[0.06] p-3">
            <div className="surface-1 rounded-xl p-2 flex items-center gap-2">
              <button className="btn-icon"><Paperclip className="w-3.5 h-3.5"/></button>
              <button className="btn-icon"><Smile className="w-3.5 h-3.5"/></button>
              <input value={draft} onChange={e => setDraft(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && send()}
                     placeholder={`Message #${cur.name}`}
                     className="bg-transparent text-[13px] flex-1 outline-none text-white placeholder:text-white/35"/>
              <button onClick={send} disabled={!draft.trim()}
                      className="btn btn-primary !py-1.5 !px-3 !text-[11.5px] disabled:opacity-50"><Send className="w-3 h-3"/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   DIRECT MESSAGES
   ───────────────────────────────────────────────────── */
function DirectMessages({ pushToast }) {
  const [active, setActive] = useState(CC.team.find(u => u.id !== 'u1')?.id || 'u2');
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState({}); // userId → messages[]

  const messages = thread[active] || [];

  const send = () => {
    if (!draft.trim()) return;
    setThread(t => ({ ...t, [active]: [...(t[active] || []), { mine:true, t:draft }] }));
    setDraft('');
  };

  return (
    <div className="fade-in flex flex-col h-[calc(100vh-7rem)] gap-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Direct Messages</h2>
        <p className="text-[12px] text-white/45 mt-0.5">1-on-1 with your team</p>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-12 lg:col-span-3 glass rim rounded-2xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/[0.06]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40"/>
              <input placeholder="Search…" className="field pl-8"/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto thin-scroll p-1">
            {CC.team.filter(u => u.id !== 'u1').map(u => (
              <button key={u.id} onClick={() => setActive(u.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition ${active === u.id ? 'bg-crimson-500/10' : 'hover:bg-white/[0.03]'}`}>
                <div className="relative">
                  <Avatar userId={u.id}/>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-ink-950 ${u.status === 'online' ? 'bg-emerald-400' : u.status === 'away' ? 'bg-amber-400' : 'bg-white/20'}`}/>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[12.5px] text-white truncate">{u.name}</div>
                  <div className="text-[10px] text-white/40 truncate">{u.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 glass rim rounded-2xl flex flex-col overflow-hidden">
          <div className="border-b border-white/[0.06] px-5 py-3 flex items-center gap-3">
            <Avatar userId={active}/>
            <div>
              <div className="text-[14px] text-white font-semibold">{getUser(active)?.name}</div>
              <div className="text-[10.5px] text-emerald-300 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>{getUser(active)?.status}</div>
            </div>
            <div className="flex-1"/>
            <button className="btn-icon"><Phone className="w-4 h-4"/></button>
            <button className="btn-icon"><Video className="w-4 h-4"/></button>
          </div>
          <div className="flex-1 overflow-y-auto thin-scroll p-5 space-y-3">
            {messages.length === 0 ? (
              <div className="grid place-items-center h-full text-center text-white/40 text-[12px]">
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-2 text-white/20"/>
                  Start a conversation with {getUser(active)?.name.split(' ')[0]}.
                </div>
              </div>
            ) : messages.map((m, i) => (
              <div key={i} className={`flex ${m.mine ? 'justify-end' : ''}`}>
                <div className={`max-w-[70%] text-[13px] px-3.5 py-2 rounded-2xl ${m.mine ? 'bg-gradient-to-br from-crimson-500 to-crimson-700 text-white' : 'bg-white/[0.05] border border-white/[0.06] text-white/85'}`}>
                  {m.t}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] p-3">
            <div className="surface-1 rounded-xl p-2 flex items-center gap-2">
              <input value={draft} onChange={e => setDraft(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && send()}
                     placeholder={`Message ${getUser(active)?.name.split(' ')[0]}`}
                     className="bg-transparent text-[13px] flex-1 outline-none text-white placeholder:text-white/35"/>
              <button onClick={send} disabled={!draft.trim()} className="btn btn-primary !py-1.5 !px-3 !text-[11.5px] disabled:opacity-50"><Send className="w-3 h-3"/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   JARVIS CONTROL
   ───────────────────────────────────────────────────── */
function JarvisControl({ pushToast }) {
  const [insights, setInsights] = useState(CC.jarvis);
  const [running, setRunning] = useState(true);
  const [chat, setChat] = useState([
    { who:'jarvis', t:'I\'m watching your pipeline 24/7. Ask me anything — or run a quick action below.', time:'now' },
  ]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [chat, thinking]);

  const ask = async (text) => {
    setChat(c => [...c, { who:'user', t:text, time:'now' }]);
    setThinking(true);
    try {
      const reply = await window.claude.complete({
        messages: [{ role:'user', content:
          `You are Jarvis, the AI ops co-pilot for AIATWORK (an AI automation agency). The team has ${CC.stats.totalLeads} leads, $${CC.stats.pipelineValue} in pipeline, ${CC.stats.openDeals} open deals, ${CC.stats.hotLeads} hot leads, ${CC.stats.overdueTasks} overdue tasks. Today is busy. User asks: "${text}". Reply in 1-3 sentences, concrete, actionable.`}],
      });
      setChat(c => [...c, { who:'jarvis', t:reply, time:'now' }]);
    } catch {
      setChat(c => [...c, { who:'jarvis', t:'Aurora Solar is your highest-priority deal today — engagement up 220%. I\'d send the proposal before EOD.', time:'now' }]);
    } finally { setThinking(false); }
  };

  const send = () => {
    if (!draft.trim() || thinking) return;
    const t = draft.trim();
    setDraft('');
    ask(t);
  };

  const handleInsight = (id) => {
    const j = insights.find(x => x.id === id);
    setInsights(curr => curr.filter(x => x.id !== id));
    pushToast({ kind:'success', msg:`Acted on: ${j.title}` });
  };

  const quick = [
    "Who are my hottest leads today?",
    "Draft outreach to solar vertical",
    "Summarize pipeline status",
    "What's blocking my closes?",
  ];

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-crimson-500/30 to-crimson-800/0 border border-crimson-500/40 grid place-items-center text-crimson-300">
            <Brain className="w-6 h-6"/>
            <span className="absolute -top-1 -right-1 pulse-dot"/>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
              Jarvis <span className="font-editorial text-fluid">Control</span>
            </h2>
            <p className="text-[12px] text-white/45 mt-0.5 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-emerald-400' : 'bg-white/30'}`}/>
              {running ? 'Running · monitoring pipeline' : 'Paused'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(r => !r)} className="btn btn-ghost">
            {running ? <><Pause className="w-3.5 h-3.5"/>Pause</> : <><Play className="w-3.5 h-3.5"/>Resume</>}
          </button>
          <button className="btn btn-primary"><Settings className="w-3.5 h-3.5"/>Configure</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Insights queue */}
        <Card title="Insights & actions" icon={Sparkles} className="lg:col-span-2"
              action={<span className="text-[10.5px] text-white/45">{insights.length} pending</span>}>
          <div className="space-y-2">
            {insights.map(j => {
              const cls = j.urgency === 'high' ? 'badge-crimson' : j.urgency === 'medium' ? 'badge-amber' : 'badge-sky';
              const KindIcon = j.kind === 'alert' ? AlertTriangle : j.kind === 'action' ? Zap : Sparkles;
              return (
                <div key={j.id} className="surface-1 rounded-xl p-4 flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg badge ${cls} grid place-items-center !border-0 !p-0 shrink-0`}>
                    <KindIcon className="w-4 h-4"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${cls} capitalize`}>{j.kind}</span>
                      <span className={`badge ${cls}`}>{j.urgency}</span>
                    </div>
                    <div className="text-[13px] text-white font-medium">{j.title}</div>
                    <div className="text-[11.5px] text-white/55 mt-1 leading-relaxed">{j.desc}</div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button onClick={() => handleInsight(j.id)} className="btn btn-primary !py-1 !px-2.5 !text-[11px]">Run</button>
                    <button onClick={() => setInsights(curr => curr.filter(x => x.id !== j.id))} className="btn btn-ghost !py-1 !px-2.5 !text-[11px]">Skip</button>
                  </div>
                </div>
              );
            })}
            {insights.length === 0 && (
              <div className="text-center py-12 text-white/45 text-[13px]">
                <CircleCheck className="w-8 h-8 mx-auto mb-3 text-emerald-300"/>
                You're caught up. Jarvis will alert you when new actions appear.
              </div>
            )}
          </div>
        </Card>

        {/* Stats / status */}
        <Card title="Agent status" icon={Activity}>
          <div className="space-y-3">
            {[
              { l:'Insights generated',  v:'0',  sub:'this period' },
              { l:'Actions run',         v:'0',  sub:'no history yet' },
              { l:'Drafts created',      v:'0',  sub:'outreach + replies' },
              { l:'Hours saved',         v:'0h', sub:'team time back' },
            ].map(s => (
              <div key={s.l} className="flex items-center justify-between surface-1 rounded-lg px-3 py-2.5">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">{s.l}</div>
                  <div className="font-display text-[18px] text-white font-semibold mt-0.5">{s.v}</div>
                </div>
                <div className="text-[10.5px] text-white/45">{s.sub}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chat with Jarvis */}
      <Card title="Ask Jarvis" icon={Brain} padded={false}>
        <div className="px-5 pb-5">
          <div ref={scrollRef} className="thin-scroll bg-ink-950/30 rounded-xl p-4 h-[260px] overflow-y-auto space-y-3 mb-3">
            {chat.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.who === 'user' ? 'justify-end' : ''}`}>
                {m.who !== 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-crimson-500/40 to-crimson-800/0 border border-crimson-500/40 grid place-items-center shrink-0">
                    <Brain className="w-3.5 h-3.5 text-crimson-300"/>
                  </div>
                )}
                <div className={`max-w-[72%] px-3.5 py-2 rounded-2xl text-[13px] leading-snug ${
                  m.who === 'user'
                    ? 'bg-gradient-to-br from-crimson-500 to-crimson-700 text-white'
                    : 'bg-white/[0.05] border border-white/[0.06] text-white/90'}`}>
                  {m.t}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-2 items-center text-white/40 text-[11px]">
                <div className="w-7 h-7 rounded-full bg-white/[0.04] grid place-items-center"><Brain className="w-3.5 h-3.5"/></div>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse"/>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay:'.2s'}}/>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay:'.4s'}}/>
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap mb-2">
            {quick.map(q => (
              <button key={q} onClick={() => ask(q)} className="text-[11px] surface-1 hover:bg-white/[0.05] rounded-full px-3 py-1.5 text-white/70 transition">
                {q}
              </button>
            ))}
          </div>

          <div className="surface-1 rounded-xl p-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-crimson-300 ml-1"/>
            <input value={draft} onChange={e => setDraft(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && send()}
                   placeholder="Ask anything about your pipeline…"
                   className="bg-transparent text-[13px] flex-1 outline-none text-white placeholder:text-white/35"/>
            <button onClick={send} disabled={!draft.trim() || thinking}
                    className="btn btn-primary !py-1.5 !px-3 !text-[11.5px] disabled:opacity-50">
              <Send className="w-3 h-3"/>Send
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { Conversations, Bookings, Analytics, TeamChat, DirectMessages, JarvisControl });
