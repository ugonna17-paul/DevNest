import { AuthNavbar } from './AuthNavbar';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

export function AuthLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <AuthNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:ml-64 pt-[57px]">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
