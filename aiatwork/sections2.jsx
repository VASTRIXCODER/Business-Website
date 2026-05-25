/* ─────────────────────────────────────────────────────
   AIATWORK redesign — remaining section components
   ───────────────────────────────────────────────────── */

/* ─ Reusable section header ─────────────────────────── */
function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl`}>
      <p className="reveal text-[11px] uppercase tracking-[0.22em] text-ice-300 font-semibold mb-4">{eyebrow}</p>
      <h2 className="reveal font-display text-[36px] sm:text-[48px] leading-[1.02] tracking-tight font-semibold text-white">
        {title}
      </h2>
      {subtitle && <p className="reveal mt-5 text-white/60 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   6.  PROCESS
   ───────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n: '01', t: 'AI Audit & Strategy',  d: 'Deep-dive into your stack. Map gaps, revenue leaks, and automation opportunities.' },
    { n: '02', t: 'System Architecture',  d: 'Custom blueprint designed around your process, team size, and growth targets.' },
    { n: '03', t: 'Build & Deploy',       d: 'Production-grade engineering. Shipped fast with full testing and documentation.' },
    { n: '04', t: 'Optimize & Scale',     d: 'Continuous optimization, performance monitoring, and automation expansion.' },
  ];

  return (
    <section id="process" className="relative py-24 lg:py-32" aria-label="Our process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our process"
          title={<>How we build your <span className="font-editorial text-fluid">AI system.</span></>}
          subtitle="From first call to first booked appointment in under 21 days. No black boxes, no scope creep, no surprise invoices."
        />

        <div className="relative mt-16">
          {/* dashed connector */}
          <div aria-hidden className="hidden lg:block absolute left-0 right-0 top-[44px] dashed-line opacity-50"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className="reveal relative" style={{transitionDelay:`${i*60}ms`}}>
                {/* Number marker */}
                <div className="relative flex items-center mb-7">
                  <div className="relative w-[88px] h-[88px] rounded-2xl glass rim grid place-items-center">
                    <span className="font-display font-semibold text-[34px] tracking-tight"
                          style={{
                            background:'linear-gradient(135deg, #FFFFFF 0%, #A7F3D0 60%, #34D399 100%)',
                            WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent',
                          }}>
                      {s.n}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2 tracking-tight">{s.t}</h3>
                <p className="text-[13.5px] text-white/55 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-16 glass rim rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.22em] text-ice-300 font-semibold mb-2">Engagement window</div>
            <h3 className="font-display text-2xl text-white font-semibold tracking-tight">
              Discovery to deploy in <span className="text-fluid">21 days.</span>
            </h3>
          </div>
          <div className="flex items-center gap-8 sm:gap-12">
            {[{l:'Day 0–3', v:'Audit'},{l:'Day 4–14', v:'Build'},{l:'Day 15–21', v:'Deploy'}].map(s => (
              <div key={s.l}>
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.l}</div>
                <div className="font-display text-base text-white font-semibold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   7.  INDUSTRIES
   ───────────────────────────────────────────────────── */
function Industries() {
  const industries = [
    { name: 'Sales Organizations', desc: 'Outbound teams running high-volume dials',     accent: 'cyan' },
    { name: 'Solar & Energy',      desc: 'Appointment setting & lead qualification',     accent: 'ice' },
    { name: 'Telemarketing Firms', desc: 'Multi-seat dialer deployments',                accent: 'violet' },
    { name: 'Home Services',       desc: 'Inbound routing & scheduling',                  accent: 'cyan' },
    { name: 'Med Spas & Clinics',  desc: 'AI receptionist & booking systems',             accent: 'ice' },
    { name: 'Agencies',            desc: 'White-label CRM & client dashboards',           accent: 'violet' },
    { name: 'Multi-Location',      desc: 'Centralized ops across branches',               accent: 'cyan' },
    { name: 'Hospitality',         desc: 'Guest comms & reservation automation',          accent: 'ice' },
  ];
  const accentDot = {
    cyan:   'bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]',
    ice:    'bg-ice-300 shadow-[0_0_12px_rgba(168,212,255,0.7)]',
    violet: 'bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.7)]',
  };

  return (
    <section id="industries" className="relative py-24 lg:py-32" aria-label="Industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Industries"
          title={<>Built for teams<br/>that <span className="font-editorial text-fluid">sell.</span></>}
          subtitle="Whatever your motion looks like — inbound, outbound, high-touch, high-volume — we've shipped systems that fit."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-14">
          {industries.map((it, i) => (
            <div key={it.name}
                 className="reveal lift glass rim rounded-2xl p-5 group cursor-default"
                 style={{transitionDelay:`${i*30}ms`}}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${accentDot[it.accent]}`}/>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Vertical</div>
              </div>
              <h3 className="text-[14px] font-semibold text-white mb-1.5 tracking-tight">{it.name}</h3>
              <p className="text-[12px] text-white/50 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>

        {/* Logo marquee */}
        <div className="mt-16 marquee">
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, k) =>
              ['Solar', 'Insurance', 'Real Estate', 'SaaS', 'Fitness', 'Home Services', 'Auto', 'Telecom', 'Hospitality', 'Healthcare'].map(b => (
                <div key={`${k}-${b}`} className="font-display text-white/30 text-2xl tracking-tight whitespace-nowrap py-2 px-2 flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-white/20"/> {b}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   8.  PROOF — stats + testimonials
   ───────────────────────────────────────────────────── */
function Proof() {
  const points = [
    { icon: Shield, label: "Enterprise-grade architecture" },
    { icon: Server, label: "Production-ready from day one" },
    { icon: Lock,   label: "SOC-2 aligned security practices" },
  ];
  const stats = [
    { v: "$10k+", l: "Client systems deployed", icon: TrendingUp },
    { v: "77%",   l: "Dialer connect rate",     icon: Phone },
    { v: "24/7",  l: "AI lead response",        icon: Users },
  ];
  const testimonials = [
    {
      quote: "AI at Work helped us put a real outbound system in place. The dialer made a noticeable difference in how many people we were reaching, and having everything organized in one place made the team more efficient.",
      name: "Philip Blum", title: "Founder", company: "Early Bird Marketing",
    },
    {
      quote: "AI at Work built out our dialer system and it's been a major upgrade for our team. We're reaching more people in less time, and the workflow is much more organized than what we had before.",
      name: "Jonathan Z.", title: "Operations Lead", company: "Fiber Focus LLC",
    },
    {
      quote: "They set up my automation system with email, SMS, and chatbot follow-up so leads stopped slipping through. It made my business feel more automated and way more consistent.",
      name: "Max Dent", title: "Fitness Trainer", company: "Independent",
    },
    {
      quote: "AI at Work built a custom platform for our business with maintenance tracking, client accounts, and an after-hours AI receptionist. It made the customer experience more professional and gave us a much better system internally.",
      name: "Omar Hilmi", title: "Owner", company: "Intersport Performance",
    },
  ];

  return (
    <section id="proof" className="relative py-24 lg:py-32" aria-label="Proof">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          center
          eyebrow="Proof"
          title={<>Built for real businesses —<br/><span className="font-editorial text-fluid">not just demos.</span></>}
          subtitle="Custom systems deployed across sales, service, and outbound teams."
        />

        <div className="reveal max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12">
          {points.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[13px] text-white/80">
              <Icon className="w-4 h-4 text-ice-300"/>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="reveal max-w-3xl mx-auto grid grid-cols-3 gap-3 sm:gap-4 mt-12">
          {stats.map(({ v, l, icon: Icon }) => (
            <div key={l} className="rounded-3xl glass rim p-5 sm:p-7 text-center">
              <Icon className="w-5 h-5 text-ice-300 mx-auto mb-3"/>
              <div className="font-display text-2xl sm:text-4xl font-semibold text-white tracking-tight">{v}</div>
              <div className="text-[11px] uppercase tracking-wider text-white/45 mt-1.5">{l}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mt-14">
          {testimonials.map((t, i) => (
            <div key={i}
                 className="reveal glass rim rounded-3xl p-7 relative overflow-hidden"
                 style={{transitionDelay:`${i*60}ms`}}>
              {/* huge background quote */}
              <span aria-hidden className="absolute -top-6 -right-2 font-display text-[200px] leading-none text-white/[0.04] select-none">"</span>

              <div className="relative">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length:5}).map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-ice-300"/>
                  ))}
                </div>
                <p className="text-[14.5px] text-white/85 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ice-300/40 to-violet-300/40 grid place-items-center text-white text-[12px] font-semibold">
                    {t.name.split(' ').slice(0,2).map(p=>p[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-white/45">{t.title} · {t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   9.  FINAL CTA
   ───────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section id="book" className="relative py-24 lg:py-32" aria-label="Get started">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="reveal relative rounded-[32px] glass-strong rim p-10 sm:p-16 overflow-hidden">
          {/* fluid background */}
          <div aria-hidden className="absolute inset-0 -z-10"
               style={{background:"radial-gradient(60% 80% at 20% 0%, rgba(103,232,249,0.18), transparent 60%), radial-gradient(50% 80% at 100% 100%, rgba(167,139,250,0.25), transparent 60%), radial-gradient(40% 60% at 50% 50%, rgba(168,212,255,0.10), transparent 70%)"}}/>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ice-300 font-semibold mb-5">Let's build</p>
              <h2 className="font-display text-[42px] sm:text-[64px] leading-[0.98] tracking-tight font-semibold">
                <span className="text-white">Stop losing leads.</span><br/>
                <span className="font-editorial text-fluid">Start closing them.</span>
              </h2>
              <p className="mt-6 text-white/65 max-w-md leading-relaxed">
                Websites, receptionists, CRM, and dialers — engineered to work together, 24/7.
                Live demo in 15 minutes on a strategy call.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a href="#book-call" className="btn btn-primary">
                  Book a demo <ArrowRight className="w-4 h-4"/>
                </a>
                <a href="tel:7038264327" className="btn btn-ghost">
                  <Phone className="w-4 h-4"/>(703) 826-4327
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8">
              <ul className="space-y-3">
                {['Free 15-min strategy call', 'Custom system blueprint', 'Live AI demo on your data', 'No contracts, no setup fees'].map(p => (
                  <li key={p} className="flex items-center gap-3 text-[14px] text-white/80">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-ice-200 to-ice-400 grid place-items-center text-ink-900 shrink-0">
                      <Check className="w-3.5 h-3.5"/>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['PB','JZ','MD','OH'].map((i, k) => (
                    <div key={k} className="w-7 h-7 rounded-full bg-gradient-to-br from-ice-300 to-violet-300 grid place-items-center text-ink-900 text-[10px] font-semibold ring-2 ring-ink-800">{i}</div>
                  ))}
                </div>
                <div className="text-[12px] text-white/55">
                  <span className="text-white font-semibold">100+ teams</span> already shipping with AIATWORK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
  10.  FOOTER
   ───────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { h: 'AI Automation', items: ['AI Power Dialer', 'AI CRM Automation', 'AI Voice Agent', 'AI Websites'] },
    { h: 'Company',       items: ['Industries', 'Process', 'Assessment', 'Daily Insights', 'Build Logs', 'Book a Call'] },
    { h: 'Resources',     items: ['Blog', 'Case studies', 'Pricing', 'Support'] },
  ];
  return (
    <footer id="insights" className="relative border-t border-white/8 bg-ink-950/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-5">
            <Logo />
            <p className="text-[13px] text-white/55 max-w-sm leading-relaxed">
              Custom AI automation systems and revenue infrastructure for modern sales teams.
              The #1 AI automation agency.
            </p>
            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <Phone className="w-3.5 h-3.5 text-ice-300"/>
              <a href="tel:7038264327" className="hover:text-white">(703) 826-4327</a>
            </div>
            <a href="#book" className="inline-flex items-center gap-2 text-[13px] text-ice-300 hover:text-white">
              Book a strategy call <ArrowUpRight className="w-3.5 h-3.5"/>
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map(c => (
              <div key={c.h}>
                <div className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-4">{c.h}</div>
                <ul className="space-y-2.5">
                  {c.items.map(it => (
                    <li key={it}>
                      <a href="#" className="text-[13px] text-white/70 hover:text-white">{it}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* big wordmark */}
        <div className="mt-14 pt-10 border-t border-white/8">
          <div className="font-display font-semibold tracking-tighter leading-none text-[18vw] lg:text-[200px]"
               style={{background:'linear-gradient(180deg, rgba(168,212,255,0.18) 0%, rgba(255,255,255,0.02) 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent'}}>
            AIATWORK
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3 -mt-2">
            <p className="text-[12px] text-white/40">© 2026 AIATWORK · All rights reserved.</p>
            <div className="flex gap-5 text-[12px] text-white/40">
              <a href="#" className="hover:text-white/70">Privacy</a>
              <a href="#" className="hover:text-white/70">Terms</a>
              <a href="#" className="hover:text-white/70">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────
  11.  CHATBOT WIDGET
   ───────────────────────────────────────────────────── */
function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { who: 'bot', t: "Hey 👋 I'm Nova. Want a custom AI system for your team? Tell me what you're trying to fix." },
  ]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking, open]);

  async function send() {
    const text = draft.trim();
    if (!text || thinking) return;
    setMessages(m => [...m, { who: 'user', t: text }]);
    setDraft('');
    setThinking(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content:
            `You are Nova, a friendly concierge for AIATWORK — an AI automation agency that builds AI voice agents, power dialers, CRM systems, and automated follow-up for sales teams. Reply briefly (max 3 sentences, conversational), and always end with an invitation to book a 15-minute strategy call when relevant. User: ${text}` }
        ]
      });
      setMessages(m => [...m, { who: 'bot', t: reply }]);
    } catch (e) {
      setMessages(m => [...m, { who: 'bot', t: "Want to talk? Book a 15-min strategy call — link's in the nav 👆" }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)}
              className="fixed bottom-5 right-5 z-50 group"
              aria-label="Open chat">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-br from-ice-300 to-violet-300 opacity-60 group-hover:opacity-90 transition-opacity"/>
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-ice-200 to-ice-400 grid place-items-center text-ink-900 shadow-elev">
            {open ? <X className="w-5 h-5"/> : <Sparkles className="w-5 h-5"/>}
          </div>
        </div>
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass-strong rim rounded-3xl overflow-hidden shadow-elev animate-fade-in">
          <div className="p-4 border-b border-white/8 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ice-200 to-violet-300 grid place-items-center text-ink-900">
                <Bot className="w-4 h-4"/>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-ink-800"/>
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-white">Nova · AI concierge</div>
              <div className="text-[11px] text-white/45 flex items-center gap-1.5">
                <span className="pulse-dot" style={{width:'5px',height:'5px'}}/> Usually replies in seconds
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="thin-scroll h-[320px] overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.who === 'user' ? 'justify-end' : ''}`}>
                {m.who === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ice-200 to-violet-300 grid place-items-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-ink-900"/>
                  </div>
                )}
                <div className={`max-w-[78%] text-[13px] leading-snug px-3 py-2 rounded-2xl ${
                  m.who === 'bot'
                    ? 'bg-white/[0.05] text-white/90 rounded-tl-sm border border-white/8'
                    : 'bg-ice-300 text-ink-900 rounded-tr-sm font-medium'
                }`}>
                  {m.t}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-2 items-center text-white/40 text-[11px]">
                <div className="w-6 h-6 rounded-full bg-white/[0.05] grid place-items-center"><Bot className="w-3.5 h-3.5"/></div>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse"/>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay:'.2s'}}/>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay:'.4s'}}/>
                </span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/8 flex items-center gap-2">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything…"
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-ice-300/40"/>
            <button onClick={send} disabled={!draft.trim() || thinking}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-ice-200 to-ice-400 grid place-items-center text-ink-900 disabled:opacity-40 transition-opacity">
              <Send className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { SectionHeader, Process, Industries, Proof, FinalCTA, Footer, ChatbotWidget });
