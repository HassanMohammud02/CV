import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  Printer,
  Share2,
  Search,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Send,
  Bot,
  BarChart3,
  ShieldCheck,
  Lock,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Clock,
  CheckCircle2,
  Sun,
  Moon,
  Command,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Layers,
  User,
  Globe,
  BookOpen,
  Copy,
  Activity,
  MapPin,
  ArrowRight,
  Building2,
  Compass,
  Upload,
  LogOut,
  Users
} from 'lucide-react';

// ============================================================================
// STORAGE KEYS & INITIAL DOMAIN DATA (HASSAN ABDIRAHMAN MOHAMMUD - OSLOMET)
// ============================================================================

const STORAGE_KEYS = {
  PROFILE: 'ham_exec_profile_v1',
  PROJECTS: 'ham_exec_projects_v1',
  SKILLS: 'ham_exec_skills_v1',
  EXPERIENCE: 'ham_exec_experience_v1',
  CERTIFICATIONS: 'ham_exec_certs_v1',
  ARTICLES: 'ham_exec_articles_v1',
  ANALYTICS: 'ham_exec_analytics_v1',
  INQUIRIES: 'ham_exec_inquiries_v1'
};

const DEFAULT_PROFILE = {
  name: 'Hassan Abdirahman Mohammud',
  shortName: 'Hassan A. Mohammud',
  monogram: 'HAM',
  title: 'Economics & Business Administration Graduate | Business Analyst | Finance & Data Analytics Enthusiast',
  domainBadge: 'hassanmohammud.vercel.app',
  headline: 'Turning business data into strategic decisions.',
  subheadline:
    'Economics & Business Administration graduate from OsloMet with interests in finance, business analytics, sustainability, and digital transformation.',
  intro:
    'Trained in quantitative economics, corporate finance, and managerial accounting at OsloMet – Oslo Metropolitan University, I combine commercial customer-facing execution from IKEA Norway with modern BI analytics (Excel, Power BI, SQL, Python) to solve complex business problems.',
  careerObjective:
    'Seeking an analytical graduate role in Management Consulting, Corporate Finance, Financial Controlling, or Business Intelligence where I can translate financial and operational data into measurable strategic value and sustainable growth.',
  university: 'OsloMet – Oslo Metropolitan University',
  degree: 'Bachelor in Economics and Business Administration (Økonomi og Administrasjon)',
  location: 'Oslo, Norway',
  availability: 'Available for Graduate Roles & Consulting',
  email: 'hassan.mohammud@outlook.com',
  linkedin: 'https://linkedin.com/in/hassan-abdirahman-mohammud',
  github: 'https://github.com/hassan-mohammud',
  languages: [
    { name: 'Norwegian', level: 'Fluent (C2 / Professional)', percent: 98 },
    { name: 'English', level: 'Fluent (C2 / Academic & Business)', percent: 96 },
    { name: 'Somali', level: 'Native (Bilingual)', percent: 100 }
  ],
  coreToolkit: ['Excel', 'Power BI', 'SQL', 'Python', 'Financial Modeling', 'Tableau', 'Microsoft 365'],
  coursework: [
    'Financial Accounting & Analysis',
    'Managerial Accounting & Budgeting',
    'Corporate Finance & Valuation',
    'Quantitative Methods & Econometrics',
    'Strategic Management',
    'Macroeconomics & Market Dynamics',
    'Sustainable Business & ESG'
  ]
};

const AREAS_OF_INTEREST = [
  {
    id: 'int-fin-analysis',
    title: 'Financial Analysis',
    tag: 'Valuation & Performance',
    summary: 'Ratio diagnostics, working capital evaluation, cash flow forecasting, and DCF company valuation.',
    application:
      'Applies DuPont decomposition, WACC sensitivity modeling, and peer multiples benchmarking to evaluate capital allocation efficiency and investment attractiveness.'
  },
  {
    id: 'int-budgeting',
    title: 'Budgeting',
    tag: 'FP&A & Cost Control',
    summary: 'Zero-based budgeting, rolling forecasts, variance decomposition, and departmental cost governance.',
    application:
      'Designs dynamic Excel and Power BI budget-vs-actual models that isolate price, volume, and mix variances for proactive executive decision-making.'
  },
  {
    id: 'int-accounting',
    title: 'Accounting',
    tag: 'IFRS / NGAAP & Reporting',
    summary: 'Financial statement preparation, accrual reconciliation, cost accounting, and audit-ready documentation.',
    application:
      'Bridges raw ledger entries with strategic management reporting, ensuring transparent cost-center tracking and compliance with Norwegian and international standards.'
  },
  {
    id: 'int-esg',
    title: 'ESG',
    tag: 'EU Taxonomy & Sustainability',
    summary: 'Double materiality assessments, Scope 1–3 emissions benchmarking, and sustainable finance integration.',
    application:
      'Evaluates how environmental and governance disclosures impact cost of capital, regulatory readiness, and long-term enterprise resilience on Oslo Børs.'
  },
  {
    id: 'int-strategy',
    title: 'Corporate Strategy',
    tag: 'Growth & Operating Models',
    summary: 'Competitive positioning, market entry sizing (TAM/SAM/SOM), value chain optimization, and M&A screening.',
    application:
      'Uses structured hypothesis-driven frameworks (Porter’s Five Forces, unit economics trees) to translate market research into actionable boardroom roadmaps.'
  },
  {
    id: 'int-bi',
    title: 'Business Intelligence',
    tag: 'Power BI & KPI Architecture',
    summary: 'Automated executive dashboards, DAX data modeling, and self-service KPI reporting ecosystems.',
    application:
      'Replaces static monthly spreadsheets with interactive Power BI & Tableau scorecards that give department heads real-time visibility into margins and bottlenecks.'
  },
  {
    id: 'int-analytics',
    title: 'Data Analytics',
    tag: 'SQL & Python Insights',
    summary: 'Exploratory statistical analysis, customer segmentation, churn driver modeling, and cohort retention.',
    application:
      'Queries multi-table relational datasets using SQL and Python (Pandas) to uncover behavioral patterns and quantify operational ROI.'
  }
];

const DEFAULT_EXPERIENCE = [
  {
    id: 'exp-ikea',
    role: 'Customer Relations & Commercial Operations Specialist',
    organization: 'IKEA Norway',
    period: '2023 – Present',
    location: 'Oslo, Norway',
    type: 'Corporate & Retail Operations',
    summary:
      'Frontline commercial problem-solving, customer retention management, and store workflow optimization in a high-volume Nordic retail environment.',
    achievements: [
      'Resolved 45+ daily complex customer orders, returns, and B2B/B2C service cases while maintaining a 94%+ customer satisfaction rating.',
      'Identified recurring fulfillment and click-and-collect queue bottlenecks, proposing workflow adjustments that reduced peak-hour wait times by ~18%.',
      'Collaborated across logistics, sales, and inventory teams to reconcile stock discrepancies and improve commercial KPI reporting accuracy.',
      'Trained and mentored 6 new team members on CRM systems, conflict resolution, and service-level quality standards.'
    ]
  },
  {
    id: 'exp-student-org',
    role: 'Financial Coordinator & Executive Board Member',
    organization: 'OsloMet Business & Economics Student Association',
    period: '2022 – 2025',
    location: 'Oslo, Norway',
    type: 'Leadership & Budgeting',
    summary:
      'Full ownership of annual budgeting, accounting reconciliation, corporate sponsorship partnerships, and career-event project coordination.',
    achievements: [
      'Managed an annual operating budget of NOK 380,000+, delivering quarterly variance reports and zero audit discrepancies at year-end.',
      'Secured NOK 120,000 in corporate sponsorships from Nordic finance and consulting firms through structured value-proposition pitches.',
      'Coordinated cross-functional teams of 15+ student volunteers to execute career fairs, case workshops, and keynote panels for 500+ attendees.'
    ]
  },
  {
    id: 'exp-case-comp',
    role: 'Student Strategy & Financial Case Lead',
    organization: 'Nordic Business & Consulting Case Challenges',
    period: '2023 – 2025',
    location: 'OsloMet / Oslo',
    type: 'Consulting & Case Analysis',
    summary:
      'Led 4-person analytical teams under 24-to-48-hour deadlines to solve real corporate profitability, ESG transition, and market expansion cases.',
    achievements: [
      'Built integrated 3-statement Excel models, DCF valuations, and executive slide decks presented directly to senior industry judges.',
      'Placed Top 3 Finalist in the OsloMet Corporate Strategy & Sustainability Case Challenge.'
    ]
  }
];

const DEFAULT_CERTIFICATIONS = [
  {
    id: 'cert-pbi',
    title: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300 Track)',
    issuer: 'Microsoft Learn',
    year: '2025',
    domain: 'Data Analytics',
    credentialId: 'MS-PL300-8421'
  },
  {
    id: 'cert-bmc',
    title: 'Bloomberg Market Concepts (BMC) & ESG Certificate',
    issuer: 'Bloomberg for Education',
    year: '2025',
    domain: 'Finance & ESG',
    credentialId: 'BMC-99304-OSL'
  },
  {
    id: 'cert-fmva',
    title: 'Financial Modeling & Corporate Valuation Specialization',
    issuer: 'Corporate Finance Institute (CFI)',
    year: '2024',
    domain: 'Finance',
    credentialId: 'CFI-FMV-5109'
  },
  {
    id: 'cert-esg',
    title: 'Sustainable Finance & EU Taxonomy Principles',
    issuer: 'Nordic Sustainable Business Academy',
    year: '2025',
    domain: 'Sustainability',
    credentialId: 'NSBA-ESG-204'
  }
];

