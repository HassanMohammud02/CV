import React, { useState } from 'react';
import {
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Printer,
  Send,
  UserCheck,
} from 'lucide-react';
import { TECHNICAL_BUSINESS_STACK } from '../data/portfolioData';

export default function RecruiterDashboardPage({
  profile,
  experience,
  projects,
  skills,
  onNavigate,
  onSelectProject,
  onDownloadCv,
  onSubmitInquiry,
}) {
  const [quickForm, setQuickForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickForm.name.trim() || !quickForm.email.trim()) return;
    onSubmitInquiry({
      name: quickForm.name,
      organization: quickForm.company,
      email: quickForm.email,
      roleType: 'Fast-Track Recruiter Outreach',
      message: quickForm.message || 'Interested in discussing graduate analyst opportunities.',
    });
    setSubmitted(true);
    setQuickForm({ name: '', company: '', email: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Top Executive Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-navy-900">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Recruiter Fast-Track Brief</span>
            </div>
            <h1 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
              {profile.fullName}
            </h1>
            <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {profile.degree} • {profile.university}
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              {profile.careerObjective}
            </p>
          </div>

          {/* Primary Recruiter Actions */}
          <div className="flex flex-wrap gap-2.5">
            <a
              href={profile.resumeUrl}
              download="Hassan_Abdirahman_Mohammud_CV.pdf"
              onClick={onDownloadCv}
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF CV</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate('resume')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
            >
              <Printer className="h-4 w-4" />
              <span>ATS Print View</span>
            </button>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 transition hover:border-sky-600 hover:text-sky-700 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
            >
              <Linkedin className="h-4 w-4 text-sky-600" />
              <span>LinkedIn</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 transition hover:border-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Column Recruiter Matrix */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left 8 Columns: Education, Experience & Key Projects */}
        <div className="space-y-8 lg:col-span-8">
          {/* Education Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">Education</h2>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-navy-950">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-base font-bold text-navy-900 dark:text-white">
                  {profile.degree}
                </div>
                <span className="rounded-full bg-navy-900 px-3 py-0.5 text-xs font-bold text-white dark:bg-emerald-700">
                  Graduated {profile.graduationYear}
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                {profile.university} • {profile.location}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Core Concentrations: Financial &amp; Managerial Accounting, Corporate Finance, Investment Valuation, Quantitative Methods &amp; Statistics, Corporate Strategy, Macroeconomics, and Sustainable Business Governance.
              </p>
            </div>
          </section>

          {/* Experience & Leadership Summary */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-2.5">
              <Briefcase className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                Experience &amp; Leadership Highlights
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              {experience
                .filter((e) => e.type !== 'Education')
                .map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-navy-950"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-navy-900 dark:text-white">
                        {item.role}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500">{item.period}</span>
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {item.organization} — {item.location}
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
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

          {/* Key Projects Quick Click */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                  Key Consulting &amp; Analytical Projects
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                All {projects.length} Case Studies →
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projects.slice(0, 4).map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => onSelectProject(proj)}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-emerald-600 dark:border-slate-800 dark:bg-navy-950"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {proj.category}
                  </span>
                  <div className="mt-1 text-sm font-bold text-navy-900 dark:text-white">
                    {proj.title}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(proj.technologies || []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-navy-900 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right 4 Columns: Skills, Languages, Certifications & Quick Outreach */}
        <div className="space-y-8 lg:col-span-4">
          {/* Technical Business Stack */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <h2 className="text-base font-bold text-navy-900 dark:text-white">
              Technical Business Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {TECHNICAL_BUSINESS_STACK.map((tool) => (
                <span
                  key={tool.name}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-900 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
                >
                  {tool.name}
                </span>
              ))}
            </div>

            <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-400">
              Top Pillar Proficiencies
            </h3>
            <div className="mt-3 space-y-2.5">
              {skills.map((cat) => (
                <div key={cat.category} className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{cat.category}</div>
                  <div className="text-slate-500 dark:text-slate-400">
                    {cat.items.map((i) => i.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-navy-900 dark:text-white">Languages</h2>
            </div>
            <div className="mt-3 space-y-3">
              {profile.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{lang.name}</span>
                    <span className="text-emerald-700 dark:text-emerald-400">{lang.level.split('/')[0]}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-navy-950">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <h2 className="text-base font-bold text-navy-900 dark:text-white">Certifications</h2>
            </div>
            <ul className="mt-3 space-y-3">
              {profile.certifications.map((cert) => (
                <li key={cert.title} className="border-b border-slate-100 pb-2.5 last:border-none last:pb-0 dark:border-slate-800">
                  <div className="text-xs font-bold text-navy-900 dark:text-white">{cert.title}</div>
                  <div className="text-[11px] text-slate-500">
                    {cert.issuer} ({cert.year})
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Fast-Track Recruiter Contact Box */}
          <section className="rounded-2xl border border-emerald-600/30 bg-emerald-50/40 p-6 dark:border-emerald-800/40 dark:bg-navy-900">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-navy-900 dark:text-white">
                Direct Recruiter Message
              </h2>
            </div>
            {submitted ? (
              <div className="mt-3 rounded-xl bg-emerald-700 p-4 text-xs text-white">
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="h-4 w-4" />
                  <span>Message Received</span>
                </div>
                <p className="mt-1">
                  Thank you! Your inquiry has been logged for Hassan Abdirahman Mohammud.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="mt-3 space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Firm / Organization"
                  value={quickForm.company}
                  onChange={(e) => setQuickForm({ ...quickForm, company: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email"
                  value={quickForm.email}
                  onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Role or interview note..."
                  value={quickForm.message}
                  onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-navy-900 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Direct Note</span>
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
