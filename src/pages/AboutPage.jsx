import React, { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Target,
} from 'lucide-react';
import { INITIAL_AREAS_OF_INTEREST } from '../data/portfolioData';

export default function AboutPage({ profile, experience, onNavigate }) {
  const [selectedArea, setSelectedArea] = useState(INITIAL_AREAS_OF_INTEREST[0]);

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header & Executive Narrative */}
      <section className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            About Me &amp; Academic Foundation
          </div>
          <h1 className="mt-2 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
            Bridging Economic Theory, Data Analytics, and Frontline Commercial Execution
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            I am a Bachelor in Economics and Business Administration (<em>Økonomi og Administrasjon</em>) graduate from <strong>Oslo Metropolitan University (OsloMet)</strong> with a strong analytical focus on corporate finance, budgeting, accounting, ESG reporting, and business intelligence.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Alongside my academic training in Oslo, my commercial role in customer relations at <strong>IKEA Norway</strong> and my financial leadership in student organizations taught me how numbers connect to real operational workflows. Whether reconciling budgets, analyzing margin variances in Excel and Power BI, or resolving high-pressure customer cases, I bring calm structure, accountability, and clear communication.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-navy-900">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white">
                <Target className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                <span>Professional Goals</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Build a consulting and financial analysis career helping Nordic organizations modernize financial reporting, strengthen ESG transparency, and embed data-driven decision workflows.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-navy-900">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white">
                <HeartHandshake className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Leadership &amp; Teamwork Values</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Lead with empirical clarity, listen actively to frontline stakeholders, maintain transparent financial stewardship, and turn complex analysis into practical next steps.
              </p>
            </div>
          </div>
        </div>

        {/* OsloMet Education Highlight Card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white dark:bg-emerald-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  University Degree
                </div>
                <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                  {profile.university}
                </h2>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-navy-950">
              <div className="text-sm font-bold text-navy-900 dark:text-white">
                {profile.degree}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Oslo, Norway • Class of {profile.graduationYear}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Key Academic Modules</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {[
                  'Financial Accounting',
                  'Managerial Accounting',
                  'Corporate Finance',
                  'Investment Analysis',
                  'Macroeconomics',
                  'Quantitative Statistics',
                  'Corporate Strategy',
                  'Organization & Leadership',
                ].map((mod) => (
                  <div
                    key={mod}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 px-2.5 py-2 font-medium text-slate-700 dark:border-slate-800 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Areas of Interest */}
      <section>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          <Compass className="h-4 w-4" />
          <span>Core Domains</span>
        </div>
        <h2 className="mt-1 font-serif text-3xl font-bold text-navy-900 dark:text-white">
          Areas of Professional Interest
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-wrap gap-2 lg:col-span-5 lg:flex-col">
            {INITIAL_AREAS_OF_INTEREST.map((area) => {
              const active = selectedArea.id === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    active
                      ? 'border-navy-900 bg-navy-900 text-white shadow-sm dark:border-emerald-600 dark:bg-emerald-700'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-600/50 dark:border-slate-800 dark:bg-navy-900 dark:text-slate-200'
                  }`}
                >
                  <span className="text-sm font-bold">{area.title}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-500 dark:bg-navy-850 dark:text-slate-400'
                    }`}
                  >
                    {area.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7 dark:border-slate-800 dark:bg-navy-900">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {selectedArea.tag}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-bold text-navy-900 dark:text-white">
              {selectedArea.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedArea.description}
            </p>
            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Applied Methods &amp; Tools
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedArea.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-900 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 border-t border-slate-100 pt-5 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Explore Applied Case Studies in {selectedArea.title} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience, Student Leadership & Academic Timeline */}
      <section>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          <Briefcase className="h-4 w-4" />
          <span>Career &amp; Governance Journey</span>
        </div>
        <h2 className="mt-1 font-serif text-3xl font-bold text-navy-900 dark:text-white">
          Experience, Budgeting &amp; Leadership Timeline
        </h2>

        <div className="mt-8 space-y-6 border-l-2 border-emerald-700/40 pl-6">
          {experience.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900"
            >
              <span className="absolute -left-[33px] top-7 h-4 w-4 rounded-full border-4 border-white bg-emerald-700 dark:border-navy-950" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-bold text-navy-900 dark:bg-navy-850 dark:text-emerald-400">
                  {item.type}
                </span>
                <span className="text-xs font-bold text-slate-500">{item.period}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-navy-900 dark:text-white">
                {item.role}
              </h3>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                {item.organization} • {item.location}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