const DEFAULT_PROJECTS = [
  {
    id: 'proj-nordic-dcf',
    title: 'Nordic Retail Equity Valuation & DCF Financial Model',
    category: 'Finance',
    datePublished: '2026-06',
    views: 642,
    description:
      'Comprehensive intrinsic and relative valuation of a publicly listed Nordic specialty retailer using a 5-year Discounted Cash Flow (DCF) model, WACC derivation, and trading multiples.',
    problem:
      'Post-inflation shifts in Nordic consumer discretionary spending created sharp valuation dispersion among Oslo Børs retail equities, making it unclear whether current share prices reflected sustainable free cash flow generation.',
    analysis:
      'Analyzed 5 years of historical IFRS income statements, balance sheets, and cash flow statements, decomposing gross margin compression, inventory turnover days, and lease-adjusted leverage ratios against 6 Nordic peers.',
    methodology:
      'Constructed a dynamic 3-statement Excel financial model with bull/base/bear revenue drivers, bottom-up CAPM WACC calculation (8.4%), terminal Gordon Growth assumptions, and two-way sensitivity tables across WACC and EBIT margins.',
    results:
      'Estimated an intrinsic equity value 14.8% above prevailing market trading levels under the base case, identifying inventory normalization and omnichannel fulfillment margin recovery as the primary valuation catalysts.',
    recommendations:
      'Prioritize working capital release by trimming slow-moving seasonal SKUs by 9% and reallocating capital expenditure from physical store expansion toward high-ROIC automated fulfillment.',
    keyLearnings:
      'Small shifts in terminal operating margin and discount rate assumptions disproportionately drive enterprise value, underscoring the necessity of disciplined sensitivity stress-testing.',
    technologies: ['Excel', 'Financial Modeling', 'DCF Valuation', 'Capital IQ / Public Filings'],
    skills: ['Financial Analysis', 'Investment Evaluation', 'Risk Assessment'],
    images: [],
    github: 'https://github.com/hassan-mohammud/nordic-retail-dcf-valuation',
    demo: 'https://hassanmohammud.vercel.app/#projects',
    metrics: [
      { label: 'Implied Upside', value: '+14.8%' },
      { label: 'Base WACC', value: '8.4%' },
      { label: 'Forecast Horizon', value: '5 Yrs' }
    ]
  },
  {
    id: 'proj-budget-variance',
    title: 'Corporate Budget Planning & Variance Analysis Framework',
    category: 'Finance',
    datePublished: '2026-04',
    views: 518,
    description:
      'Zero-based departmental budgeting and automated monthly variance decomposition model built to improve cost accountability and cash flow predictability.',
    problem:
      'Traditional incremental annual budgets masked rising indirect overhead costs and failed to separate volume-driven revenue growth from unit cost inflation across operating divisions.',
    analysis:
      'Audited 24 months of general ledger cost-center transactions across 5 departments, uncovering 11.4% recurring budget overruns concentrated in vendor software renewals and overtime scheduling.',
    methodology:
      'Built a driver-based rolling 12-month budget template in Excel (Power Query + dynamic arrays) decomposing monthly EBIT variances into Volume, Price/Mix, and Operating Expense efficiency components.',
    results:
      'Identified NOK 1.45M in addressable annual overhead savings and reduced monthly financial close variance reporting preparation time by 60%.',
    recommendations:
      'Institute quarterly rolling re-forecasts paired with threshold-based variance commentary (>5% deviation) for department budget owners.',
    keyLearnings:
      'Effective budgeting is as much a behavioral governance mechanism as a spreadsheet exercise—clear ownership and transparent KPIs drive cost discipline.',
    technologies: ['Excel', 'Power Query', 'Managerial Accounting', 'FP&A Modeling'],
    skills: ['Budgeting', 'Financial Analysis', 'Project Management'],
    images: [],
    github: 'https://github.com/hassan-mohammud/fpa-budget-variance-model',
    demo: 'https://hassanmohammud.vercel.app/#projects',
    metrics: [
      { label: 'Identified Savings', value: 'NOK 1.45M' },
      { label: 'Reporting Speed', value: '+60%' },
      { label: 'Cost Centers', value: '5 Units' }
    ]
  },
  {
    id: 'proj-powerbi-retail',
    title: 'Executive Retail Operations & Margin Power BI Dashboard',
    category: 'Data Analytics',
    datePublished: '2026-05',
    views: 735,
    description:
      'Interactive multi-store Business Intelligence cockpit tracking gross margin, inventory turnover, basket size, and fulfillment SLAs across regional retail hubs.',
    problem:
      'Regional store managers relied on fragmented weekly CSV exports, delaying visibility into margin erosion, stockouts, and underperforming product categories.',
    analysis:
      'Profiled 140,000+ point-of-sale and inventory movement records across 8 Nordic store locations to uncover correlation between stockout frequency, promotional discounting, and net contribution margin.',
    methodology:
      'Modeled a clean Star Schema in Power BI with custom DAX measures (YoY Growth, Gross Margin ROI, Rolling 30-Day Stock Cover) and drill-through category scorecards.',
    results:
      'Consolidated 7 manual reports into one automated executive dashboard, spotlighting 3 low-margin product lines responsible for 42% of promotional markdown leakage.',
    recommendations:
      'Implement automated reorder-point alerts for top-quintile margin SKUs and tighten promotional discount approval thresholds on high-velocity items.',
    keyLearnings:
      'Executive dashboards succeed when every visual answers a specific management question within 10 seconds rather than overwhelming users with raw metrics.',
    technologies: ['Power BI', 'DAX', 'Excel', 'SQL'],
    skills: ['Power BI', 'Excel', 'Strategy'],
    images: [],
    github: 'https://github.com/hassan-mohammud/retail-margin-powerbi-suite',
    demo: 'https://hassanmohammud.vercel.app/#projects',
    metrics: [
      { label: 'Records Modeled', value: '140K+' },
      { label: 'Markdown Leakage', value: '-42% ID’d' },
      { label: 'Manual Reports Cut', value: '7 → 1' }
    ]
  },
  {
    id: 'proj-sql-python-retention',
    title: 'Customer Service Bottleneck & Retention Analytics in SQL & Python',
    category: 'Data Analytics',
    datePublished: '2026-03',
    views: 489,
    description:
      'End-to-end operational and customer cohort study inspired by omnichannel retail service workflows, quantifying how resolution speed impacts repeat purchase retention.',
    problem:
      'High post-purchase support ticket volume during seasonal peaks strained service staffing and risked eroding long-term customer lifetime value (CLV).',
    analysis:
      'Segmented 65,000 anonymized service interactions by issue category, channel, first-contact resolution (FCR) rate, and 90-day repeat purchase behavior.',
    methodology:
      'Extracted and joined multi-table order/ticket schemas in SQL (CTEs & window functions), then performed cohort retention and logistic driver analysis in Python (Pandas, SciPy).',
    results:
      'Demonstrated that orders resolved within 24 hours achieved a 23 percentage-point higher 90-day repeat purchase rate compared to multi-touch escalations.',
    recommendations:
      'Deploy proactive automated delivery-delay notifications and empower frontline specialists with self-service refund thresholds up to NOK 500.',
    keyLearnings:
      'Operational customer service metrics directly translate into financial customer lifetime value when analyzed through cohort retention lenses.',
    technologies: ['SQL', 'Python', 'Pandas', 'Tableau'],
    skills: ['SQL', 'Python', 'Communication'],
    images: [],
    github: 'https://github.com/hassan-mohammud/service-retention-analytics',
    demo: 'https://hassanmohammud.vercel.app/#projects',
    metrics: [
      { label: 'Retention Lift', value: '+23 pp' },
      { label: 'Tickets Analyzed', value: '65,000' },
      { label: 'Target SLA', value: '<24 hrs' }
    ]
  },
  {
    id: 'proj-esg-oslo-bors',
    title: 'Oslo Børs Mid-Cap ESG Reporting & Sustainable Investment Research',
    category: 'Sustainability',
    datePublished: '2026-05',
    views: 594,
    description:
      'Comparative ESG disclosure audit and EU Taxonomy alignment study evaluating 15 mid-cap Norwegian companies across industrials, seafood, and renewable services.',
    problem:
      'Institutional investors increasingly mandate CSRD and EU Taxonomy compliance, yet mid-cap issuers exhibit wide variance in Scope 3 emissions transparency and governance disclosures.',
    analysis:
      'Scored 15 Oslo Børs mid-cap annual sustainability reports across 28 quantitative and qualitative ESG indicators, testing correlation between ESG disclosure quality and valuation multiples.',
    methodology:
      'Developed a weighted ESG & CSR Scorecard aligned with GRI and EU Taxonomy pillars, normalizing carbon intensity per NOK million revenue and board independence metrics.',
    results:
      'Found that top-quartile ESG reporters traded at an average 1.6x EV/EBITDA premium and exhibited 19% lower 3-year share price volatility than bottom-quartile peers.',
    recommendations:
      'Establish standardized supplier carbon data templates and link 15% of executive variable compensation to verified Scope 1 & 2 reduction milestones.',
    keyLearnings:
      'Credible ESG reporting reduces information asymmetry for institutional capital and acts as a leading indicator of operational risk management.',
    technologies: ['ESG Framework', 'Excel', 'Power BI', 'EU Taxonomy'],
    skills: ['ESG Reporting', 'Sustainable Finance', 'Corporate Responsibility'],
    images: [],
    github: 'https://github.com/hassan-mohammud/oslo-bors-esg-research',
    demo: 'https://hassanmohammud.vercel.app/#projects',
    metrics: [
      { label: 'Companies Audited', value: '15 Firms' },
      { label: 'Valuation Premium', value: '+1.6x' },
      { label: 'Volatility Drop', value: '-19%' }
    ]
  },
  {
    id: 'proj-affordable-housing',
    title: 'Nordic Affordable Housing Initiative — Business Plan & Feasibility Study',
    category: 'Entrepreneurship',
    datePublished: '2026-02',
    views: 682,
    description:
      'Venture feasibility study, unit-economics model, and public-private partnership (PPP) business plan addressing urban housing affordability for students and young professionals in Oslo.',
    problem:
      'Rapid urban rent escalation in Oslo outpaced student and entry-level graduate disposable incomes, creating acute housing insecurity and talent retention pressure.',
    analysis:
      'Conducted primary survey research (n=240 Oslo students/graduates), municipal zoning cost benchmarking, and modular construction lifecycle cost analysis.',
    methodology:
      'Built a 7-year project finance cash flow model incorporating municipal land-lease subsidies, green bond debt financing, shared-amenity revenue streams, and occupancy stress tests.',
    results:
      'Demonstrated a viable operating model delivering rents 22% below Oslo market median while generating a 9.6% levered project IRR and BREEAM-NOR sustainability certification.',
    recommendations:
      'Pilot a 120-unit modular co-living development near OsloMet transit corridors structured via a blended municipal-institutional impact fund.',
    keyLearnings:
      'Social-impact ventures achieve institutional scalability when mission outcomes (below-market rent) are structurally embedded into disciplined unit economics.',
    technologies: ['Business Planning', 'Financial Modeling', 'Market Research', 'Excel'],
    skills: ['Strategy', 'Leadership', 'Sustainable Finance', 'Budgeting'],
    images: [],
    github: 'https://github.com/hassan-mohammud/nordic-affordable-housing-plan',
    demo: 'https://hassanmohammud.vercel.app/#projects',
    metrics: [
      { label: 'Rent Reduction', value: '-22%' },
      { label: 'Projected IRR', value: '9.6%' },
      { label: 'Pilot Capacity', value: '120 Units' }
    ]
  }
];

const DEFAULT_SKILLS = [
  // Finance
  {
    id: 'sk-fin-1',
    name: 'Financial Analysis',
    category: 'Finance',
    level: 92,
    tools: 'Excel, Financial Statements, Ratio & Cash Flow Analysis',
    note: '3-statement modeling, DuPont ROE decomposition, working capital & liquidity diagnostics.'
  },
  {
    id: 'sk-fin-2',
    name: 'Budgeting',
    category: 'Finance',
    level: 90,
    tools: 'Zero-Based Budgeting, Rolling Forecasts, Variance Analysis',
    note: 'Hands-on experience managing NOK 380K+ organizational budgets and departmental variance tracking.'
  },
  {
    id: 'sk-fin-3',
    name: 'Investment Evaluation',
    category: 'Finance',
    level: 88,
    tools: 'DCF, NPV, IRR, WACC, Comparable Multiples',
    note: 'Intrinsic equity valuation and capital budgeting feasibility under bull/base/bear scenarios.'
  },
  {
    id: 'sk-fin-4',
    name: 'Risk Assessment',
    category: 'Finance',
    level: 85,
    tools: 'Sensitivity Tables, Scenario Stress Testing, Credit & Liquidity Risk',
    note: 'Quantifying macro, interest-rate, and operational margin sensitivities for capital protection.'
  },

  // Business
  {
    id: 'sk-bus-1',
    name: 'Strategy',
    category: 'Business',
    level: 91,
    tools: 'Market Sizing, Competitive Benchmarking, Value Chain Analysis',
    note: 'Structured consulting problem-solving honed through OsloMet case competitions and business plans.'
  },
  {
    id: 'sk-bus-2',
    name: 'Leadership',
    category: 'Business',
    level: 90,
    tools: 'Board Governance, Team Mentoring, Cross-Functional Alignment',
    note: 'Student association board leadership and onboarding/mentoring new colleagues at IKEA Norway.'
  },
  {
    id: 'sk-bus-3',
    name: 'Communication',
    category: 'Business',
    level: 94,
    tools: 'Executive Presentations, Stakeholder Reporting, CRM',
    note: 'Translating technical financial and BI insights into clear recommendations in Norwegian and English.'
  },
  {
    id: 'sk-bus-4',
    name: 'Project Management',
    category: 'Business',
    level: 89,
    tools: 'Milestone Planning, Process Improvement, Agile Coordination',
    note: 'Delivering multi-stakeholder events, sponsorship campaigns, and analytical case studies on schedule.'
  },

  // Analytics
  {
    id: 'sk-ana-1',
    name: 'Excel',
    category: 'Analytics',
    level: 95,
    tools: 'Financial Modeling, Power Query, XLOOKUP, Pivot Tables',
    note: 'Advanced dynamic spreadsheet architecture, scenario switches, and automated data cleaning.'
  },
  {
    id: 'sk-ana-2',
    name: 'Power BI',
    category: 'Analytics',
    level: 90,
    tools: 'DAX, Star Schema Data Modeling, Executive KPI Dashboards',
    note: 'Interactive commercial and financial scorecards replacing manual weekly reporting.'
  },
  {
    id: 'sk-ana-3',
    name: 'SQL',
    category: 'Analytics',
    level: 86,
    tools: 'PostgreSQL, Joins, CTEs, Window Functions, Aggregations',
    note: 'Extracting, validating, and transforming multi-table business and customer datasets.'
  },
  {
    id: 'sk-ana-4',
    name: 'Python',
    category: 'Analytics',
    level: 83,
    tools: 'Pandas, NumPy, Matplotlib, Exploratory Data Analysis',
    note: 'Automating cohort retention analysis, statistical hypothesis tests, and financial data pipelines.'
  },

  // Sustainability
  {
    id: 'sk-sus-1',
    name: 'ESG Reporting',
    category: 'Sustainability',
    level: 89,
    tools: 'CSRD, GRI Standards, EU Taxonomy, Materiality Matrix',
    note: 'Evaluating corporate sustainability disclosures and carbon intensity benchmarks on Oslo Børs.'
  },
  {
    id: 'sk-sus-2',
    name: 'Sustainable Finance',
    category: 'Sustainability',
    level: 87,
    tools: 'Green Bonds, ESG Valuation Multiples, Impact ROI',
    note: 'Integrating environmental risk factors into cost-of-capital and project finance models.'
  },
  {
    id: 'sk-sus-3',
    name: 'Corporate Responsibility',
    category: 'Sustainability',
    level: 90,
    tools: 'Circular Economy, Ethical Supply Chains, Stakeholder Governance',
    note: 'Practical exposure to circular retail operations at IKEA and social-impact housing design.'
  }
];

