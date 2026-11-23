import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { id: 'home', label: 'HOME', href: '/#home' },
  { id: 'about', label: 'ABOUT', href: '/#about' },
  { id: 'work', label: 'WORK', href: '/#work' },
  { id: 'skills', label: 'SKILLS', href: '/#skills' },
  { id: 'education', label: 'EDUCATION', href: '/#education' },
  { id: 'insights', label: 'INSIGHTS', href: '/#insights' },
  { id: 'contact', label: 'CONTACT', href: '/#contact' },
];

function readProfileNameFromStorage() {
  try {
    const candidateKeys = [
      'portfolioData',
      'portfolio_data',
      'cmsData',
      'cms_data',
      'portfolio_profile',
      'profile',
    ];
    for (const key of candidateKeys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed?.profile?.name) return parsed.profile.name;
      if (parsed?.profile?.full_name) return parsed.profile.full_name;
      if (parsed?.name) return parsed.name;
      if (parsed?.full_name) return parsed.full_name;
    }
  } catch {
    // Preserve silent fallback if localStorage is unavailable
  }
  return '';
}

export default function Navbar({ brandName, adminRoute = '/admin' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [storedName, setStoredName] = useState(() => readProfileNameFromStorage());
  const location = useLocation();

  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 14);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync brand initials if CMS localStorage updates
  useEffect(() => {
    const syncStorage = () => setStoredName(readProfileNameFromStorage());
    window.addEventListener('storage', syncStorage);
    window.addEventListener('cmsUpdated', syncStorage);
    window.addEventListener('portfolioUpdated', syncStorage);
    return () => {
      window.removeEventListener('storage', syncStorage);
      window.removeEventListener('cmsUpdated', syncStorage);
      window.removeEventListener('portfolioUpdated', syncStorage);
    };
  }, []);

  // Scroll-spy for active bottom-bar indicator on HomePage
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = NAV_LINKS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-32% 0px -56% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const effectiveName = brandName || storedName || 'P F';
  const monogram = effectiveName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('.');

  const handleSectionClick = (e, id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);

    if (isHomePage) {
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(10,25,47,0.12)]'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* Bloomberg-Inspired Top Financial Status Strip */}
      <div className="bg-[#0A192F] text-white border-b border-[#1D3557]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-7 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tabular tracking-[0.14em]">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            <span className="inline-flex items-center gap-2 text-slate-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] live-terminal-dot" />
              <span>EXECUTIVE DOSSIER</span>
            </span>
            <span className="hidden sm:inline text-slate-400 shrink-0">
              SECTOR <span className="text-[#EAB308] ml-1">ECONOMICS · FINANCE · STRATEGY</span>
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to={adminRoute}
              className="text-slate-300 hover:text-[#EAB308] transition-colors uppercase"
              title="Open Portfolio CMS"
            >
              CMS
            </Link>
          </div>
        </div>
      </div>

      {/* Main Minimalist Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[74px] flex items-center justify-between">
        {/* Left: Gold-Bordered Monogram Box + Dark Navy Wordmark */}
        <Link
          to="/"
          onClick={(e) => handleSectionClick(e, 'home')}
          className="inline-flex items-center gap-3.5 group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center px-2.5 py-1 border-[1.5px] border-[#B45309] text-[#B45309] font-mono-tabular text-xs font-semibold tracking-[0.18em] group-hover:bg-[#0A192F] group-hover:border-[#0A192F] group-hover:text-white transition-colors duration-300">
            {monogram || 'P.F'}.
          </span>
          <span className="font-display text-sm font-extrabold tracking-[0.24em] text-[#0A192F] uppercase">
            PROFILE
          </span>
        </Link>

        {/* Right: Tracked Uppercase Links with Flush Bottom Underline Indicator */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center h-full gap-7 lg:gap-9">
          {NAV_LINKS.map((item) => {
            const isActive = isHomePage && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSectionClick(e, item.id)}
                className={`relative h-full inline-flex items-center text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-[#B45309]'
                    : 'text-slate-500 hover:text-[#0A192F]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#B45309] transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-[#0A192F] hover:text-[#B45309] transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-1">
          {NAV_LINKS.map((item) => {
            const isActive = isHomePage && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSectionClick(e, item.id)}
                className={`block py-2.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
                  isActive
                    ? 'text-[#B45309] border-l-2 border-[#B45309] pl-3'
                    : 'text-slate-600 hover:text-[#0A192F] pl-3'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
