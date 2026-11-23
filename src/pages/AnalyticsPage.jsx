import React from 'react';
import { BarChart3, Download, Eye, Mail, TrendingUp, Users } from 'lucide-react';

export default function AnalyticsPage({ analytics, projects, inquiries }) {
  const totalProjectViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);
  const topProjects = [...projects]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const maxMonthly = Math.max(
    ...analytics.monthlyVisitors.map((m) => Math.max(m.visitors, m.projectViews)),
    1
  );

  const kpis = [
    {
      label: 'Portfolio Visitors',
      value: analytics.totalVisitors.toLocaleString(),
      sub: '+18.4% vs prior 30 days',
      icon: Users,
    },
    {
      label: 'Resume / CV Downloads',
      value: analytics.resumeDownloads.toLocaleString(),
      sub: 'PDF & ATS Print Exports',
      icon: Download,
    },
    {
      label: 'Case Study Views',
      value: totalProjectViews.toLocaleString(),
      sub: `Across ${projects.length} published studies`,
      icon: Eye,
    },
    {
      label: 'Recruiter Engagement',
      value: (analytics.recruiterInquiries + inquiries.length).toLocaleString(),
      sub: `Avg session: ${analytics.avgSessionDuration}`,
      icon: Mail,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          <BarChart3 className="h-4 w-4" />
          <span>Portfolio Telemetry &amp; Recruiter Engagement</span>
        </div>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
          Executive Engagement Analytics
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Live tracking of visitor traffic, PDF CV downloads, case study views, and recruiter interactions.
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {kpi.label}
                </span>
                <Icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div className="mt-3 text-3xl font-bold tabular-nums text-navy-900 dark:text-white">
                {kpi.value}
              </div>
              <div className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Monthly Visitors & Case Study Views Bar Chart */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-navy-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-navy-900 dark:text-white">
                6-Month Visitor &amp; Case Study View Trend
              </h2>
              <p className="text-xs text-slate-500">Monthly unique sessions vs. case study opens</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-navy-900 dark:text-slate-200">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-900 dark:bg-sky-400" />
                Visitors
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <span className="h-2.5 w-2.5 rounded-sm bg-emerald-600" />
                Case Views
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-6 items-end gap-4 pt-4">
            {analytics.monthlyVisitors.map((item) => {
              const vHeight = Math.round((item.visitors / maxMonthly) * 160);
              const pHeight = Math.round((item.projectViews / maxMonthly) * 160);
              return (
                <div key={item.month} className="flex flex-col items-center">
                  <div className="flex h-44 items-end gap-1.5">
                    <div
                      title={`Visitors: ${item.visitors}`}
                      style={{ height: `${vHeight}px` }}
                      className="w-4 rounded-t bg-navy-900 transition-all dark:bg-sky-400 sm:w-5"
                    />
                    <div
                      title={`Case Views: ${item.projectViews}`}
                      style={{ height: `${pHeight}px` }}
                      className="w-4 rounded-t bg-emerald-600 transition-all sm:w-5"
                    />
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recruiter Engagement Distribution */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5 dark:border-slate-800 dark:bg-navy-900">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <h2 className="text-base font-bold text-navy-900 dark:text-white">
              Recruiter Session Focus
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Share of time spent across portfolio sections
          </p>

          <div className="mt-6 space-y-4">
            {analytics.engagementBreakdown.map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{row.label}</span>
                  <span className="tabular-nums text-emerald-700 dark:text-emerald-400">
                    {row.percentage}%
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-navy-950">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Top Case Studies Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
        <h2 className="text-base font-bold text-navy-900 dark:text-white">
          Most Viewed Consulting Case Studies
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800">
                <th className="py-3 font-bold">Case Study Title</th>
                <th className="py-3 font-bold">Category</th>
                <th className="py-3 font-bold">Primary Tools</th>
                <th className="py-3 text-right font-bold">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {topProjects.map((proj) => (
                <tr key={proj.id}>
                  <td className="py-3.5 font-bold text-navy-900 dark:text-white">{proj.title}</td>
                  <td className="py-3.5">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {proj.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-400">
                    {(proj.technologies || []).slice(0, 3).join(', ')}
                  </td>
                  <td className="py-3.5 text-right font-bold tabular-nums text-navy-900 dark:text-emerald-400">
                    {(proj.views || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
