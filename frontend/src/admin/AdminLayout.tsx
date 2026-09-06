import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Code2, LogOut, Mail, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleNavigate = () => setIsSidebarOpen(false);

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { path: '/admin/skills', icon: <Code2 size={20} />, label: 'Skills' },
    { path: '/admin/messages', icon: <Mail size={20} />, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-background lg:flex">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col bg-[#0a0a0a] border-r border-white/5 transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={handleNavigate} className="text-xl font-heading font-bold tracking-wider text-text">
            VJ<span className="text-accent">Admin</span>.
            </Link>
            <button type="button" aria-label="Close navigation" onClick={() => setIsSidebarOpen(false)} className="text-[#888] lg:hidden">
              <X size={22} />
            </button>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                location.pathname === item.path 
                  ? 'bg-accent/10 border-l-2 border-accent text-accent' 
                  : 'text-[#888] hover:bg-white/5 hover:text-text'
              }`}
            >
              {item.icon}
              <span className="font-body">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-[#888] hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors"
          >
            <LogOut size={20} />
            <span className="font-body">Logout</span>
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-4 py-4 sm:px-6 lg:hidden">
          <button type="button" aria-label="Open navigation" onClick={() => setIsSidebarOpen(true)} className="text-[#aaa] hover:text-accent">
            <Menu size={24} />
          </button>
          <Link to="/" className="text-lg font-heading font-bold tracking-wider text-text">
            VJ<span className="text-accent">Admin</span>.
          </Link>
          <span className="w-6" aria-hidden="true" />
        </div>
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