const DEFAULT_ARTICLES = [
  {
    id: 'art-esg-valuation',
    title: 'How ESG Disclosure Quality Influences Cost of Capital on Oslo Børs',
    category: 'Sustainability & Finance',
    date: '2026-06-12',
    readTime: '5 min read',
    views: 412,
    excerpt:
      'Examining the empirical relationship between transparent Scope 1–3 emissions reporting, EU Taxonomy alignment, and institutional valuation multiples among Nordic mid-cap equities.',
    content: [
      'Across Nordic capital markets, Environmental, Social, and Governance (ESG) reporting has evolved from voluntary corporate storytelling into a core determinant of institutional capital allocation.',
      'In reviewing 15 mid-cap companies listed on Oslo Børs, a clear pattern emerges: firms with standardized, auditable climate and governance disclosures consistently command lower equity risk premiums and lower share price volatility than peers with fragmented reporting.',
      'For financial analysts and corporate controllers, the implication is straightforward. Preparing early for EU CSRD standards and linking sustainability KPIs to capital expenditure planning is no longer merely a compliance exercise—it directly protects enterprise valuation.'
    ]
  },
  {
    id: 'art-powerbi-fpa',
    title: 'From Static Spreadsheets to Automated FP&A: Pairing SQL & Power BI with Financial Controlling',
    category: 'Data Analytics',
    date: '2026-05-04',
    readTime: '4 min read',
    views: 368,
    excerpt:
      'Why modern finance teams are augmenting traditional Excel workflows with relational SQL queries and DAX-powered Power BI dashboards to accelerate monthly variance reviews.',
    content: [
      'Excel remains the undisputed lingua franca of corporate finance and ad-hoc valuation modeling. However, when organizations rely on manual copy-paste routines to consolidate monthly store or departmental actuals, analysts spend 70% of their time preparing data rather than interpreting it.',
      'By structuring transaction records in a clean SQL star schema and building automated DAX variance measures in Power BI, finance and operations leaders gain immediate drill-down visibility into price, volume, and mix drivers.',
      'The most effective business analysts bridge both worlds: preserving Excel’s flexibility for scenario modeling while leveraging Power BI and SQL for governed, single-source-of-truth KPI reporting.'
    ]
  },
  {
    id: 'art-ikea-consulting',
    title: 'Commercial Lessons from the Frontline: What Retail Operations Taught Me About Process Improvement',
    category: 'Business & Strategy',
    date: '2026-03-28',
    readTime: '4 min read',
    views: 495,
    excerpt:
      'Reflections on how frontline customer operations at IKEA Norway reveal the real drivers behind NPS scores, fulfillment bottlenecks, and cross-functional teamwork.',
    content: [
      'In business school case studies, operational bottlenecks appear as neat boxes on a process flowchart. On a busy Saturday afternoon in customer relations at IKEA Norway, those bottlenecks are human, immediate, and measurable in real time.',
      'Working directly with hundreds of customers taught me that most service friction originates upstream—in inventory data handoffs, unclear delivery expectations, or rigid escalation rules.',
      'Combining empathetic stakeholder communication with structured root-cause tracking allows frontline teams to turn customer feedback into concrete process improvements that simultaneously lift satisfaction and reduce handling costs.'
    ]
  }
];

const DEFAULT_ANALYTICS = {
  visitors: 1840,
  resumeDownloads: 146,
  recruiterInquiries: 19,
  dailyVisitors: [
    { label: 'Mon', count: 195 },
    { label: 'Tue', count: 230 },
    { label: 'Wed', count: 215 },
    { label: 'Thu', count: 280 },
    { label: 'Fri', count: 310 },
    { label: 'Sat', count: 265 },
    { label: 'Sun', count: 345 }
  ],
  topSkillsInspected: [
    { name: 'Financial Modeling & Excel', pct: 92 },
    { name: 'Power BI & KPI Dashboards', pct: 86 },
    { name: 'SQL & Python Analytics', pct: 79 },
    { name: 'ESG & Sustainable Finance', pct: 74 },
    { name: 'Budgeting & Accounting', pct: 71 }
  ]
};

const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    name: 'Maren Solberg',
    company: 'Nordic Advisory Partners',
    roleType: 'Junior Management Consultant',
    email: 'maren.solberg@nordicadvisory.no',
    message:
      'Hi Hassan, we were impressed by your OsloMet Economics background, IKEA operational experience, and Power BI/DCF case studies. Would love to invite you for a first-round case interview in Oslo.',
    date: '2026-11-21'
  }
];

// ============================================================================
// SAFE LOCALSTORAGE HOOK
// ============================================================================

function usePersistedState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (_) {
      // Fallback to initialValue if storage is unavailable
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (_) {
      // Ignore quota errors gracefully
    }
  }, [key, state]);

  return [state, setState];
}

// ============================================================================
// BESPOKE EXECUTIVE HEADSHOT ILLUSTRATION COMPONENT
// ============================================================================

