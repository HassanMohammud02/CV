import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/* Default Economics & Business Content (Used only when localStorage is empty) */
/* -------------------------------------------------------------------------- */
const FALLBACK_DATA = {
  profile: {
    name: 'ALEXANDER VANCE',
    title: 'Financial Economist & Strategy Analyst',
    subtitle:
      'Quantitative macroeconomic research, corporate valuation, and data-driven capital allocation for modern financial markets.',
    bio: 'Dedicated to bridging empirical economics with institutional financial strategy. Experienced in econometric forecasting, DCF & LBO valuation modeling, and translating complex macroeconomic indicators into actionable executive insights.',
    location: 'New York, NY',
    email: 'contact@alexandervance.com',
    portraitUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
    resumeUrl: '',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  projects: [
    {
      id: 'macro-yield-curve',
      title: 'Sovereign Yield Curve & Recession Probability Model',
      category: 'MACROECONOMICS',
      description:
        'Dynamic probit and vector autoregression (VAR) framework evaluating Treasury term spreads, credit spreads, and labor market momentum across G7 economies.',
      metrics: [
        { label: 'HORIZON', value: '12-MO FWD' },
        { label: 'OUT-OF-SAMPLE AUC', value: '0.89' },
        { label: 'DATASET', value: '45 YRS' },
      ],
      tags: ['Econometrics', 'Python', 'VAR Modeling', 'Fixed Income'],
      link: '',
      github: '',
    },
    {
      id: 'equity-valuation-engine',
      title: 'Automated Multi-Scenario DCF & Sensitivity Engine',
      category: 'CORPORATE FINANCE',
      description:
        'Institutional valuation model incorporating Monte Carlo WACC simulations, margin convergence assumptions, and peer multiples benchmarking.',
      metrics: [
        { label: 'SIMULATIONS', value: '10,000x' },
        { label: 'COVERAGE', value: 'S&P 500' },
        { label: 'LATENCY', value: '< 1.2s' },
      ],
      tags: ['Valuation', 'Financial Modeling', 'Monte Carlo', 'SQL'],
      link: '',
      github: '',
    },
  ],
  skills: [
    { name: 'Financial Modeling & DCF Valuation', category: 'Finance & Valuation', level: 95 },
    { name: 'Econometric Time-Series (ARIMA / VAR)', category: 'Economics & Quant', level: 92 },
    { name: 'Macroeconomic Policy & Fixed Income', category: 'Economics & Quant', level: 90 },
    { name: 'Python (Pandas, Statsmodels, NumPy)', category: 'Data & Analytics', level: 94 },
    { name: 'R / Stata / SQL', category: 'Data & Analytics', level: 88 },
    { name: 'Bloomberg Terminal & Capital IQ', category: 'Market Infrastructure', level: 93 },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Financial Economics',
      institution: 'Columbia University',
      period: '2021 — 2023',
      details: 'Concentration in Econometrics, Asset Pricing, and Monetary Policy.',
    },
    {
      id: 'edu-2',
      degree: 'B.A. in Economics & Mathematics',
      institution: 'University of Chicago',
      period: '2017 — 2021',
      details: 'Dean’s List · Quantitative Economics Honors Track.',
    },
  ],
  blogPosts: [
    {
      id: 'post-1',
      slug: 'real-rates-and-equity-duration',
      title: 'Real Interest Rates and Equity Duration in Tightening Cycles',
      category: 'MARKET NOTE',
      date: '2026-10-14',
      excerpt:
        'Examining how shifts in 10-year TIPS yields recalibrate discount rates across high-growth versus cash-generative value sectors.',
      content:
        'Real interest rates represent the true opportunity cost of capital. When 10-year TIPS yields reprice upward, long-duration cash flows experience disproportionate multiple compression compared to near-term cash-generative equities.\n\nBy decomposing equity returns into earnings growth, dividend yield, and valuation multiple changes across historical tightening regimes, portfolio allocators can better hedge duration risk while maintaining upside participation.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Non-Destructive Reader for Existing CMS localStorage Structures            */
/* -------------------------------------------------------------------------- */
function loadCmsStateFromLocalStorage() {
  const result = {
    profile: { ...FALLBACK_DATA.profile },
    projects: FALLBACK_DATA.projects,
    skills: FALLBACK_DATA.skills,
    education: FALLBACK_DATA.education,
    blogPosts: FALLBACK_DATA.blogPosts,
  };

  try {
    // 1. Check unified CMS object keys first
    const unifiedKeys = ['portfolioData', 'portfolio_data', 'cmsData', 'cms_data', 'siteData'];
    for (const key of unifiedKeys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (data && typeof data === 'object') {
        if (data.profile || data.about || data.hero) {
          const p = data.profile || data.about || data.hero;
          result.profile = {
            ...result.profile,
            ...p,
            name: p.name || p.fullName || p.full_name || result.profile.name,
            title: p.title || p.role || p.headline || result.profile.title,
            subtitle: p.subtitle || p.tagline || p.summary || result.profile.subtitle,
            bio: p.bio || p.description || p.about || result.profile.bio,
            portraitUrl:
              p.portraitUrl || p.avatarUrl || p.avatar_url || p.image || p.photo || result.profile.portraitUrl,
            resumeUrl: p.resumeUrl || p.resume_url || p.cvUrl || result.profile.resumeUrl,
          };
        }
        if (Array.isArray(data.projects)) result.projects = data.projects;
        if (Array.isArray(data.skills)) result.skills = data.skills;
        if (Array.isArray(data.education)) result.education = data.education;
        if (Array.isArray(data.blogPosts || data.posts || data.blogs)) {
          result.blogPosts = data.blogPosts || data.posts || data.blogs;
        }
      }
    }

    // 2. Check standalone collection keys used by modular localStorage CMS setups
    const profileRaw = localStorage.getItem('portfolio_profile') || localStorage.getItem('profile');
    if (profileRaw) {
      const p = JSON.parse(profileRaw);
      result.profile = {
        ...result.profile,
        ...p,
        name: p.name || p.fullName || p.full_name || result.profile.name,
        title: p.title || p.role || p.headline || result.profile.title,
        subtitle: p.subtitle || p.tagline || p.headline || result.profile.subtitle,
        bio: p.bio || p.description || result.profile.bio,
        portraitUrl:
          p.portraitUrl || p.avatarUrl || p.avatar_url || p.image || p.photo || result.profile.portraitUrl,
        resumeUrl: p.resumeUrl || p.resume_url || p.cvUrl || result.profile.resumeUrl,
      };
    }

    const projectsRaw = localStorage.getItem('portfolio_projects') || localStorage.getItem('projects');
    if (projectsRaw) {
      const parsed = JSON.parse(projectsRaw);
      if (Array.isArray(parsed)) result.projects = parsed;
    }

    const skillsRaw = localStorage.getItem('portfolio_skills') || localStorage.getItem('skills');
    if (skillsRaw) {
      const parsed = JSON.parse(skillsRaw);
      if (Array.isArray(parsed)) result.skills = parsed;
    }

    const educationRaw = localStorage.getItem('portfolio_education') || localStorage.getItem('education');
    if (educationRaw) {
      const parsed = JSON.parse(educationRaw);
      if (Array.isArray(parsed)) result.education = parsed;
    }

    const postsRaw =
      localStorage.getItem('portfolio_posts') ||
      localStorage.getItem('blogPosts') ||
      localStorage.getItem('blog_posts') ||
      localStorage.getItem('posts');
    if (postsRaw) {
      const parsed = JSON.parse(postsRaw);
      if (Array.isArray(parsed)) result.blogPosts = parsed;
    }
  } catch {
    // Keep graceful defaults if storage parsing fails
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/* Apple-Inspired Scroll Reveal Wrapper                                       */
/* -------------------------------------------------------------------------- */
function RevealBlock({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`section-reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Portfolio HomePage                                                    */
/* -------------------------------------------------------------------------- */
export default function HomePage(props) {
  const [cmsState, setCmsState] = useState(() => loadCmsStateFromLocalStorage());
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const refresh = () => setCmsState(loadCmsStateFromLocalStorage());
    window.addEventListener('storage', refresh);
    window.addEventListener('cmsUpdated', refresh);
    window.addEventListener('portfolioUpdated', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('cmsUpdated', refresh);
      window.removeEventListener('portfolioUpdated', refresh);
    };
  }, []);

  // Support optional props passed from App.jsx while defaulting to localStorage state
  const profile = props.profile ? { ...cmsState.profile, ...props.profile } : cmsState.profile;
  const projects = Array.isArray(props.projects) ? props.projects : cmsState.projects;
  const skills = Array.isArray(props.skills) ? props.skills : cmsState.skills;
  const education = Array.isArray(props.education) ? props.education : cmsState.education;
  const rawPosts = Array.isArray(props.blogPosts || props.posts)
    ? props.blogPosts || props.posts
    : cmsState.blogPosts;

  const blogPosts = rawPosts.filter((post) => post.published !== false);

  const displayName = (
    profile.name ||
    profile.fullName ||
    profile.full_name ||
    'ALEXANDER VANCE'
  ).toUpperCase();

  const portraitSrc =
    profile.portraitUrl ||
    profile.avatarUrl ||
    profile.avatar_url ||
    profile.image ||
    FALLBACK_DATA.profile.portraitUrl;

  const categories = [
    'ALL',
    ...Array.from(
      new Set(
        projects
          .map((item) => item.category || item.type)
          .filter(Boolean)
          .map((c) => String(c).toUpperCase())
      )
    ),
  ];

  const visibleProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter(
          (item) => String(item.category || item.type || '').toUpperCase() === activeCategory
        );

  // Normalize skills whether stored as strings or objects
  const groupedSkills = skills.reduce((acc, item) => {
    if (typeof item === 'string') {
      const key = 'Core Competencies';
      if (!acc[key]) acc[key] = [];
      acc[key].push({ name: item });
      return acc;
    }
    const category = item.category || 'Quantitative & Financial';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white text-[#0A192F]">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION (Matches Attached Portrait & Typographic Layout)     */}
      {/* ==================================================================== */}
      <section
        id="home"
        className="relative hero-studio-surface border-b border-slate-200 overflow-hidden"
      >
        {/* Subtle Bloomberg-Inspired Architectural Grid */}
        <div className="pointer-events-none absolute inset-0 bloomberg-grid-overlay opacity-75" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-12 sm:pt-16 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 lg:gap-6 min-h-[540px] lg:min-h-[630px]">
            {/* Left Column: Stacked Headline, Summary & Rectangular CTA */}
            <div className="lg:col-span-7 pb-12 lg:pb-24 z-10">
              <div className="animate-apple-hero inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-7 bg-white/90 border border-slate-200 text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#0A192F]">
                <span className="w-1.5 h-1.5 bg-[#B45309]" />
                <span>{profile.title || 'ECONOMICS & FINANCIAL STRATEGY'}</span>
              </div>

              <h1 className="animate-apple-hero animate-delay-100 font-display font-extrabold uppercase tracking-[0.07em] leading-[1.12]">
                <span className="block text-[#0A192F] text-2xl sm:text-4xl xl:text-[42px]">
                  HELLO
                </span>
                <span className="block text-[#1D3557] text-2xl sm:text-4xl xl:text-[42px] mt-1">
                  MY NAME IS
                </span>
                <span className="block text-[#B45309] text-3xl sm:text-5xl xl:text-[56px] mt-1.5">
                  {displayName}
                </span>
              </h1>

              <p className="animate-apple-hero animate-delay-200 mt-6 max-w-xl font-mono-tabular text-sm sm:text-[15px] leading-relaxed text-slate-600">
                {profile.subtitle || profile.headline}
              </p>

              {/* Crisp Dark Navy Rectangular Button (Reference Style) + Gold-Accented Secondary CTA */}
              <div className="animate-apple-hero animate-delay-300 mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-9 py-4 bg-[#0A192F] text-white text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-[#112240] transition-colors duration-300"
                >
                  ABOUT ME
                </a>

                <a
                  href="#work"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0A192F] border border-[#0A192F] text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#0A192F] hover:text-white transition-colors duration-300"
                >
                  VIEW RESEARCH
                </a>

                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-4 text-[11px] font-mono-tabular font-semibold tracking-[0.16em] uppercase text-[#B45309] hover:text-[#0A192F] transition-colors"
                  >
                    <span>CV / RESUME</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>

              {/* Bloomberg-Inspired Key Metrics Bar */}
              <div className="animate-apple-hero animate-delay-400 mt-12 pt-6 border-t border-slate-300/80 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-slate-500">
                    RESEARCH MODELS
                  </p>
                  <p className="mt-1 font-mono-tabular text-xl font-bold text-[#0A192F]">
                    {String(projects.length).padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-slate-500">
                    CORE FOCUS
                  </p>
                  <p className="mt-1 font-mono-tabular text-xs sm:text-sm font-semibold text-[#B45309]">
                    MACRO · FINANCE
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-slate-500">
                    BASE
                  </p>
                  <p className="mt-1 font-mono-tabular text-xs sm:text-sm font-semibold text-[#0A192F] truncate">
                    {profile.location || 'GLOBAL'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Large Bottom-Anchored Professional Portrait */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end self-end">
              <div className="animate-apple-portrait relative w-full max-w-[430px] lg:max-w-none">
                <img
                  src={portraitSrc}
                  alt={displayName}
                  className="w-full h-[410px] sm:h-[490px] lg:h-[585px] object-cover object-top lg:object-contain lg:object-bottom select-none drop-shadow-[0_22px_36px_rgba(10,25,47,0.13)]"
                />

                {/* Minimalist Financial Credential Plaque */}
                <div className="hidden sm:flex items-center gap-3.5 absolute bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-3 shadow-sm">
                  <span className="w-1.5 h-8 bg-[#B45309]" />
                  <div>
                    <p className="text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-slate-500">
                      PORTFOLIO BRIEF
                    </p>
                    <p className="text-xs font-semibold text-[#0A192F]">
                      {profile.title || 'Economics & Financial Research'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. ABOUT & EXECUTIVE THESIS                                          */}
      {/* ==================================================================== */}
      <section id="about" className="py-24 bg-white border-b border-slate-200">
        <RevealBlock className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.2em] text-[#B45309]">
                01 // EXECUTIVE PROFILE
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A192F]">
                Analytical Precision &amp; Market Perspective.
              </h2>
              <div className="mt-5 w-12 h-[3px] bg-[#B45309]" />
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line">
                {profile.bio}
              </p>

              <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono-tabular">
                {profile.location && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="w-2 h-2 bg-[#0A192F]" />
                    <span>LOCATION: {profile.location}</span>
                  </div>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-[#0A192F] hover:text-[#B45309] transition-colors"
                  >
                    <span className="w-2 h-2 bg-[#B45309]" />
                    <span>{profile.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ==================================================================== */}
      {/* 3. WORK, RESEARCH & PROJECTS                                         */}
      {/* ==================================================================== */}
      <section id="work" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
        <RevealBlock className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.2em] text-[#B45309]">
                02 // SELECTED RESEARCH &amp; WORK
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A192F]">
                Financial Models, Empirical Studies &amp; Projects
              </h2>
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-[11px] font-mono-tabular uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#0A192F] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-[#0A192F]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleProjects.map((project, index) => {
              const title = project.title || project.name || 'Untitled Study';
              const description = project.description || project.summary || '';
              const tags = project.tags || project.tech || project.technologies || [];
              const liveUrl = project.link || project.liveUrl || project.live_url || project.url;
              const repoUrl = project.github || project.repoUrl || project.repo_url;

              return (
                <article
                  key={project.id || index}
                  onClick={() => setSelectedProject(project)}
                  className="executive-card bg-white border border-slate-200 hover:border-[#0A192F] p-8 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[11px] font-mono-tabular uppercase tracking-[0.16em] text-slate-500">
                        {(project.category || 'RESEARCH').toUpperCase()} · #{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] font-mono-tabular text-[#B45309] font-semibold">
                        {project.year || project.date || 'PORTFOLIO'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0A192F] group-hover:text-[#B45309] transition-colors">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {description}
                    </p>

                    {/* Bloomberg-Inspired Tabular Metrics */}
                    {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {project.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="bg-[#F8FAFC] px-3 py-2.5 border-l-2 border-[#B45309]"
                          >
                            <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-slate-500">
                              {metric.label}
                            </p>
                            <p className="mt-0.5 font-mono-tabular text-sm font-bold text-[#0A192F]">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(tags) &&
                        tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 bg-slate-100 text-[#0A192F] text-[11px] font-mono-tabular"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs font-mono-tabular font-semibold">
                      {repoUrl && (
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-500 hover:text-[#0A192F] transition-colors"
                        >
                          CODE
                        </a>
                      )}
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#B45309] hover:text-[#0A192F] transition-colors"
                        >
                          OPEN &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </RevealBlock>
      </section>

      {/* ==================================================================== */}
      {/* 4. SKILLS & QUANTITATIVE TOOLKIT                                     */}
      {/* ==================================================================== */}
      <section id="skills" className="py-24 bg-white border-b border-slate-200">
        <RevealBlock className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.2em] text-[#B45309]">
            03 // QUANTITATIVE &amp; FINANCIAL TOOLKIT
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A192F] mb-14">
            Core Competencies &amp; Technical Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div
                key={category}
                className="border border-slate-200 bg-[#F8FAFC]/70 p-7"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <h3 className="text-xs font-mono-tabular font-bold uppercase tracking-[0.16em] text-[#0A192F]">
                    {category}
                  </h3>
                  <span className="w-2 h-2 bg-[#B45309]" />
                </div>

                <ul className="mt-5 space-y-4">
                  {items.map((skill, idx) => {
                    const level = skill.level ?? skill.proficiency;
                    return (
                      <li key={skill.id || skill.name || idx}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-medium text-[#0A192F]">{skill.name}</span>
                          {typeof level === 'number' && (
                            <span className="font-mono-tabular text-xs text-slate-500">
                              {level}%
                            </span>
                          )}
                        </div>
                        {typeof level === 'number' && (
                          <div className="w-full h-1.5 bg-slate-200 overflow-hidden">
                            <div
                              className="h-full bg-[#0A192F] transition-all duration-700"
                              style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ==================================================================== */}
      {/* 5. EDUCATION & CREDENTIALS                                           */}
      {/* ==================================================================== */}
      {education.length > 0 && (
        <section id="education" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
          <RevealBlock className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.2em] text-[#B45309]">
              04 // ACADEMIC BACKGROUND
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A192F] mb-12">
              Education &amp; Credentials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="bg-white border border-slate-200 p-8 border-t-[3px] border-t-[#0A192F]"
                >
                  <p className="text-xs font-mono-tabular font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                    {edu.period || edu.year || edu.graduationYear}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#0A192F]">
                    {edu.degree || edu.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {edu.institution || edu.school || edu.university}
                  </p>
                  {(edu.details || edu.description || edu.honors) && (
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {edu.details || edu.description || edu.honors}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>
        </section>
      )}

      {/* ==================================================================== */}
      {/* 6. BLOG POSTS & ECONOMIC INSIGHTS                                    */}
      {/* ==================================================================== */}
      {blogPosts.length > 0 && (
        <section id="insights" className="py-24 bg-white border-b border-slate-200">
          <RevealBlock className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.2em] text-[#B45309]">
              05 // COMMENTARY &amp; BRIEFINGS
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A192F] mb-12">
              Economic Notes &amp; Published Insights
            </h2>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {blogPosts.map((post, idx) => {
                const dateLabel = post.date || post.published_at || post.createdAt || 'BRIEFING';
                return (
                  <article
                    key={post.id || post.slug || idx}
                    onClick={() => setSelectedPost(post)}
                    className="py-7 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex items-center gap-3 text-[11px] font-mono-tabular uppercase tracking-wider text-slate-500">
                        <span>{dateLabel}</span>
                        {(post.category || post.tags?.[0]) && (
                          <>
                            <span>·</span>
                            <span className="text-[#B45309] font-semibold">
                              {post.category || post.tags[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#0A192F] group-hover:text-[#B45309] transition-colors">
                        {post.title}
                      </h3>
                      {(post.excerpt || post.summary) && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {post.excerpt || post.summary}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {post.slug && (
                        <Link
                          to={`/blog/${post.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-mono-tabular uppercase tracking-wider text-slate-500 hover:text-[#0A192F]"
                        >
                          PERMALINK
                        </Link>
                      )}
                      <span className="text-xs font-mono-tabular font-semibold text-[#0A192F] group-hover:text-[#B45309] transition-colors">
                        READ &rarr;
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </RevealBlock>
        </section>
      )}

      {/* ==================================================================== */}
      {/* 7. DARK NAVY EXECUTIVE FOOTER & CONTACT                              */}
      {/* ==================================================================== */}
      <footer id="contact" className="bg-[#0A192F] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-14 border-b border-[#1D3557]">
            <div>
              <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.22em] text-[#EAB308]">
                06 // DIRECT CORRESPONDENCE
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                {profile.name || 'Connect & Inquire'}
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-md">
                Open to discussions on macroeconomic research, financial modeling, advisory mandates, and institutional opportunities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="px-8 py-4 bg-white text-[#0A192F] text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#EAB308] hover:text-[#0A192F] transition-colors"
                >
                  EMAIL DIRECTLY
                </a>
              )}
              {profile.socials &&
                Object.entries(profile.socials).map(([platform, url]) =>
                  url ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 border border-slate-600 text-[11px] font-mono-tabular uppercase tracking-[0.16em] text-slate-200 hover:border-[#EAB308] hover:text-[#EAB308] transition-colors"
                    >
                      {platform}
                    </a>
                  ) : null
                )}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tabular text-slate-400">
            <span>
              &copy; {new Date().getFullYear()} {displayName}. ALL RIGHTS RESERVED.
            </span>
            <a href="#home" className="hover:text-[#EAB308] transition-colors uppercase tracking-widest">
              BACK TO TOP &uarr;
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#060D1A]/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.18em] text-[#B45309]">
                  {(selectedProject.category || 'RESEARCH DOSSIER').toUpperCase()}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#0A192F]">
                  {selectedProject.title || selectedProject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-3 py-1 text-xs font-mono-tabular uppercase border border-slate-200 text-slate-600 hover:text-[#0A192F]"
              >
                CLOSE
              </button>
            </div>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
              {selectedProject.description || selectedProject.summary}
            </p>

            {Array.isArray(selectedProject.metrics) && selectedProject.metrics.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] p-3 border-l-2 border-[#B45309]">
                    <p className="text-[10px] font-mono-tabular uppercase text-slate-500">{m.label}</p>
                    <p className="mt-0.5 font-mono-tabular text-sm font-bold text-[#0A192F]">{m.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Post Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-[#060D1A]/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-[0.18em] text-[#B45309]">
                  {selectedPost.category || 'ECONOMIC INSIGHT'}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#0A192F]">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-3 py-1 text-xs font-mono-tabular uppercase border border-slate-200 text-slate-600 hover:text-[#0A192F]"
              >
                CLOSE
              </button>
            </div>

            <div className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
              {selectedPost.content || selectedPost.excerpt || selectedPost.summary}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
