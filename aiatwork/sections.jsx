/* ─────────────────────────────────────────────────────────
   AIATWORK redesign — section components
   ───────────────────────────────────────────────────────── */
const { useState, useEffect, useRef, useMemo } = React;

/* ── Hook: reveal on scroll ──────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Logo lockup ─────────────────────────────────────── */
function Logo({ className = "" }) {
  return (
    <a href="#home" className={`flex items-center gap-2.5 ${className}`} aria-label="AIATWORK home">
      <span className="logo-mark" />
      <span className="font-display text-[15px] font-semibold tracking-wide text-white">
        AIAT<span className="text-ice-300">WORK</span>
      </span>
    </a>
  );
}

/* ─────────────────────────────────────────────────────
   1.  NAV
   ───────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Solutions", href: "#solutions" },
    { name: "Process",   href: "#process" },
    { name: "Industries",href: "#industries" },
    { name: "Proof",     href: "#proof" },
    { name: "Insights",  href: "#insights" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "glass rounded-full px-3 py-2" : "px-1 py-1"}`}>
          <Logo />

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {links.map(l => (
              <a key={l.name} href={l.href}
                 className="px-3.5 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                {l.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a href="tel:7038264327" className="text-xs text-white/55 hover:text-white/90 px-3 py-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5"/>(703) 826-4327
            </a>
            <button onClick={() => setLoginOpen(true)} className="text-xs text-white/70 hover:text-white px-3 py-2">Org Login</button>
            <a href="#book" className="btn btn-primary text-[13px] !py-2 !px-4">Book Call <ArrowRight className="w-3.5 h-3.5"/></a>
          </div>

          <button className="lg:hidden p-2 text-white/80" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-3 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.name} href={l.href} onClick={() => setOpen(false)}
                 className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 text-sm">{l.name}</a>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2 flex gap-2">
              <button onClick={() => { setOpen(false); setLoginOpen(true); }} className="flex-1 btn-ghost text-center text-xs !py-2">Org Login</button>
              <a href="#book" className="flex-1 btn btn-primary text-center text-xs !py-2 justify-center">Book Call</a>
            </div>
          </div>
        )}
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}

/* ─────────────────────────────────────────────────────
   1b. LOGIN MODAL — Org access portal
   ───────────────────────────────────────────────────── */
