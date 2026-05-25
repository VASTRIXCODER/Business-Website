/* AIATWORK Command Center — main app */
function App() {
  useReveal();
  const { push: pushToast, node: toastsNode } = useToasts();
  const [section, setSection] = useState(() => location.hash.replace('#','') || 'overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    location.hash = section;
  }, [section]);

  useEffect(() => {
    const onHash = () => setSection(location.hash.replace('#','') || 'overview');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (id) => { setSection(id); setMobileNavOpen(false); window.scrollTo(0, 0); };

  const handleLogout = () => {
    pushToast({ msg:'Signing out…' });
    setTimeout(() => { location.href = '../aiatwork/index.html'; }, 600);
  };

  const renderSection = () => {
    switch (section) {
      case 'overview':      return <Overview onNavigate={navigate} pushToast={pushToast}/>;
      case 'leads':         return <Leads pushToast={pushToast}/>;
      case 'companies':     return <Companies/>;
      case 'pipelines':     return <Pipelines pushToast={pushToast}/>;
      case 'tasks':         return <Tasks pushToast={pushToast}/>;
      case 'interactions':  return <AIInteractions/>;
      case 'conversations': return <Conversations pushToast={pushToast}/>;
      case 'bookings':      return <Bookings pushToast={pushToast}/>;
      case 'analytics':     return <Analytics/>;
      case 'chat':          return <TeamChat pushToast={pushToast}/>;
      case 'dm':            return <DirectMessages pushToast={pushToast}/>;
      case 'jarvis':        return <JarvisControl pushToast={pushToast}/>;
      case 'integrations':  return <Integrations pushToast={pushToast}/>;
      case 'settings':      return <SettingsSection pushToast={pushToast}/>;
      case 'users':         return <UserManagement pushToast={pushToast}/>;
      case 'workspaces':    return <Workspaces/>;
      case 'logs':          return <SystemLogs/>;
      case 'requests':      return <AccountRequests pushToast={pushToast}/>;
      case 'projects':      return <Projects/>;
      case 'rephub':        return <RepHub/>;
      case 'leaderboard':   return <Leaderboard/>;
      default:              return <Overview onNavigate={navigate} pushToast={pushToast}/>;
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          active={section}
          onSelect={navigate}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(c => !c)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)}/>
          <div className="absolute top-0 left-0 bottom-0">
            <Sidebar
              active={section}
              onSelect={navigate}
              collapsed={false}
              onToggleCollapse={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden h-12 flex items-center px-3 gap-3 border-b border-white/[0.05] bg-ink-950/70 backdrop-blur sticky top-0 z-40">
          <button onClick={() => setMobileNavOpen(true)} className="btn-icon"><Dashboard className="w-4 h-4"/></button>
          <span className="logo-mark logo-mark-sm"/>
          <div className="font-display text-[13px] font-semibold text-white tracking-wide">
            AIAT<span className="text-crimson-300">WORK</span>
          </div>
          <div className="flex-1"/>
          <Avatar userId="u1"/>
        </div>

        <div className="hidden lg:block">
          <Topbar section={section} onLogout={handleLogout}/>
        </div>

        <main className="flex-1 px-4 md:px-6 py-5 overflow-x-hidden">
          {renderSection()}
        </main>
      </div>

      {toastsNode}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
