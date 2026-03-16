import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Code2, LogOut, Mail } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { path: '/admin/skills', icon: <Code2 size={20} />, label: 'Skills' },
    { path: '/admin/messages', icon: <Mail size={20} />, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-xl font-heading font-bold tracking-wider text-text">
            VJ<span className="text-accent">Admin</span>.
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-10 max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
