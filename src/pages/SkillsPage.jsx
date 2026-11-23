import React, { useState } from 'react';
import { Award, BarChart3, Briefcase, CheckCircle2, Leaf, TrendingUp } from 'lucide-react';
import { TECHNICAL_BUSINESS_STACK } from '../data/portfolioData';

const PILLAR_ICONS = {
  Finance: TrendingUp,
  Business: Briefcase,
  Analytics: BarChart3,
  Sustainability: Leaf,
};

export default function SkillsPage({ skills, profile, onNavigate }) {
  const [activePillar, setActivePillar] = useState('All');

  const visiblePillars =
    activePillar === 'All' ? skills : skills.filter((s) => s.category === activePillar);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Competency Architecture
          </div>
          <h1 className="mt-1 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
            4-Pillar Business, Finance, Analytics &amp; ESG Skills Matrix
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Structured across the four core domains required in modern financial analysis, business intelligence, and management consulting.
          </p>
        </div>

        {/* Pillar Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['All', ...skills.map((s) => s.category)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActivePillar(cat)}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                activePillar === cat
                  ? 'bg-navy-900 text-white dark:bg-emerald-700'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-navy-900 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Pillar Visual Ratings */}
      <div className="grid gap-6 md:grid-cols-2">
        {visiblePillars.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar.category] || TrendingUp;
          return (
            <section
              key={pillar.category}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white dark:bg-navy-850 dark:text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                      {pillar.category}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {pillar.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                        {item.tool && (
                          <span className="ml-2 text-slate-500 dark:text-slate-400">
                            ({item.tool})
                          </span>
                        )}
                      </div>
                      <span className="font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-navy-950">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-navy-900 to-emerald-600 transition-all duration-500 dark:from-emerald-600 dark:to-emerald-400"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Technical Business Stack */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-navy-900">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy-900 dark:text-white">
              Technical Business &amp; Analytics Toolset
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Daily quantitative modeling, business intelligence, and enterprise reporting software
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            See Tools Applied in Case Studies →
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNICAL_BUSINESS_STACK.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{tool.name}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tool.category}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Academic Credentials */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-navy-900">
        <div className="flex items-center gap-2.5">
          <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="font-serif text-2xl font-bold text-navy-900 dark:text-white">
            Certifications &amp; Specialized Training
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {profile.certifications.map((cert) => (
            <div
              key={cert.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-navy-950"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>{cert.issuer}</span>
                <span>{cert.year}</span>
              </div>
              <h3 className="mt-1.5 text-base font-bold text-navy-900 dark:text-white">
                {cert.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Focus: {cert.focus}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