function ExecutiveHeadshotCard({ profile, darkMode }) {
  return (
    <div className="relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F1D32] p-6 shadow-xl shadow-slate-900/5 dark:shadow-black/40 transition-colors">
      {/* Top Corporate Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Candidate Profile
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800/90 text-[#0B192C] dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
          {profile.domainBadge}
        </span>
      </div>

      {/* Bespoke Executive Portrait & Identity */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative w-28 h-32 rounded-xl overflow-hidden border-2 border-[#0B192C]/15 dark:border-slate-700 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shrink-0 shadow-md">
          <svg
            viewBox="0 0 140 160"
            className="w-full h-full"
            role="img"
            aria-label="Executive portrait of Hassan Abdirahman Mohammud"
          >
            <defs>
              <linearGradient id="bgStudio" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={darkMode ? '#1E293B' : '#E2E8F0'} />
                <stop offset="100%" stopColor={darkMode ? '#0B192C' : '#CBD5E1'} />
              </linearGradient>
              <linearGradient id="navySuit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#13294B" />
                <stop offset="100%" stopColor="#0B192C" />
              </linearGradient>
            </defs>
            <rect width="140" height="160" fill="url(#bgStudio)" />
            <line x1="0" y1="36" x2="140" y2="36" stroke="#94A3B8" strokeOpacity="0.15" />
            <line x1="104" y1="0" x2="104" y2="160" stroke="#94A3B8" strokeOpacity="0.15" />

            {/* Shoulders & Tailored Navy Suit */}
            <path d="M 16 160 C 18 122, 42 112, 70 112 C 98 112, 122 122, 124 160 Z" fill="url(#navySuit)" />
            {/* Crisp White Dress Shirt */}
            <polygon points="56,112 70,146 84,112" fill="#FFFFFF" />
            {/* Consulting Emerald Silk Tie */}
            <polygon points="67,116 73,116 75,142 70,150 65,142" fill="#047857" />
            {/* Warm Gold Pocket Square Accent */}
            <polygon points="94,132 106,129 104,136 93,136" fill="#B45309" />

            {/* Neck & Head */}
            <rect x="61" y="92" width="18" height="22" rx="6" fill="#6D4C3D" />
            <ellipse cx="70" cy="68" rx="23" ry="28" fill="#7C5644" />
            {/* Hairline */}
            <path d="M 47 64 C 47 42, 93 42, 93 64 C 91 50, 49 50, 47 64 Z" fill="#1E293B" />
            {/* Facial Features */}
            <circle cx="61" cy="66" r="2.2" fill="#0F172A" />
            <circle cx="79" cy="66" r="2.2" fill="#0F172A" />
            <path d="M 57 60 Q 61 58 65 60" stroke="#1E293B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 75 60 Q 79 58 83 60" stroke="#1E293B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 63 79 Q 70 84 77 79" stroke="#3E2723" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div className="text-center sm:text-left space-y-2 flex-1">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white leading-snug">
              {profile.name}
            </h2>
            <p className="text-xs font-medium text-[#047857] dark:text-emerald-400 mt-0.5">
              BSc Økonomi og Administrasjon
            </p>
          </div>

          <div className="space-y-1.5 pt-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
              <span className="font-medium">{profile.university}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#047857] shrink-0" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Credentials & Core Toolkit Summary */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Primary Focus</span>
          <span className="font-semibold text-[#0B192C] dark:text-slate-100">
            Finance • BI Analytics • ESG
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Languages</span>
          <span className="font-semibold text-[#0B192C] dark:text-slate-100">
            Norwegian • English • Somali
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.coreToolkit.slice(0, 5).map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F8FAFC] dark:bg-slate-800/90 text-[#1E293B] dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CUSTOM FINANCIAL / ANALYTICAL CASE STUDY VISUAL BANNER
// ============================================================================

function CaseStudyVisualPreview({ project }) {
  const uploadedImg = project.images && project.images.length > 0 ? project.images[0] : null;

  if (uploadedImg) {
    return (
      <div className="relative w-full h-44 overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <img
          src={uploadedImg}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#0B192C]/90 text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>
    );
  }

  const categoryStyles = {
    Finance: { accent: '#047857', secondary: '#B45309' },
    'Data Analytics': { accent: '#0284C7', secondary: '#047857' },
    Sustainability: { accent: '#059669', secondary: '#0D9488' },
    Entrepreneurship: { accent: '#B45309', secondary: '#0B192C' }
  };
  const theme = categoryStyles[project.category] || categoryStyles.Finance;

  return (
    <div className="relative w-full h-44 overflow-hidden bg-[#0B192C] border-b border-slate-200 dark:border-slate-800">
      <svg viewBox="0 0 460 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`p-grid-${project.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <linearGradient id={`p-area-${project.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <rect width="460" height="180" fill="#0B192C" />
        <rect width="460" height="180" fill={`url(#p-grid-${project.id})`} />

        {project.category === 'Finance' && (
          <g>
            <path
              d="M 40 135 L 115 118 L 190 124 L 265 92 L 340 76 L 420 52 L 420 150 L 40 150 Z"
              fill={`url(#p-area-${project.id})`}
            />
            <path
              d="M 40 135 L 115 118 L 190 124 L 265 92 L 340 76 L 420 52"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />
            {[
              [115, 118],
              [190, 124],
              [265, 92],
              [340, 76],
              [420, 52]
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#F59E0B" />
            ))}
          </g>
        )}

        {project.category === 'Data Analytics' && (
          <g>
            {[
              { x: 64, h: 46, c: '#38BDF8' },
              { x: 124, h: 68, c: '#0284C7' },
              { x: 184, h: 58, c: '#38BDF8' },
              { x: 244, h: 86, c: '#10B981' },
              { x: 304, h: 74, c: '#0284C7' },
              { x: 364, h: 98, c: '#10B981' }
            ].map((bar, idx) => (
              <rect
                key={idx}
                x={bar.x}
                y={145 - bar.h}
                width="34"
                height={bar.h}
                rx="4"
                fill={bar.c}
                fillOpacity="0.82"
              />
            ))}
          </g>
        )}

        {project.category === 'Sustainability' && (
          <g>
            <circle cx="145" cy="92" r="42" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="195 264" />
            <circle cx="145" cy="92" r="42" fill="none" stroke="#F59E0B" strokeWidth="8" strokeDasharray="55 264" strokeDashoffset="-198" />
            <rect x="225" y="62" width="175" height="10" rx="5" fill="#10B981" fillOpacity="0.7" />
            <rect x="225" y="84" width="138" height="10" rx="5" fill="#38BDF8" fillOpacity="0.6" />
            <rect x="225" y="106" width="156" height="10" rx="5" fill="#F59E0B" fillOpacity="0.7" />
          </g>
        )}

        {project.category === 'Entrepreneurship' && (
          <g>
            <path
              d="M 55 136 Q 185 130 265 94 T 410 46"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.8"
            />
            <line x1="55" y1="108" x2="410" y2="108" stroke="#10B981" strokeDasharray="5 5" strokeWidth="1.5" />
            <circle cx="242" cy="108" r="5" fill="#10B981" />
          </g>
        )}
      </svg>

      {/* Top Category & Date Badges */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-[#0B192C] shadow-sm">
          {project.category}
        </span>
        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0B192C]/85 text-slate-300 border border-white/10">
          {project.datePublished}
        </span>
      </div>

      {/* Bottom Metric Pill Strip */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="absolute bottom-2.5 inset-x-3 grid grid-cols-3 gap-2">
          {project.metrics.slice(0, 3).map((m, idx) => (
            <div
              key={idx}
              className="px-2 py-1 rounded-lg bg-[#0B192C]/90 border border-white/10 backdrop-blur-sm text-center"
            >
              <div className="text-xs font-bold tabular-nums text-white">{m.value}</div>
              <div className="text-[10px] text-slate-300 truncate">{m.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN EXECUTIVE PORTFOLIO APPLICATION
// ============================================================================

export default function App() {
  // Default to Clean Executive Alabaster Light Mode (#F8FAFC) with Optional Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [quickJumpQuery, setQuickJumpQuery] = useState('');

  // Persisted Portfolio Data (Instantly updates when edited in Admin CMS)
  const [profile, setProfile] = usePersistedState(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  const [projects, setProjects] = usePersistedState(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
  const [skills, setSkills] = usePersistedState(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
  const [experience, setExperience] = usePersistedState(STORAGE_KEYS.EXPERIENCE, DEFAULT_EXPERIENCE);
  const [certifications] = usePersistedState(STORAGE_KEYS.CERTIFICATIONS, DEFAULT_CERTIFICATIONS);
  const [articles, setArticles] = usePersistedState(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES);
  const [analytics, setAnalytics] = usePersistedState(STORAGE_KEYS.ANALYTICS, DEFAULT_ANALYTICS);
  const [inquiries, setInquiries] = usePersistedState(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);

  // Interactive States
  const [selectedInterestId, setSelectedInterestId] = useState(AREAS_OF_INTEREST[0].id);
  const [projectCategory, setProjectCategory] = useState('All');
  const [projectToolFilter, setProjectToolFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectSort, setProjectSort] = useState('newest');
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const [skillPillarFilter, setSkillPillarFilter] = useState('All');

  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategory, setArticleCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  // Recruiter Dashboard Inline Contact Drawer
  const [recruiterDrawerOpen, setRecruiterDrawerOpen] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    roleType: 'Graduate Analyst / Consulting Role',
    email: '',
    message: '',
    honeypot: ''
  });
  const [contactReceipt, setContactReceipt] = useState(false);

  // Admin CMS State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminTab, setAdminTab] = useState('projects');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Finance',
    description: '',
    problem: '',
    analysis: '',
    methodology: '',
    results: '',
    recommendations: '',
    keyLearnings: '',
    technologies: 'Excel, Power BI, Financial Modeling',
    skills: 'Financial Analysis, Budgeting',
    images: [],
    github: 'https://github.com/hassan-mohammud',
    demo: 'https://hassanmohammud.vercel.app',
    datePublished: new Date().toISOString().slice(0, 7)
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Finance & Strategy',
    excerpt: '',
    paragraph1: '',
    paragraph2: ''
  });

  const [newSkillForm, setNewSkillForm] = useState({
    name: '',
    category: 'Finance',
    level: 88,
    tools: '',
    note: ''
  });

  const [newExpForm, setNewExpForm] = useState({
    role: '',
    organization: '',
    period: '2025 – 2026',
    location: 'Oslo, Norway',
    summary: '',
    bullet: ''
  });

  // AI Recruiter Assistant State
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "Welcome! I am Hassan's Executive AI Recruiter Assistant. Ask me about Hassan Abdirahman Mohammud's Economics & Business Administration degree at OsloMet, his Finance & Power BI case studies, leadership at IKEA Norway, or select a quick question below.",
      navTarget: null
    }
  ]);
  const chatBottomRef = useRef(null);

  // Toast Notification Queue
  const [toasts, setToasts] = useState([]);
  const notify = useCallback((title, detail = '', tone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, detail, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3600);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add('dark');
    else html.classList.remove('dark');
  }, [darkMode]);

  // Keyboard shortcuts (Cmd/Ctrl+K and Escape)
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickJumpOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setQuickJumpOpen(false);
        setActiveCaseStudy(null);
        setActiveArticle(null);
        setRecruiterDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Scroll AI Assistant chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [assistantMessages, assistantOpen]);

  // Navigation Helper
  const goToPage = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setQuickJumpOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================================================
  // CV DOWNLOAD, PDF PRINT & SHARE HANDLERS
  // ============================================================================

  const handleDownloadCV = () => {
    setAnalytics((prev) => ({
      ...prev,
      resumeDownloads: prev.resumeDownloads + 1
    }));

    const cvContent = `================================================================================
HASSAN ABDIRAHMAN MOHAMMUD
Economics & Business Administration Graduate | Business Analyst | Finance & Data Analytics Enthusiast
Portfolio: https://${profile.domainBadge} | Location: ${profile.location}
Email: ${profile.email} | LinkedIn: ${profile.linkedin}
================================================================================

CAREER OBJECTIVE
${profile.careerObjective}

EDUCATION
• ${profile.degree}
  ${profile.university} | ${profile.location}
  Relevant Coursework: ${profile.coursework.join(', ')}

EXPERIENCE & LEADERSHIP
${experience
  .map(
    (exp) => `• ${exp.role} — ${exp.organization} (${exp.period}, ${exp.location})
  ${exp.summary}
${exp.achievements.map((a) => `  - ${a}`).join('\n')}`
  )
  .join('\n\n')}

KEY ANALYTICAL & BUSINESS CASE STUDIES
${projects
  .map(
    (p) => `• [${p.category}] ${p.title} (${p.datePublished})
  Results: ${p.results}
  Tools: ${p.technologies.join(', ')}`
  )
  .join('\n\n')}

CORE COMPETENCIES & TECHNICAL BUSINESS SKILLS
• Core Business: Accounting, Financial Reporting, Budget Planning, Stakeholder Communication, Project Coordination, Process Improvement, Customer Relationship Management
• Technical & Analytics: Excel (Financial Modeling, Power Query, Pivot Tables), Power BI (DAX, Data Modeling), Tableau, SQL, Python for Analytics (Pandas, NumPy), Microsoft 365, Financial Modeling (DCF, Multiples, Sensitivity Analysis)

CERTIFICATIONS
${certifications.map((c) => `• ${c.title} — ${c.issuer} (${c.year})`).join('\n')}

LANGUAGES
${profile.languages.map((l) => `• ${l.name}: ${l.level}`).join(' | ')}
================================================================================`;

    try {
      const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Hassan_Abdirahman_Mohammud_CV_OsloMet.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {
      // Fallback handled silently
    }

    notify(
      'Executive CV Downloaded',
      'Hassan_Abdirahman_Mohammud_CV_OsloMet.txt saved and Resume Downloads metric updated.'
    );
  };

  const handlePrintPDF = () => {
    setAnalytics((prev) => ({
      ...prev,
      resumeDownloads: prev.resumeDownloads + 1
    }));
    notify('Preparing Print / Save as PDF', 'Opening ATS-formatted executive print view...');
    setTimeout(() => {
      window.print();
    }, 350);
  };

  const handleCopyShareLink = () => {
    const shareUrl = `https://${profile.domainBadge}`;
    navigator.clipboard?.writeText(shareUrl);
    notify('Shareable Portfolio URL Copied', shareUrl);
  };

  // Open Case Study Modal & Track Live Project View
  const handleInspectCaseStudy = (proj) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === proj.id ? { ...item, views: (item.views || 0) + 1 } : item
      )
    );
    setActiveCaseStudy({ ...proj, views: (proj.views || 0) + 1 });
  };

  // Open Article Reader & Increment Views
  const handleInspectArticle = (article) => {
    setArticles((prev) =>
      prev.map((item) =>
        item.id === article.id ? { ...item, views: (item.views || 0) + 1 } : item
      )
    );
    setActiveArticle({ ...article, views: (article.views || 0) + 1 });
  };

  // ============================================================================
  // FILTERED & SORTED COLLECTIONS
  // ============================================================================

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchCat = projectCategory === 'All' || p.category === projectCategory;
        const matchTool =
          projectToolFilter === 'All' ||
          p.technologies.some((t) => t.toLowerCase().includes(projectToolFilter.toLowerCase())) ||
          p.skills.some((s) => s.toLowerCase().includes(projectToolFilter.toLowerCase()));
        const q = projectSearch.trim().toLowerCase();
        const matchQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q));
        return matchCat && matchTool && matchQuery;
      })
      .sort((a, b) => {
        if (projectSort === 'newest') return (b.datePublished || '').localeCompare(a.datePublished || '');
        if (projectSort === 'category') return a.category.localeCompare(b.category);
        if (projectSort === 'views') return (b.views || 0) - (a.views || 0);
        return 0;
      });
  }, [projects, projectCategory, projectToolFilter, projectSearch, projectSort]);

  // Featured Projects (1 from each category: Finance, Data Analytics, Sustainability, Entrepreneurship)
  const featuredByCategory = useMemo(() => {
    const categories = ['Finance', 'Data Analytics', 'Sustainability', 'Entrepreneurship'];
    return categories
      .map((cat) => projects.find((p) => p.category === cat))
      .filter(Boolean);
  }, [projects]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = articleCategory === 'All' || a.category === articleCategory;
      const q = articleSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [articles, articleCategory, articleSearch]);

  const totalProjectViews = useMemo(
    () => projects.reduce((acc, p) => acc + (p.views || 0), 0),
    [projects]
  );

  // ============================================================================
  // CONTACT FORM SUBMISSION
  // ============================================================================

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.honeypot) return;
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      notify('Incomplete Form', 'Please fill in your name, email address, and message.', 'error');
      return;
    }

    const created = {
      id: 'inq-' + Date.now(),
      name: contactForm.name.trim(),
      company: contactForm.company.trim() || 'Direct Organization',
      roleType: contactForm.roleType,
      email: contactForm.email.trim(),
      message: contactForm.message.trim(),
      date: new Date().toISOString().slice(0, 10)
    };

    setInquiries((prev) => [created, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      recruiterInquiries: prev.recruiterInquiries + 1
    }));
    setContactReceipt(true);
    setContactForm({
      name: '',
      company: '',
      roleType: 'Graduate Analyst / Consulting Role',
      email: '',
      message: '',
      honeypot: ''
    });
    notify('Inquiry Received', 'Thank you! Hassan will respond promptly.');
  };

  // ============================================================================
  // ADMIN CMS HANDLERS (INSTANT LIVE PUBLISHING + IMAGE FILE UPLOAD)
  // ============================================================================

  const handleImageFileUpload = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        notify('Unsupported File', 'Please select a PNG, JPG, or WebP image.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProjectForm((prev) => ({
            ...prev,
            images: [...prev.images, reader.result]
          }));
          notify('Image Uploaded', `${file.name} attached to project preview.`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePublishOrUpdateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) return;

    const techList = projectForm.technologies
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const skillList = projectForm.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProjectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProjectId
            ? {
                ...p,
                ...projectForm,
                technologies: techList,
                skills: skillList
              }
            : p
        )
      );
      setEditingProjectId(null);
      notify('Case Study Updated', `"${projectForm.title}" updated across the live portfolio.`);
    } else {
      const newProj = {
        id: 'proj-' + Date.now(),
        title: projectForm.title.trim(),
        category: projectForm.category,
        description: projectForm.description.trim(),
        problem:
          projectForm.problem.trim() ||
          'Identified structural inefficiencies in financial reporting and resource allocation requiring data-backed evaluation.',
        analysis:
          projectForm.analysis.trim() ||
          'Evaluated historical financial statements, operational KPIs, and market benchmarks to isolate key value drivers.',
        methodology:
          projectForm.methodology.trim() ||
          'Applied structured financial modeling, variance decomposition, and interactive BI visualization.',
        results:
          projectForm.results.trim() ||
          'Delivered actionable strategic insights improving cost transparency and decision speed.',
        recommendations:
          projectForm.recommendations.trim() ||
          'Implement standardized KPI governance and quarterly rolling forecast reviews.',
        keyLearnings:
          projectForm.keyLearnings.trim() ||
          'Combining quantitative rigor with executive storytelling accelerates stakeholder alignment.',
        technologies: techList,
        skills: skillList,
        images: projectForm.images,
        github: projectForm.github,
        demo: projectForm.demo,
        datePublished: projectForm.datePublished || new Date().toISOString().slice(0, 7),
        views: 1,
        metrics: [
          { label: 'Category', value: projectForm.category },
          { label: 'Status', value: 'Published' },
          { label: 'Tools', value: `${techList.length} Used` }
        ]
      };
      setProjects((prev) => [newProj, ...prev]);
      notify('New Case Study Published', `"${newProj.title}" is now live on the portfolio!`);
    }

    setProjectForm({
      title: '',
      category: 'Finance',
      description: '',
      problem: '',
      analysis: '',
      methodology: '',
      results: '',
      recommendations: '',
      keyLearnings: '',
      technologies: 'Excel, Power BI, Financial Modeling',
      skills: 'Financial Analysis, Budgeting',
      images: [],
      github: 'https://github.com/hassan-mohammud',
      demo: 'https://hassanmohammud.vercel.app',
      datePublished: new Date().toISOString().slice(0, 7)
    });
  };

  const startEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      problem: proj.problem || '',
      analysis: proj.analysis || '',
      methodology: proj.methodology || '',
      results: proj.results || '',
      recommendations: proj.recommendations || '',
      keyLearnings: proj.keyLearnings || '',
      technologies: proj.technologies.join(', '),
      skills: proj.skills.join(', '),
      images: proj.images || [],
      github: proj.github || '',
      demo: proj.demo || '',
      datePublished: proj.datePublished || '2026-06'
    });
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    notify('Case Study Removed', 'The project has been removed from the portfolio.');
  };

  const handlePublishArticle = (e) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.paragraph1.trim()) return;
    const created = {
      id: 'art-' + Date.now(),
      title: articleForm.title.trim(),
      category: articleForm.category,
      date: new Date().toISOString().slice(0, 10),
      readTime: '4 min read',
      views: 1,
      excerpt: articleForm.excerpt.trim() || articleForm.paragraph1.slice(0, 145) + '...',
      content: [articleForm.paragraph1.trim(), articleForm.paragraph2.trim()].filter(Boolean)
    };
    setArticles((prev) => [created, ...prev]);
    setArticleForm({
      title: '',
      category: 'Finance & Strategy',
      excerpt: '',
      paragraph1: '',
      paragraph2: ''
    });
    notify('Article Published', `"${created.title}" is now live in Insights & Articles.`);
  };

  const handleUpdateSkillRating = (id, newLevel) => {
    const clamped = Math.max(40, Math.min(100, Number(newLevel) || 80));
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, level: clamped } : s)));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillForm.name.trim()) return;
    const created = {
      id: 'sk-' + Date.now(),
      name: newSkillForm.name.trim(),
      category: newSkillForm.category,
      level: Number(newSkillForm.level) || 85,
      tools: newSkillForm.tools.trim() || 'Applied Business Toolkit',
      note: newSkillForm.note.trim() || 'Applied across academic case studies and financial analyses.'
    };
    setSkills((prev) => [...prev, created]);
    setNewSkillForm({ name: '', category: 'Finance', level: 88, tools: '', note: '' });
    notify('Skill Added', `"${created.name}" added to ${created.category}.`);
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!newExpForm.role.trim() || !newExpForm.organization.trim()) return;
    const created = {
      id: 'exp-' + Date.now(),
      role: newExpForm.role.trim(),
      organization: newExpForm.organization.trim(),
      period: newExpForm.period.trim() || '2026',
      location: newExpForm.location.trim() || 'Oslo, Norway',
      type: 'Experience',
      summary: newExpForm.summary.trim() || 'Delivered analytical and operational impact.',
      achievements: newExpForm.bullet.trim() ? [newExpForm.bullet.trim()] : []
    };
    setExperience((prev) => [created, ...prev]);
    setNewExpForm({
      role: '',
      organization: '',
      period: '2025 – 2026',
      location: 'Oslo, Norway',
      summary: '',
      bullet: ''
    });
    notify('Resume Experience Added', 'Updated across About Me, Recruiter Dashboard, and CV.');
  };

  // ============================================================================
  // AI RECRUITER ASSISTANT (GEMINI API + GROUNDED CONSULTING FALLBACK)
  // ============================================================================

  const getGroundedFallbackResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes('study') || q.includes('studying') || q.includes('education') || q.includes('oslomet')) {
      return {
        text: `Hassan Abdirahman Mohammud holds a **Bachelor in Economics and Business Administration (Økonomi og Administrasjon)** from **OsloMet – Oslo Metropolitan University** in Oslo, Norway. His academic specialization covers Financial Accounting, Managerial Accounting & Budgeting, Corporate Finance & Valuation, Quantitative Methods, Strategic Management, and Sustainable Business (ESG).`,
        navTarget: 'about'
      };
    }

    if (q.includes('finance') || q.includes('project') || q.includes('valuation') || q.includes('budget')) {
      return {
        text: `Hassan has completed structured consulting-grade case studies across Finance, Data Analytics, Sustainability, and Entrepreneurship:\n• **Nordic Retail Equity Valuation & DCF Financial Model** — 5-year 3-statement DCF & WACC sensitivity valuation identifying +14.8% implied upside.\n• **Corporate Budget Planning & Variance Analysis Framework** — Zero-based rolling budget model uncovering NOK 1.45M in addressable overhead savings.\n• **Oslo Børs Mid-Cap ESG Reporting Research** — EU Taxonomy & CSR analysis across 15 Norwegian firms.\n• **Executive Retail Operations Power BI Dashboard** — Multi-store margin and KPI cockpit.`,
        navTarget: 'projects'
      };
    }

    if (q.includes('skill') || q.includes('strongest') || q.includes('excel') || q.includes('power bi')) {
      return {
        text: `Hassan’s strongest competencies bridge **Corporate Finance**, **Business Intelligence**, and **Commercial Execution**:\n• **Finance & Accounting:** Financial Statement Analysis, DCF Valuation, Zero-Based Budgeting, Variance Decomposition, and Risk Assessment.\n• **Analytics & BI:** Advanced Excel (95% — Financial Modeling, Power Query, Pivot Tables), Power BI (90% — DAX & Star Schemas), SQL (86%), and Python for Analytics (83%).\n• **Sustainability & Business:** ESG Reporting (EU Taxonomy/CSRD), Corporate Strategy, and Stakeholder Communication in Norwegian, English, and Somali.`,
        navTarget: 'skills'
      };
    }

    if (q.includes('leadership') || q.includes('experience') || q.includes('ikea') || q.includes('student')) {
      return {
        text: `Hassan combines frontline commercial operations with organizational financial leadership:\n• **IKEA Norway (Customer Relations & Commercial Operations):** Resolved 45+ daily complex customer cases at a 94%+ satisfaction score, improved peak-hour queue workflows by ~18%, and mentored 6 new team members.\n• **OsloMet Business & Economics Student Association (Financial Coordinator & Board Member):** Managed an annual budget of **NOK 380,000+** with zero audit discrepancies, raised **NOK 120,000** in corporate sponsorships, and coordinated 15+ volunteers for career events of 500+ attendees.`,
        navTarget: 'about'
      };
    }

    if (q.includes('hire') || q.includes('why') || q.includes('fit') || q.includes('recruiter')) {
      return {
        text: `Hiring Hassan brings a rare combination of **quantitative Economics & Finance rigor**, **hands-on BI tooling (Excel, Power BI, SQL, Python)**, and **proven customer-facing commercial discipline from IKEA Norway**. Unlike graduates with purely theoretical coursework, Hassan has managed real NOK 380K+ budgets, built DCF valuation models, and knows how to communicate insights clearly to both frontline teams and executive stakeholders.`,
        navTarget: 'recruiter'
      };
    }

    return {
      text: `**Hassan Abdirahman Mohammud** is an Economics & Business Administration (Økonomi og Administrasjon) graduate from **OsloMet** specializing in Financial Analysis, Business Intelligence (Excel, Power BI, SQL, Python), ESG & Sustainability, and Corporate Strategy. You can inspect his 1-page **Recruiter Dashboard**, explore his **6 Case Studies**, or **Download his CV** directly.`,
      navTarget: 'recruiter'
    };
  };

  const handleAskAssistant = async (overrideQuestion = null) => {
    const promptText = (overrideQuestion ?? assistantInput).trim();
    if (!promptText || assistantLoading) return;

    setAssistantMessages((prev) => [
      ...prev,
      { id: 'u-' + Date.now(), sender: 'user', text: promptText }
    ]);
    if (!overrideQuestion) setAssistantInput('');
    setAssistantLoading(true);

    const lower = promptText.toLowerCase();
    let target = null;
    if (lower.includes('study') || lower.includes('education') || lower.includes('leadership') || lower.includes('ikea')) {
      target = 'about';
    } else if (lower.includes('project') || lower.includes('finance') || lower.includes('case')) {
      target = 'projects';
    } else if (lower.includes('skill') || lower.includes('excel') || lower.includes('power bi')) {
      target = 'skills';
    } else if (lower.includes('hire') || lower.includes('recruiter') || lower.includes('cv')) {
      target = 'recruiter';
    }

    const systemInstruction = `You are the Executive AI Recruiter Assistant for Hassan Abdirahman Mohammud, an Economics & Business Administration (Økonomi og Administrasjon) graduate from OsloMet – Oslo Metropolitan University in Oslo, Norway.
Tone: Polished, executive, Big Four / management consulting style (McKinsey, Deloitte, PwC).
Facts about Hassan:
- Headline: Turning business data into strategic decisions.
- Degree: Bachelor in Economics and Business Administration (Økonomi og Administrasjon), OsloMet.
- Experience: Customer Relations & Commercial Operations Specialist at IKEA Norway (94%+ CSAT, reduced queue times ~18%, mentored 6 staff); Financial Coordinator & Board Member at OsloMet Business & Economics Student Association (managed NOK 380,000+ annual budget, raised NOK 120,000 in sponsorships, coordinated 500+ attendee career events).
- Projects: ${projects.map((p) => `${p.title} [${p.category}]: ${p.results}`).join(' | ')}
- Skills: Financial Analysis, Budgeting, DCF Valuation, Accounting, ESG Reporting, Excel, Power BI, Tableau, SQL, Python for Analytics.
- Languages: Norwegian (Fluent), English (Fluent), Somali (Native).
Provide clear, concise, recruiter-friendly answers (3–5 sentences or structured bullets).`;

    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const callGeminiWithBackoff = async (retries = 2, delay = 800) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              systemInstruction: { parts: [{ text: systemInstruction }] }
            })
          });
          if (!response.ok) throw new Error('API unavailable');
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
          throw new Error('Empty response');
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
        }
      }
    };

    try {
      const reply = await callGeminiWithBackoff(2, 700);
      setAssistantMessages((prev) => [
        ...prev,
        { id: 'ai-' + Date.now(), sender: 'ai', text: reply, navTarget: target }
      ]);
    } catch (_) {
      const fallback = getGroundedFallbackResponse(promptText);
      setAssistantMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: fallback.text,
          navTarget: target || fallback.navTarget
        }
      ]);
    } finally {
      setAssistantLoading(false);
    }
  };

  // ============================================================================
  // NAVIGATION CONFIGURATION (10 EXECUTIVE PAGES)
  // ============================================================================

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'recruiter', label: 'Recruiter Dashboard', icon: Briefcase },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'resume', label: 'Resume / CV', icon: FileText },
    { id: 'projects', label: 'Projects & Case Studies', icon: Layers },
    { id: 'skills', label: 'Skills Matrix', icon: BarChart3 },
    { id: 'insights', label: 'Insights & Articles', icon: BookOpen },
    { id: 'analytics', label: 'Analytics Dashboard', icon: Activity },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'admin', label: 'Admin CMS', icon: ShieldCheck }
  ];

  const selectedInterest =
    AREAS_OF_INTEREST.find((item) => item.id === selectedInterestId) || AREAS_OF_INTEREST[0];

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D17] text-[#1E293B] dark:text-slate-100 transition-colors duration-300 selection:bg-[#047857]/20 selection:text-[#047857]">
      {/* Dedicated Print CSS for Clean Big-Four / ATS PDF Export */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, html { background: #ffffff !important; color: #0B192C !important; }
          .print-sheet {
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #0B192C !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* ==================================================================== */}
      {/* STICKY EXECUTIVE NAVIGATION BAR                                      */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goToPage('home')}
              className="flex items-center gap-3 text-left group shrink-0"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0B192C] dark:bg-[#047857] text-white flex items-center justify-center font-serif font-bold text-sm tracking-wider shadow-sm">
                {profile.monogram}
              </div>
              <div>
                <div className="font-serif text-sm sm:text-base font-bold text-[#0B192C] dark:text-white leading-tight group-hover:text-[#047857] transition-colors">
                  {profile.shortName}
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  OsloMet • Economics & Business Analytics
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage('recruiter')}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activePage === 'recruiter'
                    ? 'bg-[#047857] text-white border-[#047857]'
                    : 'bg-emerald-50/80 dark:bg-emerald-950/40 text-[#047857] dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/70 hover:bg-emerald-100/80'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter Quick View</span>
              </button>

              <button
                type="button"
                onClick={() => setQuickJumpOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 hover:border-[#047857]/50 transition-colors"
                title="Quick Navigation (Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-[#047857]" />
                <span className="hidden lg:inline">Navigate</span>
                <kbd className="text-[10px] font-mono px-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle Executive Dark Mode"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#047857]/50 transition-colors"
                title={darkMode ? 'Switch to Executive Alabaster Light' : 'Switch to Executive Navy Dark'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0B192C]" />}
              </button>

              <button
                type="button"
                onClick={handleDownloadCV}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0B192C] hover:bg-[#13294B] dark:bg-[#047857] dark:hover:bg-emerald-600 text-white shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop 10-Page Executive Sub-Navigation Bar */}
          <nav
            aria-label="Primary sections"
            className="hidden lg:flex items-center gap-1 py-2 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToPage(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#0B192C] dark:bg-[#047857] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0B192C] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B192C] px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToPage(item.id)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 border text-left ${
                      isActive
                        ? 'bg-[#0B192C] dark:bg-[#047857] text-white border-transparent'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleDownloadCV}
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#047857] text-white flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Executive CV</span>
            </button>
          </div>
        )}
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT CONTAINER                                               */}
      {/* ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ================================================================== */}
        {/* PAGE 1: HOME                                                       */}
        {/* ================================================================== */}
        {activePage === 'home' && (
          <div className="space-y-16">
            {/* Executive Consulting Hero Section */}
            <section className="rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#047857] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/70">
                    <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse" />
                    <span>{profile.availability}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                      {profile.title}
                    </div>
                    <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0B192C] dark:text-white leading-[1.12]">
                      {profile.headline}
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      {profile.subheadline}
                    </p>
                  </div>

                  {/* Career Objective Callout Box */}
                  <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C]/80 border-l-4 border-[#047857] space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                      Career Objective & Value Proposition
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {profile.careerObjective}
                    </p>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleDownloadCV}
                      className="px-5 py-3 rounded-xl text-sm font-semibold bg-[#0B192C] hover:bg-[#13294B] dark:bg-[#047857] dark:hover:bg-emerald-600 text-white shadow-sm inline-flex items-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => goToPage('contact')}
                      className="px-5 py-3 rounded-xl text-sm font-semibold bg-[#047857] hover:bg-emerald-800 dark:bg-white dark:text-[#0B192C] dark:hover:bg-slate-100 text-white inline-flex items-center gap-2 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => goToPage('recruiter')}
                      className="px-4 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[#0B192C] dark:text-slate-200 hover:border-[#047857] inline-flex items-center gap-2 transition-all"
                    >
                      <Briefcase className="w-4 h-4 text-[#B45309]" />
                      <span>Recruiter Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Executive Headshot Card */}
                <div className="lg:col-span-5">
                  <ExecutiveHeadshotCard profile={profile} darkMode={darkMode} />
                </div>
              </div>
            </section>

            {/* Executive Key Highlights Strip */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309] dark:text-amber-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Foundation</span>
                </div>
                <div className="font-serif text-base font-bold text-[#0B192C] dark:text-white">
                  BSc Economics & Business Admin
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  OsloMet – Oslo Metropolitan University (Økonomi og Administrasjon)
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                  <Compass className="w-4 h-4" />
                  <span>4 Core Pillars</span>
                </div>
                <div className="font-serif text-base font-bold text-[#0B192C] dark:text-white">
                  Finance, BI, ESG & Strategy
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Valuation, KPI reporting, sustainability & venture feasibility
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B192C] dark:text-sky-400">
                  <Globe className="w-4 h-4" />
                  <span>Multilingual Fluency</span>
                </div>
                <div className="font-serif text-base font-bold text-[#0B192C] dark:text-white">
                  Norwegian, English & Somali
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Executive communication across Nordic and international teams
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>Core Analytical Toolkit</span>
                </div>
                <div className="font-serif text-base font-bold text-[#0B192C] dark:text-white">
                  Excel, Power BI, SQL & Python
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  DCF financial modeling, DAX dashboards & cohort analytics
                </p>
              </div>
            </section>

            {/* Featured Case Studies Preview (1 from each of the 4 categories) */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                    Selected Analytical & Strategic Work
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] dark:text-white mt-1">
                    Featured Case Studies Across Four Domains
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => goToPage('projects')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#047857] dark:text-emerald-400 hover:underline"
                >
                  <span>Explore All {projects.length} Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredByCategory.map((proj) => (
                  <article
                    key={proj.id}
                    onClick={() => handleInspectCaseStudy(proj)}
                    className="cursor-pointer group rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 hover:border-[#047857] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <CaseStudyVisualPreview project={proj} />
                      <div className="p-6 space-y-2.5">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B192C] dark:text-white group-hover:text-[#047857] transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#047857] dark:text-emerald-400">
                        <span>Read Full Consulting Case Study</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Recruiter Value Proposition & CTA Banner */}
            <section className="rounded-2xl bg-[#0B192C] text-white p-8 sm:p-10 shadow-lg border border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    For Hiring Managers, Consulting Recruiters & Finance Teams
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                    Ready to Contribute Immediate Analytical Rigor & Commercial Execution
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Access Hassan’s unified 1-page Recruiter Dashboard to inspect qualifications, OsloMet coursework, IKEA Norway operations metrics, and downloadable CV.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => goToPage('recruiter')}
                    className="px-5 py-3 rounded-xl text-sm font-semibold bg-[#047857] hover:bg-emerald-600 text-white transition-colors"
                  >
                    Open Recruiter Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage('contact')}
                    className="px-5 py-3 rounded-xl text-sm font-semibold bg-white text-[#0B192C] hover:bg-slate-100 transition-colors"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 2: RECRUITER DASHBOARD (1-CLICK HIRING OVERVIEW)              */}
        {/* ================================================================== */}
        {activePage === 'recruiter' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recruiter Fast-Track Executive Summary</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] dark:text-white">
                  {profile.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {profile.degree} • {profile.university} • {profile.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrintPDF}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0B192C] hover:bg-[#13294B] dark:bg-[#047857] text-white inline-flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>PDF Resume Download</span>
                </button>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white inline-flex items-center gap-1.5"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white inline-flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <button
                  type="button"
                  onClick={() => setRecruiterDrawerOpen((o) => !o)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white inline-flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Direct Contact Form</span>
                </button>
              </div>
            </div>

            {recruiterDrawerOpen && (
              <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-[#0B192C] border border-emerald-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                    Fast-Track Recruiter Message to Hassan
                  </h2>
                  <button
                    type="button"
                    onClick={() => setRecruiterDrawerOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Recruiter Name *"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Company / Firm"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Role details or interview availability..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="sm:col-span-2 px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-[#047857] hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Education */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309] dark:text-amber-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                  {profile.degree}
                </h2>
                <p className="text-xs font-semibold text-[#047857] dark:text-emerald-400">
                  {profile.university}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {profile.coursework.map((cw) => (
                    <span
                      key={cw}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {cw}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Experience */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                  <Building2 className="w-4 h-4" />
                  <span>Experience & Leadership</span>
                </div>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-b last:border-0 border-slate-100 dark:border-slate-800 pb-2.5 last:pb-0"
                    >
                      <div className="text-sm font-bold text-[#0B192C] dark:text-white">{exp.role}</div>
                      <div className="text-xs text-[#047857] dark:text-emerald-400">
                        {exp.organization} ({exp.period})
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {exp.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Core Skills & Tools */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B192C] dark:text-sky-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>Core Skills & Tools</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Excel (Financial Modeling)',
                    'Power BI (DAX)',
                    'Tableau',
                    'SQL',
                    'Python for Analytics',
                    'Financial Modeling (DCF)',
                    'Accounting & Budgeting',
                    'ESG & EU Taxonomy',
                    'Stakeholder Communication',
                    'Process Improvement'
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F8FAFC] dark:bg-slate-800 text-[#0B192C] dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Languages */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                  <Globe className="w-4 h-4" />
                  <span>Languages</span>
                </div>
                <div className="space-y-3">
                  {profile.languages.map((lang) => (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-[#0B192C] dark:text-white">{lang.name}</span>
                        <span className="text-slate-500">{lang.level}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#047857]"
                          style={{ width: `${lang.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Certifications */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309] dark:text-amber-400">
                  <Award className="w-4 h-4" />
                  <span>Certifications</span>
                </div>
                <ul className="space-y-2.5 text-xs">
                  {certifications.map((c) => (
                    <li key={c.id} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[#0B192C] dark:text-white">{c.title}</div>
                        <div className="text-slate-500">
                          {c.issuer} • {c.year}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Key Projects */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                    <Layers className="w-4 h-4" />
                    <span>Key Case Studies</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToPage('projects')}
                    className="text-xs font-semibold text-[#047857] hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2.5">
                  {projects.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleInspectCaseStudy(p)}
                      className="w-full p-2.5 rounded-xl text-left bg-[#F8FAFC] dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-[#047857] transition-all flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase text-[#B45309] dark:text-amber-400">
                          {p.category}
                        </div>
                        <div className="text-xs font-bold text-[#0B192C] dark:text-white truncate">
                          {p.title}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#047857] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 3: ABOUT ME (EDUCATION, INTERESTS & EXPERIENCE TIMELINE)      */}
        {/* ================================================================== */}
        {activePage === 'about' && (
          <div className="space-y-14">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                Academic & Commercial Profile
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white">
                Economics Rigor Meets Practical Business Execution
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {profile.intro}
              </p>
            </div>

            {/* Education Highlight Card */}
            <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-[#B45309] dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/70">
                  <GraduationCap className="w-4 h-4" />
                  <span>Higher Education • Oslo, Norway</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C] dark:text-white">
                  {profile.degree}
                </h2>
                <p className="text-sm font-semibold text-[#047857] dark:text-emerald-400">
                  {profile.university}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Comprehensive business and economics curriculum integrating financial accounting, corporate investment analysis, quantitative econometrics, organizational leadership, and sustainable value creation.
                </p>
              </div>
              <div className="lg:col-span-5 p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Core Academic Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800 text-[#0B192C] dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive Areas of Interest Grid */}
            <section className="space-y-5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C] dark:text-white">
                  Interactive Areas of Interest
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Select any discipline below to see how Hassan applies it in analytical and commercial contexts.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {AREAS_OF_INTEREST.map((item) => {
                  const active = item.id === selectedInterest.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedInterestId(item.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        active
                          ? 'bg-[#0B192C] dark:bg-[#047857] text-white border-transparent shadow-md'
                          : 'bg-white dark:bg-[#0F1D32] text-[#0B192C] dark:text-slate-200 border-slate-200/90 dark:border-slate-800 hover:border-[#047857]'
                      }`}
                    >
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-wider ${
                          active ? 'text-amber-300' : 'text-[#047857] dark:text-emerald-400'
                        }`}
                      >
                        {item.tag.split(' ')[0]}
                      </div>
                      <div className="text-xs sm:text-sm font-bold mt-1 leading-snug">{item.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Discipline Detail Panel */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-[#047857]/40 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                    {selectedInterest.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0B192C] dark:text-white">
                    {selectedInterest.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {selectedInterest.summary}
                  </p>
                </div>
                <div className="md:col-span-7 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] dark:text-amber-400 mb-1">
                    Practical Application & Methodology
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedInterest.application}
                  </p>
                </div>
              </div>
            </section>

            {/* Experience & Leadership Timeline */}
            <section className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C] dark:text-white">
                  Experience, Budgeting & Leadership Journey
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Highlighting customer operations at IKEA Norway, student organization financial stewardship, and consulting case leadership.
                </p>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#047857]/40 space-y-6">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-sm"
                  >
                    <span className="absolute -left-[33px] sm:-left-[41px] top-7 w-4 h-4 rounded-full bg-[#047857] ring-4 ring-[#F8FAFC] dark:ring-[#070D17]" />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#047857] dark:text-emerald-400">
                        {exp.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B192C] dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-[#B45309] dark:text-amber-400 mb-3">
                      {exp.organization} • {exp.location}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                      {exp.summary}
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 4: RESUME / CV (BIG FOUR & ATS PRINTABLE FORMAT)              */}
        {/* ================================================================== */}
        {activePage === 'resume' && (
          <div className="space-y-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
              <div>
                <h1 className="font-serif text-xl font-bold text-[#0B192C] dark:text-white">
                  Executive Curriculum Vitae
                </h1>
                <p className="text-xs text-slate-500">
                  ATS-structured consulting CV • Downloaded {analytics.resumeDownloads} times
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrintPDF}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B192C] hover:bg-[#13294B] dark:bg-[#047857] text-white inline-flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#047857] hover:bg-emerald-700 text-white inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-slate-200 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4 text-[#047857]" />
                  <span>Copy Shareable Link ({profile.domainBadge})</span>
                </button>
              </div>
            </div>

            <div className="print-sheet max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-7">
              <div className="border-b-2 border-[#0B192C] dark:border-slate-700 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] dark:text-white">
                    {profile.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#047857] dark:text-emerald-400 mt-1">
                    {profile.title}
                  </p>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 sm:text-right space-y-0.5">
                  <div className="font-semibold">{profile.location}</div>
                  <div>{profile.email}</div>
                  <div>https://{profile.domainBadge}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                  Executive Profile & Objective
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {profile.careerObjective}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C]/80 border border-slate-200/80 dark:border-slate-800">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#0B192C] dark:text-white">
                    Core Business Competencies
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {[
                      'Accounting',
                      'Financial Reporting',
                      'Budget Planning',
                      'Stakeholder Communication',
                      'Project Coordination',
                      'Process Improvement',
                      'Customer Relationship Mgmt'
                    ].map((comp) => (
                      <li key={comp} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#0B192C] dark:text-white">
                    Technical Business Skills
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <li>
                      <strong>Excel:</strong> Financial Modeling, Power Query, Pivot Tables
                    </li>
                    <li>
                      <strong>Power BI & Tableau:</strong> DAX, Data Modeling, KPI Dashboards
                    </li>
                    <li>
                      <strong>SQL & Python:</strong> Relational Queries, Pandas, NumPy Analytics
                    </li>
                    <li>
                      <strong>Financial Modeling & M365:</strong> DCF, Multiples, Sensitivity Analysis
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                  Experience & Organizational Leadership
                </h3>
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-serif text-base font-bold text-[#0B192C] dark:text-white">
                        {exp.role} —{' '}
                        <span className="font-sans font-semibold text-[#047857] dark:text-emerald-400">
                          {exp.organization}
                        </span>
                      </h4>
                      <span className="text-xs font-mono text-slate-500">
                        {exp.period} | {exp.location}
                      </span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {exp.achievements.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                  Education
                </h3>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-serif text-base font-bold text-[#0B192C] dark:text-white">
                    {profile.degree}
                  </div>
                  <span className="text-xs font-semibold text-[#047857] dark:text-emerald-400">
                    {profile.university}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Key Coursework:</strong> {profile.coursework.join(' • ')}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                  Selected Finance, Analytics & Sustainability Case Studies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800"
                    >
                      <div className="text-xs font-bold text-[#0B192C] dark:text-white">
                        [{p.category}] {p.title}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{p.results}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="md:col-span-7 space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                    Certifications
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {certifications.map((c) => (
                      <li key={c.id}>
                        • <strong>{c.title}</strong> ({c.issuer}, {c.year})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-5 space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-amber-400">
                    Languages
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {profile.languages.map((l) => (
                      <li key={l.name}>
                        • <strong>{l.name}:</strong> {l.level}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 5: PROJECTS & CASE STUDIES                                    */}
        {/* ================================================================== */}
        {activePage === 'projects' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                  Consulting & Analytical Portfolio ({filteredProjects.length} of {projects.length})
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white mt-1">
                  Business Case Studies & Quantitative Projects
                </h1>
              </div>
              <button
                type="button"
                onClick={() => goToPage('admin')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-700 text-[#0B192C] dark:text-slate-200 hover:border-[#047857] inline-flex items-center gap-1.5 self-start md:self-auto"
              >
                <Plus className="w-3.5 h-3.5 text-[#047857]" />
                <span>Publish New Case Study</span>
              </button>
            </div>

            {/* Category Tabs, Search, Tool Pills & Sort */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'Finance', 'Data Analytics', 'Sustainability', 'Entrepreneurship'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProjectCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      projectCategory === cat
                        ? 'bg-[#0B192C] dark:bg-[#047857] text-white shadow-sm'
                        : 'bg-[#F8FAFC] dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-[#047857]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-9 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search case studies by topic (e.g., DCF, Power BI, ESG, Housing, Budget)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#047857]"
                  />
                </div>
                <div className="md:col-span-3">
                  <select
                    value={projectSort}
                    onChange={(e) => setProjectSort(e.target.value)}
                    aria-label="Sort projects"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="category">Sort: Category</option>
                    <option value="views">Sort: Most Viewed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">Filter by Tool:</span>
                {['All', 'Excel', 'Power BI', 'SQL', 'Python', 'Financial Modeling', 'ESG', 'Business Planning'].map(
                  (tool) => (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => setProjectToolFilter(tool)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                        projectToolFilter === tool
                          ? 'bg-[#047857] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0B192C]'
                      }`}
                    >
                      {tool}
                    </button>
                  )
                )}
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                <p className="text-sm text-slate-500">No case studies match your current filter selection.</p>
                <button
                  type="button"
                  onClick={() => {
                    setProjectCategory('All');
                    setProjectToolFilter('All');
                    setProjectSearch('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B192C] text-white"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <article
                    key={proj.id}
                    onClick={() => handleInspectCaseStudy(proj)}
                    className="cursor-pointer group rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 hover:border-[#047857] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <CaseStudyVisualPreview project={proj} />
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-semibold text-[#B45309] dark:text-amber-400">
                            {proj.category}
                          </span>
                          <span className="inline-flex items-center gap-1 tabular-nums">
                            <Eye className="w-3.5 h-3.5" /> {proj.views || 0}
                          </span>
                        </div>
                        <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white group-hover:text-[#047857] transition-colors">
                          {proj.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#047857] dark:text-emerald-400">
                        <span>Open 6-Part Case Analysis</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 6: SKILLS MATRIX (FINANCE, BUSINESS, ANALYTICS, SUSTAINABILITY)*/}
        {/* ================================================================== */}
        {activePage === 'skills' && (
          <div className="space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                Competency Assessment Matrix
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white">
                Finance, Business, Analytics & Sustainability Capabilities
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Structured proficiency ratings backed by OsloMet coursework, corporate experience, and analytical case deliverables.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Finance', 'Business', 'Analytics', 'Sustainability'].map((pillar) => (
                <button
                  key={pillar}
                  type="button"
                  onClick={() => setSkillPillarFilter(pillar)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    skillPillarFilter === pillar
                      ? 'bg-[#0B192C] dark:bg-[#047857] text-white shadow-sm'
                      : 'bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#047857]'
                  }`}
                >
                  {pillar}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Finance', 'Business', 'Analytics', 'Sustainability']
                .filter((cat) => skillPillarFilter === 'All' || skillPillarFilter === cat)
                .map((pillar) => {
                  const pillarSkills = skills.filter((s) => s.category === pillar);
                  const pillarColors = {
                    Finance: 'text-[#047857] dark:text-emerald-400',
                    Business: 'text-[#B45309] dark:text-amber-400',
                    Analytics: 'text-sky-700 dark:text-sky-400',
                    Sustainability: 'text-teal-700 dark:text-teal-400'
                  };
                  return (
                    <div
                      key={pillar}
                      className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <h2 className="font-serif text-xl font-bold text-[#0B192C] dark:text-white">
                          {pillar}
                        </h2>
                        <span className={`text-xs font-bold uppercase tracking-wider ${pillarColors[pillar]}`}>
                          {pillarSkills.length} Core Competencies
                        </span>
                      </div>

                      <div className="space-y-4">
                        {pillarSkills.map((sk) => (
                          <div key={sk.id} className="space-y-1.5">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-sm font-bold text-[#0B192C] dark:text-white">
                                {sk.name}
                              </span>
                              <span className="text-xs font-bold tabular-nums text-[#047857] dark:text-emerald-400">
                                {sk.level}%
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#0B192C] via-[#047857] to-[#B45309]"
                                style={{ width: `${sk.level}%` }}
                              />
                            </div>
                            <div className="text-[11px] font-semibold text-slate-500">{sk.tools}</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {sk.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 7: INSIGHTS & ARTICLES                                        */}
        {/* ================================================================== */}
        {activePage === 'insights' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                  Executive Briefings & Perspectives
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white mt-1">
                  Insights on Finance, Analytics & ESG
                </h1>
              </div>
              <button
                type="button"
                onClick={() => goToPage('admin')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-700 text-[#0B192C] dark:text-slate-200 self-start md:self-auto"
              >
                + Publish New Insight
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  placeholder="Search articles on ESG valuation, Power BI FP&A, or operations..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Sustainability & Finance', 'Data Analytics', 'Business & Strategy'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setArticleCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                      articleCategory === cat
                        ? 'bg-[#0B192C] dark:bg-[#047857] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleInspectArticle(art)}
                  className="cursor-pointer group p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 hover:border-[#047857] shadow-sm transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-[#B45309] dark:text-amber-400">
                        {art.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {art.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white group-hover:text-[#047857] transition-colors leading-snug">
                      {art.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>{art.date}</span>
                    <span className="font-semibold text-[#047857] dark:text-emerald-400 inline-flex items-center gap-1">
                      Read Briefing <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 8: ANALYTICS DASHBOARD                                        */}
        {/* ================================================================== */}
        {activePage === 'analytics' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                Live Engagement & Recruiter Telemetry
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white mt-1">
                Portfolio Analytics & Recruiter Interest Dashboard
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: 'Website Visitors (7d)',
                  value: analytics.visitors.toLocaleString(),
                  badge: '+18.4% WoW',
                  icon: Users
                },
                {
                  label: 'Resume Downloads (Live)',
                  value: analytics.resumeDownloads.toLocaleString(),
                  badge: 'Updates on Click',
                  icon: Download
                },
                {
                  label: 'Case Study Views (Live)',
                  value: totalProjectViews.toLocaleString(),
                  badge: `${projects.length} Case Studies`,
                  icon: Eye
                },
                {
                  label: 'Recruiter Inquiries',
                  value: analytics.recruiterInquiries.toLocaleString(),
                  badge: 'High Intent',
                  icon: Briefcase
                }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{stat.label}</span>
                      <Icon className="w-4 h-4 text-[#047857]" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-bold tabular-nums text-[#0B192C] dark:text-white">
                        {stat.value}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#047857] dark:text-emerald-400">
                        {stat.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                      Weekly Visitor Trend
                    </h2>
                    <p className="text-xs text-slate-500">Organic recruiter & hiring manager sessions</p>
                  </div>
                  <span className="text-xs font-semibold text-[#047857]">Peak: 345 / day</span>
                </div>

                <svg viewBox="0 0 460 190" className="w-full h-48">
                  {[35, 75, 115, 155].map((y) => (
                    <line
                      key={y}
                      x1="24"
                      y1={y}
                      x2="440"
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeDasharray="4 4"
                    />
                  ))}
                  {analytics.dailyVisitors.map((d, i) => {
                    const barW = 34;
                    const x = 36 + i * 58;
                    const h = Math.round((d.count / 380) * 125);
                    const y = 155 - h;
                    return (
                      <g key={d.label}>
                        <rect x={x} y={y} width={barW} height={h} rx="6" fill="#047857" />
                        <text
                          x={x + barW / 2}
                          y={y - 6}
                          textAnchor="middle"
                          className="fill-slate-600 dark:fill-slate-300 text-[10px] font-bold"
                        >
                          {d.count}
                        </text>
                        <text
                          x={x + barW / 2}
                          y="175"
                          textAnchor="middle"
                          className="fill-slate-500 text-[11px]"
                        >
                          {d.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                    Case Study Views Breakdown
                  </h2>
                  <p className="text-xs text-slate-500">Live view counters across Hassan’s portfolio</p>
                </div>
                <div className="space-y-3">
                  {[...projects]
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 5)
                    .map((p) => {
                      const maxV = Math.max(...projects.map((item) => item.views || 1), 1);
                      const widthPct = Math.round(((p.views || 0) / maxV) * 100);
                      return (
                        <div key={p.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-[#0B192C] dark:text-slate-200 truncate pr-2">
                              [{p.category}] {p.title}
                            </span>
                            <span className="font-mono tabular-nums text-slate-500 shrink-0">
                              {p.views || 0} views
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#0B192C] dark:bg-[#047857]"
                              style={{ width: `${widthPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 9: CONTACT & INTERVIEW SCHEDULER                              */}
        {/* ================================================================== */}
        {activePage === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#047857] dark:text-emerald-400">
                  Direct Recruiter & Executive Contact
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white">
                  Connect for Graduate Roles & Consulting Opportunities
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Available for interviews in Oslo or remotely across Finance, Business Analysis, Accounting/Controlling, ESG, and Management Consulting.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#047857] shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="text-sm font-bold text-[#0B192C] dark:text-white">
                      {profile.location}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(profile.email);
                    notify('Email Address Copied', profile.email);
                  }}
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 hover:border-[#047857] flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#047857] shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">Direct Email</div>
                      <div className="text-sm font-bold text-[#0B192C] dark:text-white">
                        {profile.email}
                      </div>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 hover:border-[#047857] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-sky-700 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">LinkedIn Profile</div>
                      <div className="text-sm font-bold text-[#0B192C] dark:text-white">
                        /in/hassan-abdirahman-mohammud
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 hover:border-[#047857] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-slate-700 dark:text-slate-200 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">GitHub Analytics & Models</div>
                      <div className="text-sm font-bold text-[#0B192C] dark:text-white">
                        @hassan-mohammud
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="w-full p-4 rounded-xl bg-[#0B192C] text-white hover:bg-[#13294B] flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-300">Executive Curriculum Vitae</div>
                      <div className="text-sm font-bold">Download Hassan’s CV</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-[#0B192C] dark:text-white">
                  Send an Interview or Business Inquiry
                </h2>

                <input
                  type="text"
                  name="website_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={contactForm.honeypot}
                  onChange={(e) => setContactForm({ ...contactForm, honeypot: e.target.value })}
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ingrid Lindqvist"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Deloitte / PwC / Nordic Enterprise"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ingrid@company.no"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Role / Inquiry Type
                    </label>
                    <select
                      value={contactForm.roleType}
                      onChange={(e) => setContactForm({ ...contactForm, roleType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    >
                      <option>Graduate Analyst / Consulting Role</option>
                      <option>Finance / Accounting / FP&A Position</option>
                      <option>Business Intelligence & Data Analytics Role</option>
                      <option>ESG & Sustainability Advisory</option>
                      <option>General Networking / Coffee Chat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share role details, team focus, or proposed interview times..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-[#047857] hover:bg-emerald-700 text-white shadow-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Hassan</span>
                </button>

                {contactReceipt && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-[#047857] dark:text-emerald-300 flex items-center justify-between">
                    <span>✓ Confirmation: Your inquiry has been logged in Hassan’s Recruiter Inbox.</span>
                    <button
                      type="button"
                      onClick={() => goToPage('admin')}
                      className="underline font-bold ml-2"
                    >
                      View in Admin
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PAGE 10: ADMIN CMS & EASY PUBLISHING STUDIO                        */}
        {/* ================================================================== */}
        {activePage === 'admin' && (
          <div className="space-y-8">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C] text-white flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h1 className="font-serif text-2xl font-bold text-[#0B192C] dark:text-white">
                    Portfolio CMS & Easy Publishing Studio
                  </h1>
                  <p className="text-xs text-slate-500">
                    Publish new case studies, upload project visuals, edit skills, or update CV details—no code editing required.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAdminLoggedIn(true);
                    notify('Logged in as Hassan', 'Portfolio Management Studio unlocked.');
                  }}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-[#047857] hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  Login as Hassan (1-Click Demo Access)
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-serif text-xl font-bold text-[#0B192C] dark:text-white">
                        Portfolio Management System
                      </h1>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-[#047857] dark:text-emerald-400">
                        Live Sync Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      All updates save automatically and appear immediately across Home, Recruiter Dashboard, Projects, Skills, and CV.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'projects', label: `Projects & Case Studies (${projects.length})` },
                    { id: 'articles', label: `Publish Articles (${articles.length})` },
                    { id: 'skills', label: `Update Skills (${skills.length})` },
                    { id: 'resume', label: 'Update Resume & Profile' },
                    { id: 'inbox', label: `Recruiter Inquiries (${inquiries.length})` },
                    { id: 'blueprint', label: 'Easy Publishing & Deployment Blueprint' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAdminTab(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        adminTab === tab.id
                          ? 'bg-[#0B192C] dark:bg-[#047857] text-white'
                          : 'bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* TAB 1: NEW / EDIT PROJECT + IMAGE UPLOAD */}
                {adminTab === 'projects' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <form
                      onSubmit={handlePublishOrUpdateProject}
                      className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4"
                    >
                      <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                        {editingProjectId ? 'Edit Case Study' : 'New Project / Case Study'}
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Project Title *"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        >
                          <option>Finance</option>
                          <option>Data Analytics</option>
                          <option>Sustainability</option>
                          <option>Entrepreneurship</option>
                        </select>
                      </div>

                      <textarea
                        rows={2}
                        required
                        placeholder="Executive Description *"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />

                      <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B192C] space-y-2">
                        <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-[#047857] dark:text-emerald-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Upload className="w-4 h-4" />
                            <span>Upload Project Image / Dashboard Screenshot</span>
                          </span>
                          <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0B192C] dark:text-slate-200">
                            Choose File
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageFileUpload(e.target.files)}
                            className="hidden"
                          />
                        </label>
                        {projectForm.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {projectForm.images.map((imgUrl, idx) => (
                              <div
                                key={idx}
                                className="relative w-16 h-12 rounded overflow-hidden border border-slate-300"
                              >
                                <img src={imgUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setProjectForm((prev) => ({
                                      ...prev,
                                      images: prev.images.filter((_, i) => i !== idx)
                                    }))
                                  }
                                  className="absolute top-0 right-0 bg-rose-600 text-white p-0.5 text-[10px]"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="1. Problem Statement"
                          value={projectForm.problem}
                          onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="2. Analysis Conducted"
                          value={projectForm.analysis}
                          onChange={(e) => setProjectForm({ ...projectForm, analysis: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="3. Methodology"
                          value={projectForm.methodology}
                          onChange={(e) => setProjectForm({ ...projectForm, methodology: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="4. Key Results Achieved"
                          value={projectForm.results}
                          onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="5. Strategic Recommendations"
                          value={projectForm.recommendations}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, recommendations: e.target.value })
                          }
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="6. Key Learnings"
                          value={projectForm.keyLearnings}
                          onChange={(e) => setProjectForm({ ...projectForm, keyLearnings: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Tools / Technologies (comma-separated)"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="Skills Demonstrated (comma-separated)"
                          value={projectForm.skills}
                          onChange={(e) => setProjectForm({ ...projectForm, skills: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#047857] hover:bg-emerald-700 text-white"
                        >
                          {editingProjectId ? 'Save Changes' : 'Publish Project'}
                        </button>
                        {editingProjectId && (
                          <button
                            type="button"
                            onClick={() => setEditingProjectId(null)}
                            className="px-3 py-2.5 rounded-xl text-xs bg-slate-200 dark:bg-slate-800"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    <div className="lg:col-span-6 space-y-3">
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase text-[#B45309] dark:text-amber-400">
                              {p.category} • {p.datePublished}
                            </span>
                            <div className="font-serif text-sm font-bold text-[#0B192C] dark:text-white truncate">
                              {p.title}
                            </div>
                            <div className="text-xs text-slate-500 truncate">{p.description}</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => startEditProject(p)}
                              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#047857]"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: PUBLISH ARTICLES */}
                {adminTab === 'articles' && (
                  <form
                    onSubmit={handlePublishArticle}
                    className="max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4"
                  >
                    <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                      Publish New Consulting Insight / Article
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Article Headline *"
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />
                      <select
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      >
                        <option>Sustainability & Finance</option>
                        <option>Data Analytics</option>
                        <option>Business & Strategy</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Executive Summary / Excerpt"
                      value={articleForm.excerpt}
                      onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    />
                    <textarea
                      rows={4}
                      required
                      placeholder="Opening Analysis Paragraph *"
                      value={articleForm.paragraph1}
                      onChange={(e) => setArticleForm({ ...articleForm, paragraph1: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    />
                    <textarea
                      rows={3}
                      placeholder="Supporting Strategic Takeaways Paragraph"
                      value={articleForm.paragraph2}
                      onChange={(e) => setArticleForm({ ...articleForm, paragraph2: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#047857] text-white"
                    >
                      Publish Article
                    </button>
                  </form>
                )}

                {/* TAB 3: UPDATE SKILLS */}
                {adminTab === 'skills' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <form
                      onSubmit={handleAddSkill}
                      className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3 h-fit"
                    >
                      <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                        Add Skill to Matrix
                      </h2>
                      <input
                        type="text"
                        required
                        placeholder="Skill Name (e.g., IFRS Accounting)"
                        value={newSkillForm.name}
                        onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={newSkillForm.category}
                          onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        >
                          <option>Finance</option>
                          <option>Business</option>
                          <option>Analytics</option>
                          <option>Sustainability</option>
                        </select>
                        <input
                          type="number"
                          min="40"
                          max="100"
                          value={newSkillForm.level}
                          onChange={(e) => setNewSkillForm({ ...newSkillForm, level: e.target.value })}
                          className="px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Tools / Methods"
                        value={newSkillForm.tools}
                        onChange={(e) => setNewSkillForm({ ...newSkillForm, tools: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#047857] text-white"
                      >
                        Add Skill
                      </button>
                    </form>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skills.map((sk) => (
                        <div
                          key={sk.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="text-[10px] font-bold uppercase text-[#047857]">
                              {sk.category}
                            </div>
                            <div className="text-xs font-bold text-[#0B192C] dark:text-white">{sk.name}</div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="40"
                              max="100"
                              value={sk.level}
                              onChange={(e) => handleUpdateSkillRating(sk.id, e.target.value)}
                              className="w-16 px-2 py-1 rounded text-xs font-mono text-right bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                            />
                            <span className="text-xs text-slate-400">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: UPDATE RESUME & PROFILE */}
                {adminTab === 'resume' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-4">
                      <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                        Edit Executive Headline & Career Objective
                      </h2>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Availability Badge
                        </label>
                        <input
                          type="text"
                          value={profile.availability}
                          onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Hero Headline
                        </label>
                        <input
                          type="text"
                          value={profile.headline}
                          onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Career Objective (Synced to Home & CV)
                        </label>
                        <textarea
                          rows={3}
                          value={profile.careerObjective}
                          onChange={(e) => setProfile({ ...profile, careerObjective: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>

                    <form
                      onSubmit={handleAddExperience}
                      className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3"
                    >
                      <h2 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                        Add Experience / Internship to Resume
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Role Title (e.g., Finance Intern)"
                          value={newExpForm.role}
                          onChange={(e) => setNewExpForm({ ...newExpForm, role: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Organization"
                          value={newExpForm.organization}
                          onChange={(e) =>
                            setNewExpForm({ ...newExpForm, organization: e.target.value })
                          }
                          className="px-3.5 py-2 rounded-xl text-sm bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Period (e.g., Summer 2026)"
                        value={newExpForm.period}
                        onChange={(e) => setNewExpForm({ ...newExpForm, period: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        placeholder="Role Summary"
                        value={newExpForm.summary}
                        onChange={(e) => setNewExpForm({ ...newExpForm, summary: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        placeholder="Key Quantified Achievement Bullet"
                        value={newExpForm.bullet}
                        onChange={(e) => setNewExpForm({ ...newExpForm, bullet: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#0B192C] dark:bg-[#047857] text-white"
                      >
                        Add to Resume
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 5: RECRUITER INBOX */}
                {adminTab === 'inbox' && (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-1.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#0B192C] dark:text-white">
                              {inq.name}
                            </span>
                            <span className="text-xs text-slate-500">({inq.company})</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-[#047857] dark:text-emerald-400">
                              {inq.roleType}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-500">{inq.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {inq.message}
                        </p>
                        <div className="text-xs text-slate-500">Reply-To: {inq.email}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 6: EASY PUBLISHING & DEPLOYMENT BLUEPRINT */}
                {adminTab === 'blueprint' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border-2 border-[#047857] space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-[#047857] dark:text-emerald-400">
                          Option 1 (Recommended Production Stack)
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                          Vercel Frontend + Render Backend + Neon PostgreSQL
                        </h3>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <li>
                            • <strong>Frontend:</strong> Deploy Next.js / React on Vercel
                          </li>
                          <li>
                            • <strong>Backend API:</strong> Deploy Python FastAPI on Render
                          </li>
                          <li>
                            • <strong>Database:</strong> Serverless Neon PostgreSQL
                          </li>
                          <li>
                            • <strong>Live Recruiter URL:</strong>{' '}
                            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#047857] font-mono">
                              https://hassanmohammud.vercel.app
                            </code>
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200/90 dark:border-slate-800 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Option 2 (Unified Full-Stack Next.js)
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#0B192C] dark:text-white">
                          Next.js App Router + PostgreSQL
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Host both the frontend UI and serverless API routes inside Next.js on Vercel connected directly to Neon PostgreSQL—zero code edits required to publish new case studies.
                        </p>
                        <div className="text-xs font-semibold text-[#0B192C] dark:text-slate-200 pt-1">
                          5-Step LinkedIn-Style Admin Workflow:
                        </div>
                        <ol className="list-decimal pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Login to Admin CMS</li>
                          <li>Click &ldquo;New Project&rdquo;</li>
                          <li>Upload dashboard/chart images</li>
                          <li>Write Problem, Analysis, Methodology, Results & Recommendations</li>
                          <li>Click Publish — immediately live for recruiters</li>
                        </ol>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0B192C] text-slate-200 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Canonical Database Project Schema (JSON)
                      </div>
                      <pre className="text-xs font-mono overflow-x-auto leading-relaxed text-emerald-300">
                        {`{
  "title": "Nordic Retail Equity Valuation & DCF Financial Model",
  "category": "Finance",
  "description": "5-year DCF valuation, WACC derivation & sensitivity analysis",
  "technologies": ["Excel", "Financial Modeling", "DCF Valuation"],
  "images": ["https://cdn.hassanmohammud.vercel.app/dcf-chart.png"],
  "github": "https://github.com/hassan-mohammud/nordic-retail-dcf-valuation",
  "demo": "https://hassanmohammud.vercel.app/#projects",
  "skills": ["Financial Analysis", "Investment Evaluation", "Risk Assessment"],
  "datePublished": "2026-06"
}`}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* MCKINSEY / DELOITTE 6-PART CASE STUDY MODAL                          */}
      {/* ==================================================================== */}
      {activeCaseStudy && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
          >
            <div className="relative">
              <CaseStudyVisualPreview project={activeCaseStudy} />
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                aria-label="Close case study"
                className="absolute top-3 right-3 p-2 rounded-lg bg-[#0B192C]/90 text-white hover:bg-black border border-white/15"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[76vh] overflow-y-auto space-y-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold uppercase text-[#B45309] dark:text-amber-400">
                    {activeCaseStudy.category}
                  </span>
                  <span>•</span>
                  <span>Published {activeCaseStudy.datePublished}</span>
                  <span>•</span>
                  <span>{activeCaseStudy.views || 1} views</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] dark:text-white">
                  {activeCaseStudy.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeCaseStudy.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B45309] dark:text-amber-400">
                    1. Problem
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeCaseStudy.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C] dark:text-sky-400">
                    2. Analysis
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeCaseStudy.analysis}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    3. Methodology
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeCaseStudy.methodology}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                    4. Results
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {activeCaseStudy.results}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                    5. Recommendations
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeCaseStudy.recommendations}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B45309] dark:text-amber-400">
                    6. Key Learnings
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeCaseStudy.keyLearnings}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tools & Competencies Applied
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...activeCaseStudy.technologies, ...activeCaseStudy.skills].map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {activeCaseStudy.demo && (
                    <a
                      href={activeCaseStudy.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#047857] text-white inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Interactive Model / Demo</span>
                    </a>
                  )}
                  {activeCaseStudy.github && (
                    <a
                      href={activeCaseStudy.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-slate-200 inline-flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-[#0B192C] dark:hover:text-white"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ARTICLE READER MODAL                                                 */}
      {/* ==================================================================== */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
          >
            <div className="px-6 py-4 bg-[#F8FAFC] dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs font-semibold text-[#047857] dark:text-emerald-400">
                {activeArticle.category} • {activeArticle.readTime}
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <h2 className="font-serif text-2xl font-bold text-[#0B192C] dark:text-white leading-snug">
                {activeArticle.title}
              </h2>
              <div className="text-xs text-slate-500">
                By {profile.name} • Published {activeArticle.date}
              </div>
              <div className="space-y-4 pt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeArticle.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* QUICK NAVIGATION COMMAND PALETTE (CMD/CTRL + K)                      */}
      {/* ==================================================================== */}
      {quickJumpOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
          onClick={() => setQuickJumpOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#047857]" />
              <input
                type="text"
                autoFocus
                value={quickJumpQuery}
                onChange={(e) => setQuickJumpQuery(e.target.value)}
                placeholder="Jump to Recruiter Dashboard, Case Studies, CV, or Admin CMS..."
                className="w-full text-sm bg-transparent focus:outline-none text-[#0B192C] dark:text-white"
              />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                ESC
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {navItems
                .filter((item) =>
                  item.label.toLowerCase().includes(quickJumpQuery.trim().toLowerCase())
                )
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goToPage(item.id)}
                      className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left hover:bg-emerald-50 dark:hover:bg-slate-800 text-[#0B192C] dark:text-slate-200"
                    >
                      <span className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                        <Icon className="w-4 h-4 text-[#047857]" />
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* FLOATING AI RECRUITER ASSISTANT                                      */}
      {/* ==================================================================== */}
      <div className="fixed bottom-5 right-5 z-40 no-print">
        {assistantOpen ? (
          <div className="w-[340px] sm:w-[395px] rounded-2xl bg-white dark:bg-[#0F1D32] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-3.5 bg-[#0B192C] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold leading-none">AI Recruiter Assistant</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    Hassan Abdirahman Mohammud • OsloMet
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAssistantOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
              {assistantMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0B192C] text-white rounded-br-sm'
                        : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#1E293B] dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.navTarget && (
                    <button
                      type="button"
                      onClick={() => goToPage(msg.navTarget)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#047857] dark:text-emerald-400 hover:underline"
                    >
                      <span>Navigate to {msg.navTarget.toUpperCase()}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {assistantLoading && (
                <div className="text-[11px] text-slate-400 animate-pulse">
                  Preparing executive candidate summary...
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto">
              {[
                'What is Hassan studying?',
                'What finance projects has Hassan completed?',
                "What are Hassan's strongest skills?",
                'What leadership experience does Hassan have?',
                'Why should Hassan be hired?'
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleAskAssistant(q)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#047857] shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskAssistant();
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                placeholder="Ask a recruiter question..."
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700"
              />
              <button
                type="submit"
                disabled={assistantLoading}
                className="p-2 rounded-xl bg-[#047857] hover:bg-emerald-700 text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAssistantOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0B192C] hover:bg-[#13294B] dark:bg-[#047857] text-white shadow-xl transition-all"
          >
            <Bot className="w-5 h-5 text-emerald-400 dark:text-white" />
            <span className="text-xs font-semibold">AI Recruiter Assistant</span>
          </button>
        )}
      </div>

      {/* ==================================================================== */}
      {/* NON-BLOCKING TOAST NOTIFICATIONS                                     */}
      {/* ==================================================================== */}
      <div className="fixed bottom-5 left-5 z-50 space-y-2 max-w-xs no-print">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="p-3.5 rounded-xl bg-[#0B192C] text-white border border-slate-700 shadow-xl flex items-start gap-2.5"
          >
            <CheckCircle2
              className={`w-4 h-4 shrink-0 mt-0.5 ${
                t.tone === 'error' ? 'text-rose-400' : 'text-emerald-400'
              }`}
            />
            <div>
              <div className="text-xs font-bold">{t.title}</div>
              {t.detail && <div className="text-[11px] text-slate-300 mt-0.5">{t.detail}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* ==================================================================== */}
      {/* EXECUTIVE FOOTER                                                     */}
      {/* ==================================================================== */}
      <footer className="mt-20 border-t border-slate-200/90 dark:border-slate-800 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <strong className="text-[#0B192C] dark:text-white">{profile.name}</strong> • OsloMet Economics & Business Administration •{' '}
            <span className="font-mono">{profile.domainBadge}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => goToPage('recruiter')} className="hover:text-[#047857]">
              Recruiter Dashboard
            </button>
            <button type="button" onClick={() => goToPage('resume')} className="hover:text-[#047857]">
              CV / Resume
            </button>
            <button type="button" onClick={() => goToPage('projects')} className="hover:text-[#047857]">
              Case Studies
            </button>
            <button type="button" onClick={() => goToPage('admin')} className="hover:text-[#047857]">
              Admin CMS
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}