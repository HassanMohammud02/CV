import React, { useState } from 'react';
import { Check, Download, Printer, Share2 } from 'lucide-react';
import { TECHNICAL_BUSINESS_STACK } from '../data/portfolioData';

export default function ResumePage({ profile, experience, projects, onDownloadCv }) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Action Toolbar (Hidden when printing) */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-navy-900">
        <div>
          <h1 className="text-base font-bold text-navy-900 dark:text-white">
            ATS-Optimized Executive Resume / CV
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Formatted for clean single-page PDF export or Applicant Tracking Systems
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save PDF</span>
          </button>

          <a
            href={profile.resumeUrl}
            download="Hassan_Abdirahman_Mohammud_CV.pdf"
            onClick={onDownloadCv}
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Official PDF</span>
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Profile'}</span>
          </button>
        </div>
      </div>

      {/* Printable ATS Resume Sheet */}
      <article className="print-sheet rounded-2xl border border-slate-200 bg-white p-8 text-slate-900 shadow-sm sm:p-12">
        {/* Header */}
        <header className="border-b-2 border-navy-900 pb-5">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-navy-900">
            {profile.fullName}
          </h2>
          <p className="mt-1 text-sm font-bold text-emerald-800">
            {profile.roleTitle}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            <span>{profile.location}</span>
            <span>•</span>
            <span>{profile.email}</span>
            <span>•</span>
            <span>{profile.linkedin.replace('https://', '')}</span>
            <span>•</span>
            <span>{profile.github.replace('https://', '')}</span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mt-6">
          <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-navy-900">
            Executive Summary
          </h3>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-700">
            {profile.careerObjective} Equipped with rigorous training in accounting, financial reporting, budget planning, corporate valuation, ESG materiality analysis, and business intelligence tools (Excel, Power BI, SQL, Python).
          </p>
        </section>

        {/* Education */}
        <section className="mt-6">
          <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-navy-900">
            Education
          </h3>
          <div className="mt-3">
            <div className="flex flex-wrap justify-between text-xs font-bold text-navy-900">
              <span>{profile.university}</span>
              <span>{profile.location}</span>
            </div>
            <div className="flex flex-wrap justify-between text-xs italic text-slate-600">
              <span>{profile.degree}</span>
              <span>2022 – {profile.graduationYear}</span>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
              <li>
                <strong>Core Subjects:</strong> Financial Accounting, Managerial Accounting &amp; Budgeting, Corporate Finance, Investment Analysis, Macroeconomics, Quantitative Statistics, Corporate Strategy, Organization &amp; Leadership.
              </li>
              <li>
                <strong>Applied Analytical Focus:</strong> Equity valuation modeling, departmental variance forecasting, Power BI KPI architecture, and Nordic CSRD/ESG benchmarking.
              </li>
            </ul>
          </div>
        </section>

        {/* Professional & Leadership Experience */}
        <section className="mt-6">
          <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-navy-900">
            Experience &amp; Leadership
          </h3>
          <div className="mt-3 space-y-4">
            {experience
              .filter((e) => e.type !== 'Education')
              .map((item) => (
                <div key={item.id}>
                  <div className="flex flex-wrap justify-between text-xs font-bold text-navy-900">
                    <span>{item.organization} — {item.role}</span>
                    <span>{item.period}</span>
                  </div>
                  <div className="text-xs italic text-slate-600">{item.location}</div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-xs text-slate-700">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Selected Analytical & Business Projects */}
        <section className="mt-6">
          <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-navy-900">
            Selected Consulting &amp; Analytical Projects
          </h3>
          <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-xs text-slate-700">
            {projects.slice(0, 4).map((proj) => (
              <li key={proj.id}>
                <strong>{proj.title} ({proj.category}):</strong> {proj.description}
              </li>
            ))}
          </ul>
        </section>

        {/* Skills, Technical Tools, Certifications & Languages */}
        <section className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-navy-900">
              Business &amp; Technical Skills
            </h3>
            <div className="mt-2.5 space-y-2 text-xs text-slate-700">
              <p>
                <strong>Core Business Competencies:</strong> Accounting, Financial Reporting, Budget Planning, Stakeholder Communication, Project Coordination, Process Improvement, Customer Relationship Management (CRM).
              </p>
              <p>
                <strong>Technical Business Stack:</strong>{' '}
                {TECHNICAL_BUSINESS_STACK.map((t) => t.name).join(', ')}.
              </p>
            </div>
          </div>

          <div>
            <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-navy-900">
              Certifications &amp; Languages
            </h3>
            <div className="mt-2.5 space-y-2 text-xs text-slate-700">
              <p>
                <strong>Certifications:</strong>{' '}
                {profile.certifications.map((c) => `${c.title} (${c.year})`).join('; ')}.
              </p>
              <p>
                <strong>Languages:</strong>{' '}
                {profile.languages.map((l) => `${l.name} (${l.level.split('/')[0].trim()})`).join(', ')}.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
