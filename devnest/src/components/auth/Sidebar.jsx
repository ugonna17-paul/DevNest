import { 
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Settings,
  LogOut,
  ChevronRight,
  Code2,
  Terminal,
  CreditCard,
  Shield
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const languages = [
  { name: 'HTML Fundamentals', path: '/course/html', icon: Code2 },
  { name: 'CSS Styling', path: '/course/css', icon: Code2 },
  { name: 'JavaScript Essentials', path: '/course/javascript', icon: Code2 },
];

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathsExpanded, setPathsExpanded] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.role === 'admin');
  }, []);

  const isActive = (path) => location.pathname === path;
  const isLanguageActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-[57px] bottom-0 w-64 overflow-y-auto bg-[#161B22] border-r border-[#30363D] z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
      <div className="p-4 space-y-1">
        {/* Admin Section - Show ONLY for Admins */}
        {isAdmin ? (
          <>
            <div className="px-3 py-2 mb-4">
              <div className="flex items-center gap-2 text-[#1F6FEB] mb-2">
                <Shield size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider">Admin Dashboard</span>
              </div>
              <p className="text-[#8B949E] text-xs">
                Manage payments and users
              </p>
            </div>

            <Link to="/admin/payments" onClick={handleLinkClick}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#0D1117] transition-colors cursor-pointer ${
                  isActive('/admin/payments') ? 'bg-[#0D1117] text-[#1F6FEB]' : 'text-[#C9D1D9]'
                }`}
              >
                <CreditCard size={18} />
                <span className="text-sm font-medium">Payment Management</span>
              </div>
            </Link>
          </>
        ) : (
          <>
            {/* Regular User Menu */}
            {/* Dashboard */}
            <Link to="/dashboard" onClick={handleLinkClick}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#0D1117] transition-colors cursor-pointer ${
                  isActive('/dashboard') ? 'bg-[#0D1117] text-[#1F6FEB]' : 'text-[#C9D1D9]'
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </Link>

            {/* Learning Paths */}
            <div>
              <button
                onClick={() => setPathsExpanded(!pathsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#0D1117] transition-colors text-[#C9D1D9]"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={18} />
                  <span className="text-sm font-medium">Learning Paths</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`transition-transform ${pathsExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              {/* Language List */}
              {pathsExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {languages.map((lang) => {
                    const LangIcon = lang.icon;
                    return (
                      <Link key={lang.path} to={lang.path} onClick={handleLinkClick}>
                        <div
                          className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0D1117] hover:text-[#C9D1D9] transition-all cursor-pointer ${
                            isLanguageActive(lang.path) 
                              ? 'bg-[#0D1117] text-[#1F6FEB] border-l-2 border-[#1F6FEB]' 
                              : 'text-[#8B949E] border-l-2 border-transparent'
                          }`}
                        >
                          <LangIcon size={16} />
                          <span className="text-sm">{lang.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Projects */}
            <Link to="/projects" onClick={handleLinkClick}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#0D1117] transition-colors cursor-pointer ${
                  isActive('/projects') ? 'bg-[#0D1117] text-[#1F6FEB]' : 'text-[#C9D1D9]'
                }`}
              >
                <FolderKanban size={18} />
                <span className="text-sm font-medium">Projects</span>
              </div>
            </Link>

            {/* Playground */}
            <Link to="/playground" onClick={handleLinkClick}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#0D1117] transition-colors cursor-pointer ${
                  isActive('/playground') ? 'bg-[#0D1117] text-[#1F6FEB]' : 'text-[#C9D1D9]'
                }`}
              >
                <Terminal size={18} />
                <span className="text-sm font-medium">Playground</span>
              </div>
            </Link>
          </>
        )}

        {/* Divider */}
        <hr className="my-4 border-[#30363D]" />

        {/* Settings */}
        <Link to="/settings" onClick={handleLinkClick}>
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#0D1117] transition-colors cursor-pointer ${
              isActive('/settings') ? 'bg-[#0D1117] text-[#1F6FEB]' : 'text-[#C9D1D9]'
            }`}
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#0D1117] hover:text-[#C9D1D9] transition-colors cursor-pointer text-[#8B949E]"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
