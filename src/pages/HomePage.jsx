import React, { useState, useEffect, useRef } from 'react';

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
                  <p className
