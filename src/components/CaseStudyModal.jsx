import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FolderKanban,
  Github,
  Lightbulb,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import ProjectVisual from './ProjectVisual';

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const cs = project.caseStudy || {};

  const sections = [
    {
      title: '1. Business Problem',
      content: cs.problem,
      icon: Target,
      accent: 'text-rose-700 dark:text-rose-400',
    },
    {
      title: '2. Quantitative & Strategic Analysis',
      content: cs.analysis,
      icon: TrendingUp,
      accent: 'text-navy-900 dark:text-sky-400',
    },
    {
      title: '3. Methodology & Modeling Approach',
      content: cs.methodology,
      icon: FolderKanban,
      accent: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      title: '4. Quantified Results & Impact',
      content: cs.results,
      icon: CheckCircle2,
      accent: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      title: '5. Executive Recommendations',
      content: cs.recommendations,
      icon: ArrowUpRight,
      accent: 'text-amber-700 dark:text-amber-400',
    },
    {
      title: '6. Key Analytical Learnings',
      content: cs.keyLearnings,
      icon: Lightbulb,
      accent: 'text-indigo-700 dark:text-indigo-400',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-navy-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-navy-900/95">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {project.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {project.clientOrContext || 'Executive Case Study'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Case Study"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-navy-850 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Visual Banner */}
        <ProjectVisual project={project} heightClass="h-52 sm:h-60" />

        {/* Case Study Body */}
        <div className="p-6 sm:p-8">
          <h2
            id="case-study-title"
            className="font-serif text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl"
          >
            {project.title}
          </h2>
          {project.subtitle && (
            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              {project.subtitle}
            </p>
          )}

          {/* Metadata & KPIs */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Published: {project.datePublished}</span>
            </span>
            {project.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Duration: {project.duration}</span>
              </span>
            )}
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950"
                >
                  <div className="text-xl font-bold tabular-nums text-navy-900 dark:text-emerald-400">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6-Part Consulting Breakdown */}
          <div className="mt-8 space-y-6">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.title}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-navy-950/60"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${sec.accent}`} />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 dark:text-white">
                      {sec.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {sec.content || 'Detailed analytical documentation available upon request.'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tools & Repository Links */}
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center dark:border-slate-800">
            <div className="flex flex-wrap gap-1.5">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-navy-850 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-navy-850"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Repository</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-navy-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
