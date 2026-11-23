import React, { useMemo, useState } from 'react';
import { ArrowRight, Filter, Search, SlidersHorizontal } from 'lucide-react';
import ProjectVisual from '../components/ProjectVisual';

const CATEGORIES = ['All', 'Finance', 'Data Analytics', 'Sustainability', 'Entrepreneurship'];

export default function ProjectsPage({ projects, onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const allTools = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.technologies || []).forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects
      .filter((proj) => {
        const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory;
        const matchesTool =
          selectedTool === 'All' || (proj.technologies || []).includes(selectedTool);
        const matchesSearch =
          !q ||
          proj.title.toLowerCase().includes(q) ||
          proj.description.toLowerCase().includes(q) ||
          (proj.technologies || []).some((t) => t.toLowerCase().includes(q)) ||
          (proj.skills || []).some((s) => s.toLowerCase().includes(q));
        return matchesCat && matchesTool && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
        if (sortBy === 'newest') return String(b.datePublished).localeCompare(String(a.datePublished));
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [projects, searchQuery, selectedCategory, selectedTool, sortBy]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Consulting Case Study Library
        </div>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
          Applied Finance, Analytics, ESG &amp; Venture Projects
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Select any case study to examine the full consulting structure: Business Problem, Quantitative Analysis, Methodology, Quantified Results, Executive Recommendations, and Key Learnings.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-navy-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                    active
                      ? 'bg-navy-900 text-white dark:bg-emerald-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-navy-950 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search, Tool Filter & Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-56">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case studies..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                aria-label="Filter by Tool"
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
              >
                {allTools.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool === 'All' ? 'All Tools' : tool}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <select
                aria-label="Sort Projects"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="views">Sort: Most Viewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        Showing {filteredProjects.length} of {projects.length} consulting case studies
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-navy-900">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No case studies match your active filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedTool('All');
            }}
            className="mt-3 rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white dark:bg-emerald-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-600/50 hover:shadow-executive dark:border-slate-800 dark:bg-navy-900"
            >
              <ProjectVisual project={project} heightClass="h-40" />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {project.views || 0} views
                  </span>
                </div>

                <h2 className="mt-3 text-base font-bold text-navy-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                    {project.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-xs font-bold tabular-nums text-navy-900 dark:text-emerald-400">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1">
                  {(project.technologies || []).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-navy-850 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-emerald-700 dark:border-slate-800 dark:text-emerald-400">
                  <span>Open 6-Part Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
