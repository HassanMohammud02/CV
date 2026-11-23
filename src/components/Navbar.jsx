import React, { useState } from 'react';
import {
  Briefcase,
  Command,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  UserCheck,
  X,
} from 'lucide-react';
import executiveSeal from '../assets/executive-seal.svg';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'recruiter', label: 'Recruiter View' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume / CV' },
  { id: 'projects', label: 'Case Studies' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Insights' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({
  activePage,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  onOpenCommandPalette,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-navy-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <img
            src={executiveSeal}
            alt="Hassan Abdirahman Mohammud Monogram"
            className="h-9 w-9 rounded-lg shadow-sm transition-transform group-hover:scale-105"
          />
          <div>
            <div className="text-sm font-bold tracking-tight text-navy-900 dark:text-white sm:text-base">
              Hassan A. Mohammud
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Economics &amp; Business Analytics • OsloMet
            </div>
          </div>
        </button>

        {/* Desktop Links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm dark:bg-emerald-700 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900 dark:text-slate-300 dark:hover:bg-navy-850 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            title="Quick Search & Navigation (Ctrl+K)"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:border-slate-600 sm:flex"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search</span>
            <kbd className="inline-flex items-center gap-0.5 rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => handleNav('admin')}
            className={`hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition sm:inline-flex ${
              activePage === 'admin'
                ? 'border-amber-600 bg-amber-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200 dark:hover:border-emerald-500'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>CMS</span>
          </button>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 hover:text-navy-900 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:bg-navy-850 dark:hover:text-white"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 xl:hidden dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden dark:border-slate-800 dark:bg-navy-950">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition ${
                    isActive
                      ? 'bg-navy-900 text-white dark:bg-emerald-700'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-navy-900 dark:text-slate-200'
                  }`}
                >
                  {item.id === 'recruiter' ? (
                    <UserCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Briefcase className="h-3.5 w-3.5 opacity-60" />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition ${
                activePage === 'admin'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
