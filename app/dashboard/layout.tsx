'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { 
  Shield, Home, Key, FileCode, Activity, 
  BarChart3, Settings, Menu, X, Terminal
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { name: 'Profiles', href: '/dashboard/profiles', icon: FileCode },
    { name: 'Playground', href: '/dashboard/playground', icon: Terminal },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Width set to 260px for optimal readability */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] bg-slate-50/50 border-r border-slate-200 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
            <Link href="/" className="flex items-center gap-2.5">
              <Shield className="h-6 w-6 text-indigo-600" />
              <span className="text-lg font-bold tracking-tight text-slate-900">Guardrailz</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-[14px] font-medium transition-colors",
                    isActive 
                      ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-indigo-600" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 bg-white/50">
             <div className="flex items-center gap-3 px-2">
                <UserButton afterSignOutUrl="/" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-900">Account</span>
                  <span className="text-[10px] text-slate-500">Professional Plan</span>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 bg-white sticky top-0 z-30">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100">System Live</Badge>
          </div>
        </header>

        <main className="flex-1 bg-white p-8">
          <div className="max-w-7xl mx-auto text-[16px]">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}