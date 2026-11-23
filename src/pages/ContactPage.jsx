import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';

export default function ContactPage({ profile, onDownloadCv, onSubmitInquiry }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    roleType: 'Graduate Analyst / Consulting Role',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    onSubmitInquiry(form);
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      organization: '',
      roleType: 'Graduate Analyst / Consulting Role',
      message: '',
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Contact Channels */}
        <div className="space-y-6 lg:col-span-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Direct Recruiter &amp; Advisory Contact
            </div>
            <h1 className="mt-1 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
              Let&apos;s Discuss Graduate Analyst &amp; Consulting Opportunities
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Available for full-time roles, graduate rotational programs, and analytical project collaborations in Oslo or hybrid Nordic teams.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 dark:bg-navy-950">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">Email</div>
                  <div className="text-xs font-bold text-navy-900 dark:text-white">{profile.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
              >
                {copiedEmail ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 transition hover:bg-slate-100 dark:bg-navy-950 dark:hover:bg-navy-850"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-sky-600" />
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">LinkedIn</div>
                  <div className="text-xs font-bold text-navy-900 dark:text-white">
                    Hassan Abdirahman Mohammud
                  </div>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 transition hover:bg-slate-100 dark:bg-navy-950 dark:hover:bg-navy-850"
            >
              <div className="flex items-center gap-3">
                <Github className="h-4 w-4 text-slate-800 dark:text-slate-200" />
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">GitHub</div>
                  <div className="text-xs font-bold text-navy-900 dark:text-white">
                    github.com/hassanmohammud
                  </div>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-navy-950">
              <MapPin className="h-4 w-4 text-amber-600" />
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Location</div>
                <div className="text-xs font-bold text-navy-900 dark:text-white">
                  {profile.location} • {profile.availability}
                </div>
              </div>
            </div>

            <a
              href={profile.resumeUrl}
              download="Hassan_Abdirahman_Mohammud_CV.pdf"
              onClick={onDownloadCv}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <Download className="h-4 w-4" />
              <span>Download Official PDF CV</span>
            </a>
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-navy-900">
            <h2 className="font-serif text-2xl font-bold text-navy-900 dark:text-white">
              Send an Executive Inquiry
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Messages are stored directly in the portfolio inbox and acknowledged promptly.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/50">
                <div className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Thank you — your message has been received!</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-200">
                  Hassan Abdirahman Mohammud will review your inquiry and respond via email shortly. You can also inspect submitted inquiries inside the Admin CMS Studio.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white dark:bg-emerald-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g., Ingrid Solberg"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ingrid.solberg@company.no"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g., Deloitte / Nordea / DNB"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Inquiry Topic
                    </label>
                    <select
                      value={form.roleType}
                      onChange={(e) => setForm({ ...form, roleType: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    >
                      <option>Graduate Analyst / Consulting Role</option>
                      <option>Financial Analyst / FP&amp;A Opportunity</option>
                      <option>Business Intelligence / Data Analytics Role</option>
                      <option>ESG &amp; Sustainability Advisory</option>
                      <option>Networking / Coffee Chat in Oslo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Share details about the role, team, or interview timeline..."
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