function LoginModal({ open, onClose }) {
  const [view, setView] = useState('login');   // 'login' | 'forgot' | 'success'
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setView('login'); setError(''); setLoading(false);
    setTimeout(() => firstFieldRef.current?.focus(), 80);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;

  const submitLogin = (e) => {
    e?.preventDefault?.();
    setError('');
    if (!email || !email.includes('@')) return setError('Enter a valid work email.');
    if (!pwd || pwd.length < 6)        return setError('Password must be at least 6 characters.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setView('success');
      setTimeout(() => { window.location.href = '../command-center/index.html'; }, 1200);
    }, 900);
  };

  const submitForgot = (e) => {
    e?.preventDefault?.();
    setError('');
    if (!email || !email.includes('@')) return setError('Enter the email on your account.');
    setLoading(true);
    setTimeout(() => { setLoading(false); setView('success'); }, 700);
  };

  return (
    <div className="theme-blue fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Org Login">
      {/* backdrop — deep navy wash */}
      <div className="absolute inset-0 backdrop-blur-md" style={{background:'rgba(3,7,18,0.78)'}} onClick={onClose} />

      {/* fluid mesh accent — blue */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-50"
             style={{background:"radial-gradient(circle, rgba(59,130,246,0.38), transparent 60%)"}}/>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-50"
             style={{background:"radial-gradient(circle, rgba(96,165,250,0.32), transparent 60%)"}}/>
        <div className="absolute top-0 left-0 w-[35vw] h-[35vw] rounded-full blur-3xl opacity-40"
             style={{background:"radial-gradient(circle, rgba(37,99,235,0.30), transparent 60%)"}}/>
      </div>

      <div className="relative w-full max-w-[420px] glass-strong rim rounded-3xl overflow-hidden animate-fade-in">
        {/* Close button */}
        <button onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 grid place-items-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors z-10"
                aria-label="Close">
          <X className="w-3.5 h-3.5"/>
        </button>

        <div className="p-8 sm:p-9">
          {/* Brand mark */}
          <div className="flex items-center gap-2.5 mb-7">
            <span className="logo-mark"/>
            <div>
              <div className="font-display text-[14px] font-semibold tracking-wide text-white leading-tight">
                AIAT<span className="text-sky-300">WORK</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mt-0.5">Org access portal</div>
            </div>
          </div>

          {view === 'login' && (
            <>
              <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                Welcome <span className="font-editorial text-fluid">back.</span>
              </h2>
              <p className="text-[13px] text-white/55 mt-1.5">
                Sign in to your client portal.
              </p>

              <form onSubmit={submitLogin} className="mt-6 space-y-3.5">
                <Field label="Work email">
                  <input ref={firstFieldRef} type="email" autoComplete="email" value={email}
                         onChange={e => setEmail(e.target.value)}
                         placeholder="you@company.com"
                         className="login-input"/>
                </Field>

                <Field label="Password"
                       extra={<button type="button" onClick={() => { setView('forgot'); setError(''); }}
                                       className="text-[11px] text-sky-300 hover:text-white">Forgot?</button>}>
                  <div className="relative">
                    <input type={showPwd ? 'text' : 'password'} autoComplete="current-password"
                           value={pwd} onChange={e => setPwd(e.target.value)}
                           placeholder="••••••••"
                           className="login-input pr-10"/>
                    <button type="button" onClick={() => setShowPwd(s => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[10px] uppercase tracking-widest">
                      {showPwd ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </Field>

                {error && (
                  <div className="text-[12px] text-rose-300 bg-rose-300/10 border border-rose-300/20 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                        className="btn btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60">
                  {loading ? <span className="flex items-center gap-2"><Spinner/> Signing in…</span>
                           : <>Sign in <ArrowRight className="w-4 h-4"/></>}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8"/>
                <span className="text-[10px] uppercase tracking-widest text-white/35">or</span>
                <div className="flex-1 h-px bg-white/8"/>
              </div>

              <div className="space-y-2">
                <button type="button" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setView('success'); setTimeout(() => { window.location.href = '../command-center/index.html'; }, 1200); }, 800); }}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-[13px] text-white/85 transition-colors">
                  <GoogleG/> Continue with Google
                </button>
                <button type="button" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setView('success'); setTimeout(() => { window.location.href = '../command-center/index.html'; }, 1200); }, 800); }}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-[13px] text-white/85 transition-colors">
                  <MicrosoftLogo/> Continue with Microsoft
                </button>
              </div>

              <p className="text-[12px] text-white/45 text-center mt-7">
                Not a client yet?{' '}
                <a href="#book" onClick={onClose} className="text-sky-300 hover:text-white">Book a strategy call →</a>
              </p>
            </>
          )}

          {view === 'forgot' && (
            <>
              <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                Reset your <span className="font-editorial text-fluid">password.</span>
              </h2>
              <p className="text-[13px] text-white/55 mt-1.5">
                We'll send a reset link to your work email.
              </p>

              <form onSubmit={submitForgot} className="mt-6 space-y-3.5">
                <Field label="Work email">
                  <input ref={firstFieldRef} type="email" autoComplete="email" value={email}
                         onChange={e => setEmail(e.target.value)}
                         placeholder="you@company.com"
                         className="login-input"/>
                </Field>

                {error && (
                  <div className="text-[12px] text-rose-300 bg-rose-300/10 border border-rose-300/20 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                        className="btn btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60">
                  {loading ? <span className="flex items-center gap-2"><Spinner/> Sending…</span>
                           : <>Send reset link <ArrowRight className="w-4 h-4"/></>}
                </button>
              </form>

              <button type="button" onClick={() => { setView('login'); setError(''); }}
                      className="text-[12px] text-white/55 hover:text-white mt-6 flex items-center gap-1.5 mx-auto">
                ← Back to sign in
              </button>
            </>
          )}

          {view === 'success' && (
            <div className="py-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-emerald-300/30 to-emerald-300/0 border border-emerald-300/40 grid place-items-center text-emerald-300 mb-5">
                <Check className="w-6 h-6"/>
              </div>
              <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                You're <span className="font-editorial text-fluid">in.</span>
              </h2>
              <p className="text-[13px] text-white/55 mt-2 max-w-xs mx-auto">
                Loading your Command Center…
              </p>
              <div className="mt-5 flex items-center justify-center gap-2 text-white/45 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300/70 animate-pulse"/>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300/70 animate-pulse" style={{animationDelay:'.2s'}}/>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300/70 animate-pulse" style={{animationDelay:'.4s'}}/>
              </div>
            </div>
          )}
        </div>

        {/* Footer strip */}
        <div className="px-8 py-4 border-t border-white/8 bg-white/[0.015] flex items-center justify-between text-[11px] text-white/40">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3"/> Encrypted & SOC-2 aligned
          </div>
          <a href="mailto:support@theaiatwork.com" className="hover:text-white">Need help?</a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, extra, children }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">{label}</span>
        {extra}
      </div>
      {children}
    </label>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/>
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function GoogleG() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.4-1.7 4.2-5.4 4.2-3.3 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.7 14.6 2.7 12 2.7 6.9 2.7 2.8 6.9 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <rect x="2" y="2" width="9" height="9" fill="#F25022"/>
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00"/>
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF"/>
      <rect x="13" y="13" width="9" height="9" fill="#FFB900"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   2.  HERO
   ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative pt-32 lg:pt-40 pb-24 overflow-hidden" aria-label="AI Systems for Business Growth">
      <div className="fluid-mesh"><div className="blob-3"/></div>
      <div className="grain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* ── Left column: copy ──────────── */}
          <div className="lg:col-span-7">
            <a href="#whats-new" className="reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.03] mb-8 hover:bg-white/[0.06] transition group">
              <span className="pulse-dot" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/75">New · Voice Agent 2.0</span>
              <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <h1 className="reveal font-display text-[44px] sm:text-[58px] lg:text-[78px] leading-[0.98] font-semibold tracking-[-0.03em]" style={{transitionDelay:'60ms'}}>
              <span className="text-white">We build it.</span><br/>
              <span className="text-fluid">You just </span>
              <span className="font-editorial text-fluid">log in.</span>
            </h1>

            <p className="reveal mt-7 text-[17px] sm:text-lg text-white/65 max-w-xl leading-relaxed" style={{transitionDelay:'140ms'}}>
              AI infrastructure that answers every lead, books every appointment, and follows up
              until they buy — engineered in-house, deployed in days, owned forever.
            </p>

            <div className="reveal mt-9 flex flex-col sm:flex-row gap-3" style={{transitionDelay:'220ms'}}>
              <a href="#book" className="btn btn-primary">
                Book a free strategy call
                <ArrowRight className="w-4 h-4"/>
              </a>
              <a href="#demo" className="btn btn-ghost">
                <Phone className="w-4 h-4"/>
                Try the AI Receptionist
              </a>
            </div>

            <p className="reveal text-xs text-white/45 mt-4" style={{transitionDelay:'280ms'}}>
              No contracts · No setup fees · Live demo in 15 minutes
            </p>

            {/* Stats */}
            <div className="reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl" style={{transitionDelay:'340ms'}}>
              {[
                { v: "$48M+", l: "Pipeline engineered" },
                { v: "1.2M+", l: "AI conversations" },
                { v: "94%",   l: "60-second response" },
                { v: "24/7",  l: "Revenue coverage" },
              ].map(s => (
                <div key={s.l} className="border-l border-white/10 pl-4">
                  <div className="font-display text-2xl sm:text-[28px] font-semibold text-white tracking-tight">{s.v}</div>
                  <div className="text-[11px] text-white/45 mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: live dashboard mock ───────── */}
          <div className="lg:col-span-5 relative reveal" style={{transitionDelay:'200ms'}}>
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hero dashboard mock — animated voice agent call ─── */
function HeroDashboard() {
  const transcript = [
    { who: "agent", t: "Hi, this is Nova at Aurora Solar. How can I help today?" },
    { who: "lead",  t: "I got a quote last week — is it still valid?" },
    { who: "agent", t: "Let me pull that up… yes, valid through Friday. Want to lock it in?" },
    { who: "lead",  t: "Sure. Tomorrow at 2pm work?" },
    { who: "agent", t: "Booked. I'll text the confirmation to this number." },
  ];

  const [shown, setShown] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setShown(n => (n >= transcript.length ? 2 : n + 1)), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* glow behind */}
      <div aria-hidden className="absolute -inset-8 -z-10 opacity-70"
           style={{background:"radial-gradient(50% 60% at 60% 40%, rgba(167,139,250,0.35), transparent 60%), radial-gradient(40% 50% at 30% 70%, rgba(103,232,249,0.30), transparent 60%)"}}/>

      <div className="glass-strong rim rounded-3xl p-5 shadow-elev float">
        {/* window chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15"/>
            <span className="w-2.5 h-2.5 rounded-full bg-white/15"/>
            <span className="w-2.5 h-2.5 rounded-full bg-white/15"/>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/40">
            <span className="pulse-dot"/> Live call · 1:24
          </div>
          <div className="w-12"/>
        </div>

        {/* caller card */}
        <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-ice-200 to-ice-400 grid place-items-center text-ink-900 font-semibold text-sm">
              JM
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-ink-800"/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">Jordan Mitchell</div>
            <div className="text-[11px] text-white/45">Solar lead · Score 92 · Tier 1</div>
          </div>
          <div className="wave text-ice-300"><span/><span/><span/><span/><span/></div>
        </div>

        {/* transcript */}
        <div className="space-y-2.5 mb-5 thin-scroll overflow-hidden max-h-[220px]">
          {transcript.slice(0, shown).map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.who === "lead" ? "justify-end" : ""}`}>
              {m.who === "agent" && <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300/80 to-violet-300/80 shrink-0 grid place-items-center mt-0.5">
                <Bot className="w-3.5 h-3.5 text-ink-900"/>
              </div>}
              <div className={`max-w-[78%] text-[13px] leading-snug px-3 py-2 rounded-2xl ${
                m.who === "agent"
                  ? "bg-white/[0.05] text-white/90 rounded-tl-sm border border-white/8"
                  : "bg-ice-300 text-ink-900 rounded-tr-sm font-medium"}`}>
                {m.t}
              </div>
            </div>
          ))}
          {shown < transcript.length && (
            <div className="flex gap-2 items-center text-white/40 text-[11px]">
              <div className="w-6 h-6 rounded-full bg-white/[0.05] grid place-items-center"><Bot className="w-3.5 h-3.5"/></div>
              <span className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse"/>
                <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{animationDelay:'.2s'}}/>
                <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{animationDelay:'.4s'}}/>
              </span>
            </div>
          )}
        </div>

        {/* outcome */}
        <div className="rim rounded-2xl p-4 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/8">
          <div className="text-[10px] tracking-widest uppercase text-white/40 mb-2">Outcome captured</div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/30 grid place-items-center text-emerald-300">
              <Calendar className="w-4 h-4"/>
            </div>
            <div className="flex-1">
              <div className="text-sm text-white font-medium">Appointment booked</div>
              <div className="text-[11px] text-white/50">Tue, May 21 · 2:00 PM · Auto-confirmed via SMS</div>
            </div>
            <Check className="w-5 h-5 text-emerald-300"/>
          </div>
        </div>
      </div>

      {/* Floating side card — pipeline */}
      <div className="absolute -bottom-8 -left-8 hidden md:block float" style={{animationDelay:'-2s'}}>
        <div className="glass rim rounded-2xl p-3.5 w-[220px] shadow-glass">
          <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-white/40 mb-2">
            <span>Today's pipeline</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300"/>
          </div>
          <div className="font-display text-2xl font-semibold text-white">$184,200</div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            <span className="text-emerald-300 font-medium">+38%</span>
            <span className="text-white/45">vs last week</span>
          </div>
          <div className="mt-3 flex items-end gap-1 h-8">
            {[40, 55, 35, 70, 50, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-ice-400/40 to-ice-200"
                   style={{height:`${h}%`}}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   3.  TRUST STRIP
   ───────────────────────────────────────────────────── */
function TrustStrip() {
  const items = [
    { icon: Shield, label: "Risk-free build", sub: "Pay when it works" },
    { icon: Clock,  label: "Live in 15 minutes", sub: "On a strategy call" },
    { icon: Zap,    label: "24/7 AI coverage", sub: "Never miss a lead" },
    { icon: Badge,  label: "Built in-house", sub: "Owned & maintained" },
  ];
  return (
    <section className="relative border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" aria-label="Why AIATWORK">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={it.label} className="reveal flex items-center gap-3 p-3" style={{transitionDelay:`${i*40}ms`}}>
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-ice-300/15 to-ice-300/0 border border-ice-300/25 grid place-items-center text-ice-300">
                <it.icon className="w-4 h-4"/>
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-white">{it.label}</div>
                <div className="text-[11px] text-white/45 mt-0.5">{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   4.  WHAT WE BUILD — services grid
   ───────────────────────────────────────────────────── */
function WhatWeBuild() {
  const services = [
    { icon: Globe,     tag: "Growth",       title: "Websites that rank — and get cited by ChatGPT",
      desc: "High-converting sites engineered for page-one Google and AI answer engines.",
      gradient: "from-cyan-300/30 to-blue-400/0" },
    { icon: Mic,       tag: "Automation",   title: "AI Voice Receptionist",
      desc: "24/7 inbound that qualifies leads, books appointments, and routes calls.",
      gradient: "from-violet-300/30 to-cyan-300/0" },
    { icon: Phone,     tag: "Automation",   title: "AI Power Dialer",
      desc: "Multi-line parallel dialing built for teams running 500+ outbound a day.",
      gradient: "from-ice-300/30 to-violet-300/0" },
    { icon: Message,   tag: "Automation",   title: "Automated Text & Email Follow-Up",
      desc: "Every lead contacted in 60 seconds and nurtured for months — on autopilot.",
      gradient: "from-fuchsia-300/30 to-violet-300/0" },
    { icon: BarChart,  tag: "Intelligence", title: "AI-Driven CRM & Dashboards",
      desc: "Pipeline, rep tracking, and predictive deal analytics tuned to your process.",
      gradient: "from-cyan-300/30 to-ice-300/0" },
    { icon: Film,      tag: "Creative",     title: "AI Video & Creative",
      desc: "Cinema-grade AI video plus in-house artists keeping every output on-brand.",
      gradient: "from-violet-300/30 to-fuchsia-300/0" },
  ];

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="solutions" className="relative py-24 lg:py-32" aria-label="AI Automation Solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="AI automation solutions"
          title={<>AI infrastructure<br/>for sales teams that <span className="font-editorial text-fluid">close.</span></>}
          subtitle="Six systems. One source of truth. Every conversation captured, every lead followed up, every outcome measured."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {services.map((s, i) => (
            <article key={s.title}
                     onMouseMove={onMove}
                     className="reveal lift spotlight glass rim rounded-3xl p-7 flex flex-col group"
                     style={{transitionDelay:`${i*50}ms`}}>
              <div className="flex items-start justify-between mb-7">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} border border-white/10 grid place-items-center text-white`}>
                  <s.icon className="w-5 h-5"/>
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">{s.tag}</span>
              </div>
              <h3 className="font-display text-[18px] font-semibold text-white leading-snug mb-2 tracking-tight">{s.title}</h3>
              <p className="text-[13.5px] text-white/55 leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] text-ice-300 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3.5 h-3.5"/>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   5.  SHOWCASE — split feature with interactive tabs
   ───────────────────────────────────────────────────── */
function Showcase() {
  const tabs = [
    { id: 'voice',  label: 'Voice agent',    title: 'Human-grade voice. Inhuman scale.',
      points: ['Sub-300ms latency', 'Real-time CRM lookups', 'Custom voices per brand'],
      preview: 'voice' },
    { id: 'dialer', label: 'Power dialer',   title: '500+ dials a day. Without burning a team.',
      points: ['4-line parallel calling', '77% connect rate', 'Auto local presence'],
      preview: 'dialer' },
    { id: 'crm',    label: 'CRM intelligence', title: 'Pipeline that updates itself.',
      points: ['Predictive deal scoring', 'Rep performance attribution', 'Auto-enriched contacts'],
      preview: 'crm' },
  ];
  const [active, setActive] = useState('voice');
  const cur = tabs.find(t => t.id === active);

  return (
    <section className="relative py-24 lg:py-32" aria-label="Platform showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="reveal text-[11px] uppercase tracking-[0.22em] text-ice-300 font-semibold mb-4">The Platform</p>
            <h2 className="reveal font-display text-[36px] sm:text-[48px] leading-[1.02] tracking-tight font-semibold text-white">
              One stack.<br/>
              <span className="text-fluid">Three superpowers.</span>
            </h2>
            <p className="reveal mt-5 text-white/60 max-w-md leading-relaxed">
              Voice, outbound, and intelligence — built on the same foundation, so every conversation
              feeds every dashboard.
            </p>

            <div className="reveal mt-8 flex flex-wrap gap-2">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActive(t.id)}
                  className={`btn-pill-sm transition-all ${
                    active === t.id
                      ? 'bg-white text-ink-900 shadow-glow'
                      : 'bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/[0.07]'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="reveal mt-8" key={cur.id}>
              <h3 className="font-display text-2xl text-white font-semibold tracking-tight">{cur.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {cur.points.map(p => (
                  <li key={p} className="flex items-center gap-2.5 text-[14px] text-white/75">
                    <span className="w-5 h-5 rounded-full bg-ice-300/15 border border-ice-300/30 grid place-items-center text-ice-300">
                      <Check className="w-3 h-3"/>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 reveal" style={{transitionDelay:'120ms'}}>
            <ShowcasePreview kind={cur.preview}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcasePreview({ kind }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-12 -z-10"
           style={{background:"radial-gradient(60% 60% at 30% 50%, rgba(103,232,249,0.18), transparent 60%), radial-gradient(50% 50% at 80% 50%, rgba(167,139,250,0.18), transparent 60%)"}}/>

      {kind === 'voice' && <VoicePreview/>}
      {kind === 'dialer' && <DialerPreview/>}
      {kind === 'crm' && <CrmPreview/>}
    </div>
  );
}

function VoicePreview() {
  return (
    <div className="glass-strong rim rounded-3xl p-8 min-h-[440px] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-48 h-48 rounded-full grid place-items-center"
             style={{background:"radial-gradient(circle, rgba(168,212,255,0.35) 0%, transparent 70%)"}}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-ice-200 to-ice-400 grid place-items-center shadow-glow">
            <div className="w-20 h-20 rounded-full bg-ink-900/80 grid place-items-center backdrop-blur">
              <div className="wave text-ice-200" style={{height:'28px'}}>
                <span style={{height:'8px'}}/><span style={{height:'20px'}}/><span style={{height:'28px'}}/><span style={{height:'16px'}}/><span style={{height:'22px'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="text-[10px] uppercase tracking-widest text-white/45 mb-2">Speaking · 0:24</div>
        <p className="font-editorial text-2xl text-white/90">
          "Of course — let me check Tuesday at two for you."
        </p>
      </div>
      <div className="mt-8 flex gap-2 flex-wrap justify-center">
        {['Aurora · Solar', 'Glow Med Spa', 'Northstar HVAC', 'Atlas Realty'].map((b,i) => (
          <span key={b} className={`btn-pill-sm border ${i===0 ? 'border-ice-300/40 bg-ice-300/10 text-ice-200' : 'border-white/10 text-white/45'}`}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function DialerPreview() {
  const calls = [
    { n: '(415) 555-0188', who: 'Sarah Wen',     s: 'connected', t: '0:42' },
    { n: '(202) 555-0143', who: 'Marcus Patel',  s: 'ringing',   t: '0:08' },
    { n: '(617) 555-0162', who: 'Alex Brooks',   s: 'voicemail', t: '0:21' },
    { n: '(310) 555-0179', who: 'Priya Shah',    s: 'connected', t: '1:14' },
  ];
  const tone = { connected: 'text-emerald-300 bg-emerald-300/10 border-emerald-300/25',
                 ringing: 'text-ice-300 bg-ice-300/10 border-ice-300/25',
                 voicemail: 'text-white/45 bg-white/5 border-white/10' };
  return (
    <div className="glass-strong rim rounded-3xl p-6 min-h-[440px]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">Outbound queue</div>
          <div className="font-display text-2xl font-semibold text-white mt-0.5">4 lines · live</div>
        </div>
        <div className="flex gap-2">
          <span className="btn-pill-sm border border-white/10 text-white/50">347/500 today</span>
          <span className="btn-pill-sm border border-emerald-300/30 text-emerald-300 bg-emerald-300/10">77% connect</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {calls.map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.025] border border-white/8">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/15 to-white/0 border border-white/10 grid place-items-center text-white/80 text-[11px] font-semibold">
              {c.who.split(' ').map(p=>p[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{c.who}</div>
              <div className="text-[11px] text-white/45">{c.n}</div>
            </div>
            <span className={`btn-pill-sm border ${tone[c.s]}`}>
              {c.s === 'connected' && <span className="wave"><span/><span/><span/></span>}
              {c.s}
            </span>
            <span className="text-[11px] text-white/45 tabular-nums w-10 text-right">{c.t}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[{l:'Calls today', v:'347'},{l:'Avg talk', v:'2:14'},{l:'Booked', v:'28'}].map(s => (
          <div key={s.l} className="rounded-2xl bg-white/[0.025] border border-white/8 p-3 text-center">
            <div className="font-display text-xl text-white font-semibold">{s.v}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrmPreview() {
  const stages = [
    { name: 'New',         v: 142, pct: 100, deals: ['Lumen Co.', 'Brightline', 'Halo Health'] },
    { name: 'Qualified',   v: 68,  pct: 70,  deals: ['Vector Labs', 'Atlas Realty'] },
    { name: 'Demo',        v: 31,  pct: 50,  deals: ['Northstar HVAC'] },
    { name: 'Closed-won',  v: 12,  pct: 28,  deals: ['Aurora Solar'] },
  ];
  return (
    <div className="glass-strong rim rounded-3xl p-6 min-h-[440px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">Pipeline · this quarter</div>
          <div className="font-display text-2xl font-semibold text-white mt-0.5">$2.4M forecasted</div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/55">
          <Sparkles className="w-3.5 h-3.5 text-ice-300"/> AI-updated 2 min ago
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {stages.map(s => (
          <div key={s.name}>
            <div className="flex items-center justify-between text-[11px] text-white/55 mb-2">
              <span>{s.name}</span><span className="text-white">{s.v}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-ice-300 to-violet-300"
                   style={{width:`${s.pct}%`}}/>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {[
          { name: 'Aurora Solar',     amt: '$148,400', score: 96, stage: 'Demo' },
          { name: 'Vector Labs',      amt: '$92,200',  score: 84, stage: 'Qualified' },
          { name: 'Northstar HVAC',   amt: '$74,800',  score: 78, stage: 'Demo' },
          { name: 'Halo Health',      amt: '$56,000',  score: 71, stage: 'New' },
        ].map(d => (
          <div key={d.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.025] border border-white/8">
            <div className="w-2 h-10 rounded-full bg-gradient-to-b from-ice-300 to-violet-300"/>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">{d.name}</div>
              <div className="text-[11px] text-white/45">{d.stage} · score {d.score}</div>
            </div>
            <div className="text-sm font-display font-semibold text-white tabular-nums">{d.amt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Logo, Navbar, Hero, TrustStrip, WhatWeBuild, Showcase, useReveal });
