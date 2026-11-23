import React, { useState } from 'react';
import {
  CheckCircle2,
  Edit3,
  FileText,
  FolderKanban,
  Lock,
  Mail,
  Plus,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react';

const EMPTY_PROJECT = {
  id: '',
  title: '',
  category: 'Finance',
  subtitle: '',
  description: '',
  technologies: 'Excel, Power BI, Financial Modeling',
  skills: 'Financial Analysis, Budgeting',
  duration: '4 Weeks',
  clientOrContext: 'Executive Case Study',
  github: 'https://github.com/hassanmohammud',
  demo: '#',
  featured: true,
  images: [],
  metrics: [
    { label: 'Primary Impact', value: '+15%' },
    { label: 'Time Saved', value: '-40%' },
    { label: 'Accuracy', value: '99%' },
  ],
  problem: '',
  analysis: '',
  methodology: '',
  results: '',
  recommendations: '',
  keyLearnings: '',
};

export default function AdminCmsPage({
  profile,
  setProfile,
  projects,
  setProjects,
  posts,
  setPosts,
  skills,
  setSkills,
  inquiries,
  onResetAllData,
}) {
  const [authenticated, setAuthenticated] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [toast, setToast] = useState('');

  // Project Form State
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);

  // Blog Post Form State
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'Finance',
    tags: 'Finance, Strategy, OsloMet',
    excerpt: '',
    content: '',
  });

  // New Skill Form State
  const [skillForm, setSkillForm] = useState({
    category: 'Finance',
    name: '',
    level: 88,
    tool: '',
  });

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const expected = import.meta.env.VITE_CMS_PASSCODE || 'OSLOMET2026';
    if (passcode.trim() === expected || passcode.trim().toLowerCase() === 'admin') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Hint: use OSLOMET2026');
    }
  };

  // Image Upload Handler (converts uploaded image to Data URL in localStorage)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProjectForm((prev) => ({ ...prev, images: [reader.result] }));
        notify('Project image uploaded and attached.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      id: proj.id,
      title: proj.title,
      category: proj.category,
      subtitle: proj.subtitle || '',
      description: proj.description,
      technologies: (proj.technologies || []).join(', '),
      skills: (proj.skills || []).join(', '),
      duration: proj.duration || '4 Weeks',
      clientOrContext: proj.clientOrContext || 'Executive Case Study',
      github: proj.github || '',
      demo: proj.demo || '#',
      featured: Boolean(proj.featured),
      images: proj.images || [],
      metrics: proj.metrics || EMPTY_PROJECT.metrics,
      problem: proj.caseStudy?.problem || '',
      analysis: proj.caseStudy?.analysis || '',
      methodology: proj.caseStudy?.methodology || '',
      results: proj.caseStudy?.results || '',
      recommendations: proj.caseStudy?.recommendations || '',
      keyLearnings: proj.caseStudy?.keyLearnings || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const formatted = {
      id: editingProjectId || `proj-${Date.now()}`,
      title: projectForm.title.trim(),
      category: projectForm.category,
      subtitle: projectForm.subtitle.trim() || `${projectForm.category} Consulting Case Study`,
      description: projectForm.description.trim(),
      technologies: projectForm.technologies
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      skills: projectForm.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      datePublished: new Date().toISOString().slice(0, 10),
      duration: projectForm.duration,
      clientOrContext: projectForm.clientOrContext,
      featured: projectForm.featured,
      views: editingProjectId
        ? projects.find((p) => p.id === editingProjectId)?.views || 1
        : 1,
      github: projectForm.github,
      demo: projectForm.demo,
      images: projectForm.images,
      metrics: projectForm.metrics,
      caseStudy: {
        problem: projectForm.problem || 'Business challenge analyzed using structured consulting frameworks.',
        analysis: projectForm.analysis || 'Quantitative financial and operational diagnostics conducted.',
        methodology: projectForm.methodology || 'Data modeling, benchmarking, and sensitivity testing.',
        results: projectForm.results || 'Delivered actionable KPI improvements and strategic clarity.',
        recommendations: projectForm.recommendations || 'Phased implementation roadmap with clear governance.',
        keyLearnings: projectForm.keyLearnings || 'Data-backed storytelling accelerates executive alignment.',
      },
    };

    if (editingProjectId) {
      setProjects((prev) => prev.map((p) => (p.id === editingProjectId ? formatted : p)));
      notify('Case study updated live on portfolio!');
    } else {
      setProjects((prev) => [formatted, ...prev]);
      notify('New case study published live on portfolio!');
    }

    setEditingProjectId(null);
    setProjectForm(EMPTY_PROJECT);
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (editingProjectId === id) {
      setEditingProjectId(null);
      setProjectForm(EMPTY_PROJECT);
    }
    notify('Case study removed.');
  };

  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!postForm.title.trim() || !postForm.content.trim()) return;
    const newPost = {
      id: `post-${Date.now()}`,
      title: postForm.title.trim(),
      category: postForm.category,
      date: new Date().toISOString().slice(0, 10),
      author: profile.fullName,
      tags: postForm.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt: postForm.excerpt.trim() || postForm.content.trim().slice(0, 140) + '...',
      content: postForm.content.trim(),
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setPostForm({
      title: '',
      category: 'Finance',
      tags: 'Finance, Strategy, OsloMet',
      excerpt: '',
      content: '',
    });
    notify('Article published live to Insights!');
  };

  const handleDeletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    notify('Article deleted.');
  };

  const handleAddOrUpdateSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;
    setSkills((prev) =>
      prev.map((pillar) => {
        if (pillar.category !== skillForm.category) return pillar;
        const exists = pillar.items.some(
          (i) => i.name.toLowerCase() === skillForm.name.trim().toLowerCase()
        );
        const updatedItems = exists
          ? pillar.items.map((i) =>
              i.name.toLowerCase() === skillForm.name.trim().toLowerCase()
                ? { ...i, level: Number(skillForm.level), tool: skillForm.tool || i.tool }
                : i
            )
          : [
              ...pillar.items,
              {
                name: skillForm.name.trim(),
                level: Number(skillForm.level),
                tool: skillForm.tool.trim() || 'Applied Business Practice',
              },
            ];
        return { ...pillar, items: updatedItems };
      })
    );
    setSkillForm({ category: 'Finance', name: '', level: 88, tool: '' });
    notify('Skills matrix updated immediately!');
  };

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-navy-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white dark:bg-emerald-700">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-serif text-2xl font-bold text-navy-900 dark:text-white">
            Admin CMS Studio Login
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Enter CMS passcode to manage case studies, articles, skills, and resume profile.
          </p>
          <form onSubmit={handleLogin} className="mt-5 space-y-3">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode (OSLOMET2026)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
            {authError && <p className="text-xs font-semibold text-rose-600">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-navy-900 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 dark:bg-emerald-700"
            >
              Unlock CMS Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'projects', label: `Case Studies (${projects.length})`, icon: FolderKanban },
    { id: 'blog', label: `Articles (${posts.length})`, icon: FileText },
    { id: 'skills', label: 'Skills Matrix', icon: SlidersHorizontal },
    { id: 'resume', label: 'Resume & Bio', icon: UserCheck },
    { id: 'inbox', label: `Inquiries (${inquiries.length})`, icon: Mail },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-navy-900">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <ShieldCheck className="h-4 w-4" />
            <span>No-Code Portfolio Content Management System (localStorage Sync)</span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold text-navy-900 sm:text-3xl dark:text-white">
            Admin Publishing Studio
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Add or edit case studies, upload project images, publish insights, and update skills—changes appear immediately across the website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onResetAllData();
              notify('Portfolio data restored to default OsloMet executive dataset.');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthenticated(false)}
            className="rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:bg-navy-850 dark:text-slate-300"
          >
            Lock CMS
          </button>
        </div>
      </div>

      {/* Live Toast */}
      {toast && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-bold text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                active
                  ? 'bg-navy-900 text-white dark:bg-emerald-700'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-navy-900 dark:text-slate-300'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROJECTS & CASE STUDIES */}
      {activeTab === 'projects' && (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Publish / Edit Form */}
          <form
            onSubmit={handleSaveProject}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-navy-900"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-900 dark:text-white">
                {editingProjectId ? 'Edit Case Study' : 'Publish New Case Study'}
              </h2>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectForm(EMPTY_PROJECT);
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g., Nordic Energy DCF & Capex Model"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                >
                  <option>Finance</option>
                  <option>Data Analytics</option>
                  <option>Sustainability</option>
                  <option>Entrepreneurship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Executive Summary *
              </label>
              <textarea
                rows={2}
                required
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                placeholder="Concise summary of the business analysis and value delivered..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tools &amp; Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Upload Cover / Dashboard Screenshot
                </label>
                <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-600 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-300">
                  <Upload className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    {projectForm.images.length > 0 ? 'Image Attached ✓' : 'Choose PNG / JPG'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* 6 Consulting Case Study Fields */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  1. Problem
                </label>
                <textarea
                  rows={2}
                  value={projectForm.problem}
                  onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  2. Analysis
                </label>
                <textarea
                  rows={2}
                  value={projectForm.analysis}
                  onChange={(e) => setProjectForm({ ...projectForm, analysis: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  3. Methodology
                </label>
                <textarea
                  rows={2}
                  value={projectForm.methodology}
                  onChange={(e) => setProjectForm({ ...projectForm, methodology: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  4. Results
                </label>
                <textarea
                  rows={2}
                  value={projectForm.results}
                  onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  5. Recommendations
                </label>
                <textarea
                  rows={2}
                  value={projectForm.recommendations}
                  onChange={(e) => setProjectForm({ ...projectForm, recommendations: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  6. Key Learnings
                </label>
                <textarea
                  rows={2}
                  value={projectForm.keyLearnings}
                  onChange={(e) => setProjectForm({ ...projectForm, keyLearnings: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              <span>{editingProjectId ? 'Save Case Study Changes' : 'Publish Case Study Live'}</span>
            </button>
          </form>

          {/* Existing Projects List */}
          <div className="space-y-3 lg:col-span-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Published Case Studies ({projects.length})
            </h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-navy-900"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    {proj.category}
                  </span>
                  <div className="text-xs font-bold text-navy-900 dark:text-white">{proj.title}</div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleEditProject(proj)}
                    title="Edit"
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:border-emerald-600 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(proj.id)}
                    title="Delete"
                    className="rounded-lg border border-slate-200 p-1.5 text-rose-600 hover:bg-rose-50 dark:border-slate-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BLOG POSTS */}
      {activeTab === 'blog' && (
        <div className="grid gap-8 lg:grid-cols-12">
          <form
            onSubmit={handlePublishPost}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-7 dark:border-slate-800 dark:bg-navy-900"
          >
            <h2 className="text-base font-bold text-navy-900 dark:text-white">
              Publish New Insight Article
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Article Title"
                value={postForm.title}
                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
              <select
                value={postForm.category}
                onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              >
                <option>Finance</option>
                <option>Data Analytics</option>
                <option>Sustainability</option>
                <option>Strategy</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={postForm.tags}
              onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
            <textarea
              rows={6}
              required
              placeholder="Write your analytical article content..."
              value={postForm.content}
              onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-navy-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 dark:bg-emerald-700"
            >
              Publish Article Live
            </button>
          </form>

          <div className="space-y-3 lg:col-span-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Published Articles ({posts.length})
            </h2>
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-navy-900"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    {post.category} • {post.date}
                  </span>
                  <div className="text-xs font-bold text-navy-900 dark:text-white">{post.title}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePost(post.id)}
                  className="rounded-lg border border-slate-200 p-1.5 text-rose-600 hover:bg-rose-50 dark:border-slate-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS MATRIX */}
      {activeTab === 'skills' && (
        <div className="grid gap-8 lg:grid-cols-12">
          <form
            onSubmit={handleAddOrUpdateSkill}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5 dark:border-slate-800 dark:bg-navy-900"
          >
            <h2 className="text-base font-bold text-navy-900 dark:text-white">
              Add or Update Skill Rating
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Pillar Category
              </label>
              <select
                value={skillForm.category}
                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              >
                {skills.map((s) => (
                  <option key={s.category}>{s.category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Skill Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Financial Analysis or SQL"
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Proficiency Rating ({skillForm.level}%)
              </label>
              <input
                type="range"
                min="60"
                max="100"
                value={skillForm.level}
                onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Applied Tool / Context
              </label>
              <input
                type="text"
                placeholder="e.g., Power BI & DAX"
                value={skillForm.tool}
                onChange={(e) => setSkillForm({ ...skillForm, tool: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-navy-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 dark:bg-emerald-700"
            >
              Update Skills Matrix
            </button>
          </form>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {skills.map((pillar) => (
              <div
                key={pillar.category}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-navy-900"
              >
                <div className="text-sm font-bold text-navy-900 dark:text-white">
                  {pillar.category}
                </div>
                <ul className="mt-3 space-y-2 text-xs">
                  {pillar.items.map((item) => (
                    <li key={item.name} className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span>{item.name}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {item.level}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RESUME & BIO */}
      {activeTab === 'resume' && (
        <div className="max-w-3xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="text-base font-bold text-navy-900 dark:text-white">
            Update Executive Profile &amp; Resume Headline
          </h2>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Professional Headline
            </label>
            <input
              type="text"
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Career Objective (Appears on Home, Recruiter Dashboard &amp; ATS CV)
            </label>
            <textarea
              rows={3}
              value={profile.careerObjective}
              onChange={(e) => setProfile({ ...profile, careerObjective: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Contact Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Availability Status
              </label>
              <input
                type="text"
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => notify('Executive profile & resume synced across all pages!')}
            className="rounded-xl bg-navy-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 dark:bg-emerald-700"
          >
            Confirm Profile Updates
          </button>
        </div>
      )}

      {/* TAB 5: RECRUITER INQUIRIES */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-navy-900 dark:text-white">
            Submitted Recruiter &amp; Contact Inquiries ({inquiries.length})
          </h2>
          {inquiries.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-xs text-slate-500 dark:border-slate-800 dark:bg-navy-900">
              No inquiries submitted yet in this browser session. Messages sent via the Contact page or Recruiter Dashboard appear here automatically.
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-navy-900"
              >
                <div className="flex flex-wrap justify-between gap-2 text-xs">
                  <span className="font-bold text-navy-900 dark:text-white">
                    {inq.name} {inq.organization ? `(${inq.organization})` : ''}
                  </span>
                  <span className="text-slate-400">{inq.date}</span>
                </div>
                <div className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {inq.email} • {inq.roleType}
                </div>
                <p className="mt-2 text-xs text-slate-700 dark:text-slate-300">{inq.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
