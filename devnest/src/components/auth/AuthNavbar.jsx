import { 
  Search, 
  Bell, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthNavbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to home
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117] border-b border-[#30363D]">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden text-[#C9D1D9] hover:text-[#58A6FF] transition-colors mr-3"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/dashboard">
          <span className="font-bold tracking-tight text-[18px] md:text-[20px] text-[#C9D1D9]">
            DevNest
          </span>
        </Link>

        {/* Global Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E]"
            />
            <input
              type="text"
              placeholder="Search lessons, topics..."
              className="w-full pl-10 pr-4 py-2 border bg-[#161B22] border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors text-sm"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <button className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors relative">
            <Bell size={18} className="md:hidden" />
            <Bell size={20} className="hidden md:block" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#1F6FEB]"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border bg-[#161B22] border-[#30363D] flex items-center justify-center">
                <User size={16} className="md:hidden text-[#8B949E]" />
                <User size={18} className="hidden md:block text-[#8B949E]" />
              </div>
              <span className="hidden md:block text-[#C9D1D9] text-sm font-medium max-w-[120px] truncate">
                {user.name || 'User'}
              </span>
              <ChevronDown size={16} className="hidden md:block text-[#8B949E]" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#161B22] border border-[#30363D] rounded-lg shadow-lg overflow-hidden">
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                  <button className="w-full px-4 py-3 flex items-center gap-3 text-[#C9D1D9] hover:bg-[#0D1117] transition-colors text-left">
                    <User size={16} />
                    Profile
                  </button>
                </Link>
                <Link to="/settings" onClick={() => setDropdownOpen(false)}>
                  <button className="w-full px-4 py-3 flex items-center gap-3 text-[#C9D1D9] hover:bg-[#0D1117] transition-colors text-left">
                    <Settings size={16} />
                    Settings
                  </button>
                </Link>
                <hr className="border-[#30363D]" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center gap-3 text-[#8B949E] hover:bg-[#0D1117] transition-colors text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
