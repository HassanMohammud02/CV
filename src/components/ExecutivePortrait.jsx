import React from 'react';
import { Award, CheckCircle2, GraduationCap, MapPin } from 'lucide-react';

export default function ExecutivePortrait({ profile }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-executive dark:border-slate-800 dark:bg-navy-900">
        <div className="relative bg-gradient-to-br from-navy-900 via-navy-850 to-slate-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{profile.availability}</span>
            </span>
            <span className="text-xs font-semibold text-slate-300">Class of {profile.graduationYear}</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <img
              src={profile.avatarUrl || '/assets/profile-portrait.svg'}
              alt={profile.fullName}
              className="h-24 w-24 rounded-2xl border-2 border-emerald-500/40 object-cover shadow-md"
            />
            <div>
              <h2 className="font-serif text-xl font-semibold leading-snug text-white">
                {profile.fullName}
              </h2>
              <p className="mt-1 text-xs font-medium text-emerald-300">
                BSc Economics &amp; Business Administration
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>{profile.location}</span>
              </p>
            </div>
          </div>

          {/* Executive Focus Strip */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-xs font-bold text-white">Finance</div>
              <div className="text-[10px] text-slate-300">DCF &amp; Budgets</div>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-xs font-bold text-emerald-300">Analytics</div>
              <div className="text-[10px] text-slate-300">Power BI &amp; SQL</div>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-xs font-bold text-amber-300">ESG &amp; Strategy</div>
              <div className="text-[10px] text-slate-300">CSRD &amp; Ops</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-white p-5 dark:bg-navy-900">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {profile.university}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Økonomi og Administrasjon (Financial Reporting, Strategy &amp; Quantitative Methods)
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Commercial &amp; Governance Experience
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                IKEA Norway Customer Operations • Student Organization Budget &amp; Event Lead
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
