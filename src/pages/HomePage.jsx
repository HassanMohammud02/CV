import React from 'react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Compass,
  Download,
  Leaf,
  Mail,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import ExecutivePortrait from '../components/ExecutivePortrait';
import ProjectVisual from '../components/ProjectVisual';

export default function HomePage({
  profile,
  projects,
  onNavigate,
  onSelectProject,
  onDownloadCv,
}) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  const pillars = [
    {
      title: 'Financial Analysis & Valuation',
      description:
        '3-statement modeling, DCF valuations, WACC sensitivity tables, and driver-based budgeting for capital allocation.',
      icon: TrendingUp,
      tag: 'Corporate Finance',
    },
    {
      title: 'Business Intelligence & Analytics',
      description:
        'Power BI dashboards, SQL data pipelines, and Python analytics turning raw ledger data into executive KPIs.',
      icon: BarChart3,
      tag: 'Decision Support',
    },
    {
      title: 'ESG & Sustainable Finance',
      description:
        'CSRD double-materiality assessments, Scope 1–3 emissions benchmarking, and EU Taxonomy alignment.',
      icon: Leaf,
      tag: 'Sustainability',
    },
    {
      title: 'Strategy & Digital Transformation',
      description:
        'Structured consulting problem-solving, process optimization, and commercial feasibility studies.',
      icon: Compass,
      tag: 'Consulting & Ops',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Executive Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-12 pb-16 sm:pt-16 sm:pb-24 dark:border-slate-800 dark:bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{profile.roleTitle}</span>
              </div>

              <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl dark:text-white">
                {profile.headline}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                {profile.subheadline}
              </p>

              {/* Career Objective Callout */}
              <div className="mt-6 rounded-xl border-l-4 border-emerald-700 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-emerald-500 dark:bg-navy-900 dark:text-slate-300">
                <span className="font-bold text-navy-900 dark:text-white">Career Objective: </span>
                {profile.careerObjective}
              </div>

              {/* Primary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={profile.resumeUrl}
                  download="Hassan_Abdirahman_Mohammud_CV.pdf"
                  onClick={onDownloadCv}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV (PDF)</span>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-navy-900 transition hover:border-navy-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-navy-900 dark:text-white dark:hover:border-emerald-500"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Me</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('recruiter')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>1-Screen Recruiter Brief</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Executive Portrait Card */}
            <div className="lg:col-span-5">
              <ExecutivePortrait profile={profile} />
            </div>
          </div>

          {/* Animated / Tabular Key Metrics Strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.keyMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition hover:border-emerald-600/40 dark:border-slate-800 dark:bg-navy-900"
              >
                <div className="text-2xl font-bold tabular-nums text-navy-900 sm:text-3xl dark:text-white">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {metric.label}
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Consulting & Analytical Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Core Practice Areas
            </div>
            <h2 className="mt-1 font-serif text-3xl font-bold text-navy-900 dark:text-white">
              Analytical Rigor Meets Commercial Execution
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 hover:text-emerald-700 dark:text-emerald-400"
          >
            <span>Explore Full Skills Matrix</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-600/50 hover:shadow-executive dark:border-slate-800 dark:bg-navy-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white transition group-hover:bg-emerald-700 dark:bg-navy-850 dark:text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-navy-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Selected Case Studies
            </div>
            <h2 className="mt-1 font-serif text-3xl font-bold text-navy-900 dark:text-white">
              Featured Finance, Analytics &amp; ESG Work
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <span>View All {projects.length} Case Studies</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-600/50 hover:shadow-executive dark:border-slate-800 dark:bg-navy-900"
            >
              <ProjectVisual project={project} heightClass="h-44" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{project.duration}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-navy-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-sm font-bold tabular-nums text-navy-900 dark:text-emerald-400">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {(project.technologies || []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-navy-850 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <span>Read Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Executive CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-white shadow-xl sm:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Ready for Graduate Analyst &amp; Consulting Roles</span>
              </div>
              <h2 className="mt-2 font-serif text-3xl font-bold text-white">
                Looking for an analytical graduate who bridges finance, data, and operations?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Explore the 1-screen Recruiter Dashboard for a rapid overview of my OsloMet degree, IKEA commercial experience, and downloadable ATS resume—or reach out directly to schedule an introductory conversation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('recruiter')}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
              >
                Open Recruiter Dashboard
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Schedule a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
