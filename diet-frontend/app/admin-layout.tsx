'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore, useThemeStore } from '@/utils/store';
import BrandLogo from '@/components/BrandLogo';
import './admin-layout.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout, setFromStorage } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setFromStorage();
    setMounted(true);
  }, [setFromStorage]);

  useEffect(() => {
    if (mounted && !isAuthenticated && !localStorage.getItem('token')) {
      if (pathname !== '/login' && pathname !== '/register') {
        router.push('/login');
      }
    }
  }, [mounted, isAuthenticated, pathname, router]);

  if (!mounted) return null;

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 shadow-lg transition-all duration-300 fixed h-screen overflow-y-auto z-40`}>
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && <BrandLogo size={34} textClassName="text-2xl font-bold text-white" variant="dark" />}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded transition"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <div className="space-y-3">
          <NavLink href="/dashboard" icon="📊" label="Dashboard" open={sidebarOpen} active={pathname === '/dashboard'} />
          <NavLink href="/food-log" icon="🍽️" label="Food Log" open={sidebarOpen} active={pathname.startsWith('/food-log')} />
          <NavLink href="/analytics" icon="📈" label="Analytics" open={sidebarOpen} active={pathname.startsWith('/analytics')} />
          <NavLink href="/goals" icon="🎯" label="Goals" open={sidebarOpen} active={pathname.startsWith('/goals')} />
          <NavLink href="/assistant" icon="💬" label="Nutrition Chat" open={sidebarOpen} active={pathname.startsWith('/assistant')} />
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-red-600 transition text-left ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-30 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BrandLogo size={28} withText={false} variant="light" />
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {user?.name}! 👋</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <div className="text-sm text-gray-600">{user?.email}</div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label, open, active }: { href: string; icon: string; label: string; open: boolean; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded transition ${
        active ? 'bg-blue-600 text-white shadow' : 'hover:bg-gray-700'
      } ${
        !open && 'justify-center'
      }`}
      title={!open ? label : ''}
    >
      <span>{icon}</span>
      {open && <span>{label}</span>}
    </Link>
  );
}
