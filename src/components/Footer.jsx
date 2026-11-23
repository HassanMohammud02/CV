import React from 'react';
import { Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer({ profile, onNavigate, onDownloadCv }) {
  return (
    <footer className="no-print border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-lg font-bold text-navy-900 dark:text-white">
              {profile.fullName}
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {profile.degree} • {profile.university}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {profile.subheadline}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>{profile.location} • {profile.availability}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Executive Navigation
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('recruiter')} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                  Recruiter Dashboard
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('projects')} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                  Consulting Case Studies
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('skills')} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                  Skills Matrix
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('resume')} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                  ATS Resume / CV
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('admin')} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                  Admin CMS Studio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Direct Connect
            </h3>
            <div className="mt-3 flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Portfolio</span>
              </a>
              <a
                href={profile.resumeUrl}
                download="Hassan_Abdirahman_Mohammud_CV.pdf"
                onClick={onDownloadCv}
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-navy-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-400">
          <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
          <p>Economics &amp; Business Administration (Økonomi og Administrasjon) • OsloMet</p>
        </div>
      </div>
    </footer>
  );
}
