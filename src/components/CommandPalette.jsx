import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Download,
  FileText,
  FolderKanban,
  MessageSquare,
  Search,
  UserCheck,
  X,
} from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  projects,
  onNavigate,
  onSelectProject,
  onDownloadCv,
  onOpenAi,
  profile,
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const quickPages = [
    { id: 'recruiter', label: 'Recruiter Dashboard (1-Screen Hiring Brief)', icon: UserCheck },
    { id: 'projects', label: 'Consulting Case Studies Library', icon: FolderKanban },
    { id: 'resume', label: 'ATS-Friendly Resume / CV', icon: FileText },
    { id: 'skills', label: '4-Pillar Skills Matrix (Finance, Business, Analytics, ESG)', icon: ArrowRight },
    { id: 'about', label: 'About Me & OsloMet Academic Journey', icon: ArrowRight },
    { id: 'contact', label: 'Contact & Interview Scheduling', icon: ArrowRight },
    { id: 'admin', label: 'Admin CMS Studio', icon: ArrowRight },
  ];

  const q = query.toLowerCase().trim();
  const filteredPages = quickPages.filter((p) => p.label.toLowerCase().includes(q));
  const filteredProjects = projects
    .filter(
      (proj) =>
        proj.title.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        (proj.technologies || []).some((t) => t.toLowerCase().includes(q))
    )
    .slice(0, 5);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Command Search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 pt-20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-navy-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies, Excel/Power BI skills, or jump to a page..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-navy-850"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quick Actions
          </div>
          <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">
            <a
              href={profile.resumeUrl}
              download="Hassan_Abdirahman_Mohammud_CV.pdf"
              onClick={() => {
                onDownloadCv();
                onClose();
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF Resume</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAi();
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-navy-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-navy-850"
            >
              <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
              <span>Ask AI Recruiter Assistant</span>
            </button>
          </div>

          {filteredPages.length > 0 && (
            <>
              <div className="mt-4 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Sections
              </div>
              <div className="mt-1 space-y-1">
                {filteredPages.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-navy-850"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Jump</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {filteredProjects.length > 0 && (
            <>
              <div className="mt-4 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Case Studies
              </div>
              <div className="mt-1 space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(proj);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-100 dark:hover:bg-navy-850"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{proj.title}</div>
                      <div className="text-[11px] text-slate-500">{proj.category}</div>
                    </div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-navy-850 dark:text-slate-300">
                      Open
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
