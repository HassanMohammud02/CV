export const INITIAL_PROFILE = {
  fullName: 'Hassan Abdirahman Mohammud',
  roleTitle: 'Economics & Business Administration Graduate | Business Analyst | Finance & Data Analytics Enthusiast',
  headline: 'Turning business data into strategic decisions.',
  subheadline:
    'Economics & Business Administration graduate from OsloMet with interests in finance, business analytics, sustainability, and digital transformation.',
  careerObjective:
    'Seeking a graduate analyst, junior consultant, or financial analyst role in Oslo or hybrid Nordic environments where quantitative rigor, structured problem-solving, and clear stakeholder communication drive measurable commercial and ESG performance.',
  university: 'Oslo Metropolitan University (OsloMet)',
  degree: 'Bachelor in Economics and Business Administration (Økonomi og Administrasjon)',
  graduationYear: '2025',
  location: 'Oslo, Norway',
  availability: 'Available for Full-Time Graduate & Analyst Roles',
  email: 'hassan.mohammud@outlook.com',
  phone: '+47 400 00 000',
  linkedin: 'https://www.linkedin.com/in/hassan-abdirahman-mohammud',
  github: 'https://github.com/hassanmohammud',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/assets/profile-portrait.svg',
  languages: [
    { name: 'Norwegian', level: 'Fluent / Professional Working Proficiency', percentage: 95 },
    { name: 'English', level: 'Fluent / Full Business Proficiency', percentage: 95 },
    { name: 'Somali', level: 'Native / Bilingual Proficiency', percentage: 100 },
  ],
  certifications: [
    {
      title: 'Financial Modeling & Corporate Valuation Foundations',
      issuer: 'Corporate Finance Institute (CFI) / Academic Track',
      year: '2025',
      focus: 'DCF, WACC, Sensitivity Tables, 3-Statement Modeling',
    },
    {
      title: 'Microsoft Power BI Data Analyst & DAX Modeling',
      issuer: 'Microsoft Learn / Applied BI Track',
      year: '2025',
      focus: 'Star Schema, DAX KPI Measures, Executive Dashboards',
    },
    {
      title: 'ESG Materiality & Sustainable Finance Principles',
      issuer: 'OsloMet Sustainability & Nordic Finance Seminar',
      year: '2024',
      focus: 'EU Taxonomy, CSRD Reporting, Scope 1–3 Emissions',
    },
    {
      title: 'SQL & Python for Business Intelligence',
      issuer: 'DataCamp / Quantitative Economics Track',
      year: '2024',
      focus: 'Relational Querying, pandas Data Cleaning, Cohort Analysis',
    },
  ],
  keyMetrics: [
    { label: 'Degree Specialization', value: 'BSc ØkAdm', detail: 'OsloMet University' },
    { label: 'Consulting Case Studies', value: '8+', detail: 'Finance, BI, ESG & Venture' },
    { label: 'Core Analytical Stack', value: '7 Tools', detail: 'Excel, Power BI, SQL & Python' },
    { label: 'Languages Spoken', value: '3 Fluent', detail: 'Norwegian, English & Somali' },
  ],
};

export const INITIAL_AREAS_OF_INTEREST = [
  {
    id: 'financial-analysis',
    title: 'Financial Analysis',
    tag: 'Corporate Finance',
    description:
      'Evaluating enterprise performance through 3-statement financial modeling, DCF valuation, ratio benchmarking, and scenario sensitivity testing.',
    tools: ['Excel', 'DCF Modeling', 'Financial Ratios'],
  },
  {
    id: 'budgeting',
    title: 'Budgeting & Forecasting',
    tag: 'FP&A',
    description:
      'Designing departmental operating budgets, rolling cash-flow forecasts, and variance commentary that align resource allocation with strategic targets.',
    tools: ['Zero-Based Budgeting', 'Variance Analysis', 'Excel'],
  },
  {
    id: 'accounting',
    title: 'Accounting & Reporting',
    tag: 'Financial Governance',
    description:
      'Applying Norwegian and international financial accounting standards (NGAAP / IFRS fundamentals) to ensure transparent ledger reconciliation and cost control.',
    tools: ['NGAAP / IFRS', 'Cost Accounting', 'Reconciliation'],
  },
  {
    id: 'esg',
    title: 'ESG & Sustainability',
    tag: 'Sustainable Finance',
    description:
      'Assessing double materiality, CSRD disclosure readiness, and EU Taxonomy alignment to connect sustainability metrics with long-term capital resilience.',
    tools: ['CSRD', 'EU Taxonomy', 'Carbon Accounting'],
  },
  {
    id: 'corporate-strategy',
    title: 'Corporate Strategy',
    tag: 'Management Consulting',
    description:
      'Structuring ambiguous commercial problems using issue trees, competitive positioning frameworks, and actionable implementation roadmaps.',
    tools: ['Issue Trees', 'Market Sizing', 'Value Chain Analysis'],
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    tag: 'Decision Support',
    description:
      'Translating raw operational and financial tables into self-service executive dashboards with clear KPI definitions and drill-down governance.',
    tools: ['Power BI', 'Tableau', 'DAX'],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & AI for Business',
    tag: 'Digital Transformation',
    description:
      'Using SQL, Python, and AI-assisted workflows to automate repetitive reporting, uncover margin drivers, and accelerate commercial decision cycles.',
    tools: ['SQL', 'Python (pandas)', 'AI Workflow Design'],
  },
];

export const INITIAL_EXPERIENCE = [
  {
    id: 'exp-ikea',
    role: 'Customer Relations & Commercial Operations Associate',
    organization: 'IKEA Norway',
    location: 'Oslo, Norway',
    period: '2022 – Present',
    type: 'Work Experience',
    summary:
      'Frontline commercial problem-solving, omnichannel customer resolution, and cross-functional service workflow optimization in a high-volume retail environment.',
    highlights: [
      'Resolved complex order-fulfillment, billing, and post-purchase claims across in-store and digital channels while maintaining top-tier customer satisfaction scores.',
      'Partnered with logistics, inventory, and sales teams to diagnose recurring service bottlenecks and streamline return/exchange processing during peak seasonal demand.',
      'Translated customer feedback patterns into practical operational recommendations that reduced repeat follow-up inquiries and improved first-contact resolution.',
    ],
  },
  {
    id: 'exp-student-org',
    role: 'Financial & Event Coordinator (Board Member)',
    organization: 'OsloMet Business & Economics Student Organization',
    location: 'Oslo, Norway',
    period: '2023 – 2025',
    type: 'Leadership & Governance',
    summary:
      'Owned semester budget planning, expense accounting, and corporate partnership logistics for student career seminars and case workshops.',
    highlights: [
      'Built and monitored semester budgets across academic workshops, guest speaker panels, and student networking events with zero budget overruns.',
      'Maintained transparent bookkeeping, invoice verification, and post-event financial reconciliations for board review.',
      'Led cross-functional student volunteer teams and coordinated external corporate sponsors to deliver high-attendance career events.',
    ],
  },
  {
    id: 'exp-oslomet',
    role: 'Bachelor in Economics and Business Administration (Økonomi og Administrasjon)',
    organization: 'Oslo Metropolitan University (OsloMet)',
    location: 'Oslo, Norway',
    period: '2022 – 2025',
    type: 'Education',
    summary:
      'Comprehensive training in financial accounting, managerial economics, corporate finance, quantitative statistics, corporate strategy, and digital business.',
    highlights: [
      'Completed applied analytical projects in equity valuation, departmental budgeting, Power BI executive reporting, and Nordic ESG materiality scoring.',
      'Developed structured consulting communication skills through team-based business cases, financial presentations, and empirical data analysis.',
    ],
  },
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-nordic-retail-dcf',
    title: 'Nordic Retail Equity Valuation & DCF Sensitivity Model',
    category: 'Finance',
    subtitle: '5-year intrinsic valuation, WACC sensitivity matrix, and working capital stress test',
    description:
      'Comprehensive corporate valuation model evaluating a mid-cap Nordic omnichannel retailer using Discounted Cash Flow (DCF), trading multiples, and downside margin scenarios.',
    technologies: ['Excel', 'Financial Modeling', 'Power Query', 'DCF Valuation'],
    skills: ['Financial Analysis', 'Investment Evaluation', 'Risk Assessment'],
    datePublished: '2025-02-14',
    duration: '6 Weeks',
    clientOrContext: 'Corporate Finance & Valuation Case Study',
    featured: true,
    views: 342,
    github: 'https://github.com/hassanmohammud/nordic-retail-dcf-model',
    demo: '#case-study-proj-nordic-retail-dcf',
    images: [],
    metrics: [
      { label: 'Implied Upside', value: '+14.8%' },
      { label: 'WACC Range Tested', value: '7.5%–9.5%' },
      { label: 'Forecast Horizon', value: '5 Years' },
    ],
    caseStudy: {
      problem:
        'A mid-cap Nordic consumer retailer experienced valuation multiple compression due to supply-chain cost inflation and slower store footfall, creating uncertainty around whether current market pricing reflected temporary margin pressure or structural decline.',
      analysis:
        'Decomposed historical 5-year revenue growth into store expansion, like-for-like traffic, and e-commerce penetration. Benchmarked gross margin (38.4%) and inventory days (84 days) against four Nordic peers, isolating working capital drag as a primary cash-conversion bottleneck.',
      methodology:
        'Constructed an integrated 3-statement financial model in Excel with automated Power Query historical data ingestion. Built a 5-year unlevered free cash flow (UFCF) forecast, derived CAPM-based WACC (8.4%), and ran a two-way sensitivity matrix across terminal growth rates and EBITDA margins.',
      results:
        'Determined an intrinsic equity value 14.8% above prevailing market trading levels under base-case margin recovery, while showing that reducing inventory days by 10 days unlocks NOK 42M in cumulative free cash flow.',
      recommendations:
        'Prioritize SKU rationalization in slow-moving home categories, tie store manager incentives to working capital turnover alongside revenue, and phase discretionary capex until e-commerce fulfillment margins stabilize above 11%.',
      keyLearnings:
        'Valuation accuracy depends far more on realistic working capital and reinvestment assumptions than on terminal growth tweaks; presenting a clear range via sensitivity tables builds immediate executive trust.',
    },
  },
  {
    id: 'proj-margin-bi-dashboard',
    title: 'Executive Margin & Working Capital BI Dashboard',
    category: 'Data Analytics',
    subtitle: 'Interactive Power BI & SQL decision system for gross margin bridges and SKU profitability',
    description:
      'End-to-end business intelligence solution unifying sales, cost of goods sold, and inventory ledger tables into an executive Power BI dashboard for weekly commercial reviews.',
    technologies: ['Power BI', 'SQL', 'Excel', 'DAX'],
    skills: ['Business Intelligence', 'Data Analytics', 'KPI Reporting'],
    datePublished: '2025-01-22',
    duration: '5 Weeks',
    clientOrContext: 'Business Intelligence & Analytics Portfolio',
    featured: true,
    views: 418,
    github: 'https://github.com/hassanmohammud/executive-margin-bi-dashboard',
    demo: '#case-study-proj-margin-bi-dashboard',
    images: [],
    metrics: [
      { label: 'Reporting Time Saved', value: '-72%' },
      { label: 'Margin Leakage Found', value: '2.3 pp' },
      { label: 'KPIs Automated', value: '18 Metrics' },
    ],
    caseStudy: {
      problem:
        'Commercial managers relied on manual weekly CSV exports and fragmented spreadsheets to monitor regional gross margins, resulting in a 4-day reporting lag and delayed responses to discounting erosion.',
      analysis:
        'Audited 120,000+ transaction rows across four product divisions using SQL joins. Discovered that unapproved promotional discounting and freight cost variances were eroding 2.3 percentage points of gross margin in two regional hubs.',
      methodology:
        'Designed a clean star-schema data model (FactSales, DimProduct, DimRegion, DimDate), wrote reusable DAX measures for Price-Volume-Mix (PVM) variance bridges, and built a 3-page executive Power BI interface with drill-through SKU diagnostics.',
      results:
        'Cut weekly performance reporting preparation time by 72% (from 6 hours to under 90 minutes) and surfaced NOK 1.8M in annualized margin recovery opportunities across underpriced product bundles.',
      recommendations:
        'Implement automated discount-threshold alerts in Power BI, standardize regional freight allocation rules in the SQL staging layer, and review bottom-decile SKUs monthly.',
      keyLearnings:
        'Effective BI dashboards succeed when every visual answers a specific management decision—concise variance bridges outperform crowded charts every time.',
    },
  },
  {
    id: 'proj-esg-eu-taxonomy',
    title: 'Oslo Mid-Cap ESG Materiality & EU Taxonomy Scorecard',
    category: 'Sustainability',
    subtitle: 'CSRD readiness benchmark and Scope 1–3 carbon intensity evaluation across 15 Nordic firms',
    description:
      'Structured sustainability and sustainable finance assessment comparing double-materiality disclosures, emissions trajectories, and board governance across 15 Oslo-listed companies.',
    technologies: ['Excel', 'Python', 'ESG Frameworks', 'Tableau'],
    skills: ['ESG Reporting', 'Sustainable Finance', 'Corporate Responsibility'],
    datePublished: '2024-11-18',
    duration: '6 Weeks',
    clientOrContext: 'Sustainable Finance & ESG Research',
    featured: true,
    views: 289,
    github: 'https://github.com/hassanmohammud/oslo-esg-materiality-scorecard',
    demo: '#case-study-proj-esg-eu-taxonomy',
    images: [],
    metrics: [
      { label: 'Firms Benchmarked', value: '15 Listed' },
      { label: 'CSRD Readiness Gap', value: '41%' },
      { label: 'Indicators Scored', value: '24 KPIs' },
    ],
    caseStudy: {
      problem:
        'Institutional investors and corporate lenders increasingly require auditable CSRD and EU Taxonomy metrics, yet mid-cap companies frequently publish inconsistent Scope 3 emissions and supply-chain due diligence disclosures.',
      analysis:
        'Extracted sustainability report data across 15 Oslo-listed industrial and consumer firms. Normalized carbon intensity (tCO2e per NOK million revenue), board independence ratios, and taxonomy-aligned capex disclosures using Python (pandas).',
      methodology:
        'Created a weighted 24-indicator ESG Materiality Scorecard aligned with ESRS (European Sustainability Reporting Standards) pillars—Environmental (45%), Social (30%), and Governance (25%)—and visualized peer quartiles in Tableau.',
      results:
        'Identified a 41% average disclosure gap in Scope 3 upstream supply-chain reporting among mid-caps and demonstrated that top-quartile ESG scorers enjoyed 65 bps lower average debt financing spreads.',
      recommendations:
        'Establish standardized supplier emissions questionnaires for Tier-1 vendors, link executive variable compensation to verified intensity targets, and integrate EU Taxonomy capex tagging into annual budgeting.',
      keyLearnings:
        'ESG analysis becomes financially actionable when linked directly to cost of capital, regulatory compliance timelines, and operational efficiency.',
    },
  },
  {
    id: 'proj-nordicbo-venture',
    title: 'NordicBo: Affordable Student & Young-Professional Co-Housing Venture',
    category: 'Entrepreneurship',
    subtitle: 'Market sizing, unit economics, and 3-year startup feasibility plan for Oslo housing',
    description:
      'End-to-end entrepreneurship business plan and financial feasibility model addressing Oslo student and early-career housing affordability through modular co-living partnerships.',
    technologies: ['Excel', 'Financial Modeling', 'Market Sizing', 'Microsoft 365'],
    skills: ['Strategy', 'Budgeting', 'Project Management'],
    datePublished: '2024-10-05',
    duration: '8 Weeks',
    clientOrContext: 'Entrepreneurship & Venture Strategy',
    featured: true,
    views: 315,
    github: 'https://github.com/hassanmohammud/nordicbo-cohousing-feasibility',
    demo: '#case-study-proj-nordicbo-venture',
    images: [],
    metrics: [
      { label: 'Tenant Rent Savings', value: '-18%' },
      { label: 'Target Occupancy', value: '96.5%' },
      { label: 'Breakeven Timeline', value: 'Month 19' },
    ],
    caseStudy: {
      problem:
        'Rising private rental prices in central Oslo and long student housing queues force students and recent graduates into high rent-to-income burdens or lengthy commutes.',
      analysis:
        'Conducted primary survey research (n = 140 Oslo students/graduates) alongside municipal rental price mapping. Found strong willingness to trade private living-room square footage for all-inclusive utilities, high-speed fiber, and shared study/coworking amenities.',
      methodology:
        'Modeled unit-level economics per residential building (45-room pilot), comparing long-term master-lease conversion of underutilized commercial floors against traditional residential leasing. Built a 36-month cash flow, CAC/LTV, and occupancy sensitivity model.',
      results:
        'Validated a hybrid co-living model delivering 18% lower all-in monthly housing costs for residents while achieving operational breakeven in Month 19 at 92% occupancy.',
      recommendations:
        'Launch a 45-unit pilot near major transit hubs (Nydalen/Majorstuen), secure university student-union partnerships to keep customer acquisition costs below NOK 950, and phase expansion via asset-light management contracts.',
      keyLearnings:
        'Viable social-impact ventures require disciplined unit economics first—affordable pricing is only sustainable when occupancy, maintenance, and acquisition costs are tightly engineered.',
    },
  },
  {
    id: 'proj-zbb-budgeting',
    title: 'Zero-Based Departmental Budgeting & Variance Forecasting Model',
    category: 'Finance',
    subtitle: 'Driver-based OPEX budget template and monthly actual-vs-budget variance engine',
    description:
      'Managerial accounting and FP&A budgeting framework replacing static historical incremental budgets with activity-based cost drivers and rolling quarterly forecasts.',
    technologies: ['Excel', 'Financial Modeling', 'Microsoft 365'],
    skills: ['Budgeting', 'Accounting', 'Financial Analysis'],
    datePublished: '2024-09-12',
    duration: '4 Weeks',
    clientOrContext: 'Managerial Accounting & FP&A Case',
    featured: false,
    views: 194,
    github: 'https://github.com/hassanmohammud/zbb-variance-forecasting',
    demo: '#case-study-proj-zbb-budgeting',
    images: [],
    metrics: [
      { label: 'OPEX Variance Cut', value: '-35%' },
      { label: 'Forecast Cycle', value: '3 Days' },
      { label: 'Cost Centers', value: '6 Units' },
    ],
    caseStudy: {
      problem:
        'Incremental year-over-year budgeting perpetuated legacy discretionary spend across six operating departments while failing to adjust quickly when seasonal demand shifted.',
      analysis:
        'Categorized 18 months of general ledger OPEX entries into fixed, semi-variable, and volume-driven components, revealing 14% of non-essential software and vendor renewals rolling over without ROI review.',
      methodology:
        'Built a driver-based Zero-Based Budgeting (ZBB) workbook in Excel linking headcount, order volume, and service hours to automated monthly variance waterfalls (Volume Variance vs. Rate Variance).',
      results:
        'Reduced budget-to-actual variance by 35% in simulated quarterly cycles and freed 8.5% of discretionary overhead for high-priority digital training initiatives.',
      recommendations:
        'Require quarterly business-case justification for non-contractual vendor spend above NOK 25,000 and institute monthly 30-minute variance reviews with department leads.',
      keyLearnings:
        'Separating volume-driven cost variances from price/efficiency variances prevents unfair penalization of growing teams and sharpens accountability.',
    },
  },
  {
    id: 'proj-service-flow-kpi',
    title: 'Omnichannel Service Flow & Customer Retention Analytics System',
    category: 'Data Analytics',
    subtitle: 'Python & SQL cohort retention and peak-hour staffing optimization model',
    description:
      'Operational data analytics study inspired by high-volume retail customer service, modeling queue arrival patterns, resolution drivers, and repeat customer satisfaction.',
    technologies: ['Python', 'SQL', 'Power BI', 'Excel'],
    skills: ['Data Analytics', 'Process Improvement', 'Communication'],
    datePublished: '2024-08-20',
    duration: '4 Weeks',
    clientOrContext: 'Operations & Service Analytics',
    featured: false,
    views: 227,
    github: 'https://github.com/hassanmohammud/service-flow-kpi-analytics',
    demo: '#case-study-proj-service-flow-kpi',
    images: [],
    metrics: [
      { label: 'Peak Wait Reduction', value: '-24%' },
      { label: 'FCR Improvement', value: '+9.4 pp' },
      { label: 'Records Analyzed', value: '45,000+' },
    ],
    caseStudy: {
      problem:
        'Customer service desks faced sharp weekend queue spikes and elevated repeat contacts on delivery-claim cases despite adequate total weekly staffing hours.',
      analysis:
        'Analyzed 45,000 anonymized service ticket timestamps and resolution codes using Python (pandas) and SQL. Identified a mismatch between static shift scheduling and Friday–Saturday afternoon arrival surges, plus missing self-service status updates.',
      methodology:
        'Performed hourly arrival-rate clustering, root-cause Pareto analysis of repeat contacts, and shift-reallocation simulation aligned with peak demand windows.',
      results:
        'Modeled a 24% reduction in peak customer wait times and a 9.4 percentage-point increase in First-Contact Resolution (FCR) without increasing total payroll hours.',
      recommendations:
        'Shift 15% of flexible support hours into peak Friday–Saturday windows and deploy proactive SMS delivery-exception notifications to eliminate status-check inquiries.',
      keyLearnings:
        'Combining frontline operational intuition with quantitative queue data uncovers low-cost scheduling wins that purely top-down metrics miss.',
    },
  },
  {
    id: 'proj-green-bond-audit',
    title: 'Nordic Green Bond Allocation & Impact Reporting Framework',
    category: 'Sustainability',
    subtitle: 'ICMA Green Bond Principles compliance and post-issuance impact KPI tracker',
    description:
      'Sustainable finance framework evaluating use-of-proceeds allocation, renewable energy capex eligibility, and avoided-emissions reporting for Nordic corporate green bonds.',
    technologies: ['Excel', 'ESG Frameworks', 'Power BI'],
    skills: ['Sustainable Finance', 'ESG Reporting', 'Risk Assessment'],
    datePublished: '2024-06-14',
    duration: '5 Weeks',
    clientOrContext: 'Sustainable Finance & Debt Capital Markets',
    featured: false,
    views: 176,
    github: 'https://github.com/hassanmohammud/nordic-green-bond-framework',
    demo: '#case-study-proj-green-bond-audit',
    images: [],
    metrics: [
      { label: 'Proceeds Tracked', value: 'NOK 500M' },
      { label: 'ICMA Alignment', value: '100%' },
      { label: 'Greenium Benchmark', value: '12 bps' },
    ],
    caseStudy: {
      problem:
        'Corporate issuers face heightened investor scrutiny over greenwashing risks when green bond proceeds are commingled with general corporate liquidity without granular project-level impact tracking.',
      analysis:
        'Reviewed four Nordic corporate green bond frameworks against ICMA Green Bond Principles (Use of Proceeds, Project Evaluation, Management of Proceeds, Reporting).',
      methodology:
        'Built a ring-fenced Green Register tracker in Excel and Power BI linking allocated bond proceeds to eligible green building and clean-transport capex, calculating tCO2e avoided per NOK million invested.',
      results:
        'Delivered a transparent allocation and impact reporting template meeting 100% of ICMA core components and external second-party opinion (SPO) audit criteria.',
      recommendations:
        'Maintain a 1.15x eligible green asset buffer to protect against project delays and publish semi-annual allocation dashboards alongside annual impact assurance.',
      keyLearnings:
        'Credible sustainable finance requires treasury-grade accounting discipline—every environmental claim must reconcile back to verified capex ledgers.',
    },
  },
  {
    id: 'proj-sme-invoice-advisory',
    title: 'SME Digital Invoice Automation & Cash-Flow Advisory Feasibility',
    category: 'Entrepreneurship',
    subtitle: 'B2B digital transformation business case for Norwegian service SMEs',
    description:
      'Go-to-market and ROI feasibility study helping small Norwegian service businesses transition from manual PDF invoicing to automated EHF e-invoicing and cash-flow dashboards.',
    technologies: ['Power BI', 'Excel', 'Python', 'Microsoft 365'],
    skills: ['Strategy', 'Project Management', 'Financial Analysis'],
    datePublished: '2024-05-09',
    duration: '5 Weeks',
    clientOrContext: 'Digital Transformation & SME Consulting',
    featured: false,
    views: 208,
    github: 'https://github.com/hassanmohammud/sme-ehf-automation-feasibility',
    demo: '#case-study-proj-sme-invoice-advisory',
    images: [],
    metrics: [
      { label: 'DSO Reduction', value: '-11 Days' },
      { label: 'Client Payback', value: '3.5 Mos' },
      { label: 'Admin Hours Saved', value: '14 hrs/mo' },
    ],
    caseStudy: {
      problem:
        'Small Norwegian consulting and trade firms frequently experience 42+ Days Sales Outstanding (DSO) and 14+ monthly administrative hours spent chasing overdue PDF invoices.',
      analysis:
        'Interviewed 18 Oslo SME founders and modeled accounts-receivable aging distributions, quantifying the hidden working-capital cost of delayed collections.',
      methodology:
        'Designed a packaged digital transformation offering combining Norwegian EHF e-invoicing integration, automated payment reminders, and a standardized Power BI cash-runway template.',
      results:
        'Demonstrated an average DSO improvement of 11 days and a 3.5-month client payback period on implementation fees.',
      recommendations:
        'Bundle implementation with a 90-day cash-flow health check and partner with regional accounting offices as referral channels.',
      keyLearnings:
        'SME decision-makers buy tangible cash-flow and time-saving outcomes—framing digital transformation in days-of-cash unlocked drives immediate adoption.',
    },
  },
];

export const INITIAL_SKILLS = [
  {
    category: 'Finance',
    description: 'Corporate finance, valuation, budgeting, and accounting governance',
    items: [
      { name: 'Financial Analysis', level: 92, tool: 'Excel / 3-Statement Models' },
      { name: 'Budgeting & Forecasting', level: 90, tool: 'ZBB & Rolling Forecasts' },
      { name: 'Investment Evaluation', level: 88, tool: 'DCF, NPV, IRR & WACC' },
      { name: 'Risk Assessment', level: 85, tool: 'Sensitivity & Scenario Analysis' },
    ],
  },
  {
    category: 'Business',
    description: 'Consulting problem-solving, stakeholder alignment, and operational leadership',
    items: [
      { name: 'Corporate Strategy', level: 89, tool: 'Issue Trees & Market Sizing' },
      { name: 'Leadership & Teamwork', level: 93, tool: 'Student Board & IKEA Ops' },
      { name: 'Stakeholder Communication', level: 94, tool: 'Executive Decks & CRM' },
      { name: 'Project Management', level: 88, tool: 'Agile / Milestone Governance' },
    ],
  },
  {
    category: 'Analytics',
    description: 'Business intelligence, relational querying, and quantitative data modeling',
    items: [
      { name: 'Microsoft Excel', level: 95, tool: 'Power Query, Pivot, Modeling' },
      { name: 'Power BI', level: 90, tool: 'DAX, Star Schema, KPI Dashboards' },
      { name: 'SQL', level: 84, tool: 'Joins, CTEs, Aggregations' },
      { name: 'Python for Analytics', level: 82, tool: 'pandas, NumPy, Automation' },
    ],
  },
  {
    category: 'Sustainability',
    description: 'ESG materiality, CSRD compliance, and sustainable capital allocation',
    items: [
      { name: 'ESG Reporting', level: 89, tool: 'CSRD & ESRS Frameworks' },
      { name: 'Sustainable Finance', level: 86, tool: 'EU Taxonomy & Green Bonds' },
      { name: 'Corporate Responsibility', level: 90, tool: 'Double Materiality & Governance' },
    ],
  },
];

export const TECHNICAL_BUSINESS_STACK = [
  { name: 'Microsoft Excel', category: 'Financial Modeling & Power Query' },
  { name: 'Power BI', category: 'Executive Dashboards & DAX' },
  { name: 'Tableau', category: 'Visual Analytics & Benchmarking' },
  { name: 'SQL', category: 'Relational Data Extraction' },
  { name: 'Python for Analytics', category: 'pandas & Quantitative Analysis' },
  { name: 'Microsoft 365', category: 'Executive Presentations & Docs' },
  { name: 'Financial Modeling', category: 'DCF, 3-Statement & Variance' },
];

export const INITIAL_POSTS = [
  {
    id: 'post-dcf-working-capital',
    title: 'Why Working Capital Discipline Matters More Than Terminal Growth in Retail Valuations',
    category: 'Finance',
    date: '2025-02-18',
    author: 'Hassan Abdirahman Mohammud',
    tags: ['Corporate Finance', 'DCF', 'Working Capital', 'Excel'],
    excerpt:
      'A practical breakdown of how inventory days and supplier payment terms drive free cash flow conversion in Nordic retail models.',
    content: `In academic corporate finance exercises, small adjustments to terminal growth rates often dominate valuation discussions. Yet in real-world retail and distribution businesses, cash conversion efficiency—specifically inventory days and accounts payable discipline—frequently determines whether accounting profit turns into distributable free cash flow.

When building a 5-year Discounted Cash Flow (DCF) model for a Nordic omnichannel retailer, isolating working capital components revealed that a 10-day reduction in inventory holding periods unlocked significant cash liquidity without requiring additional revenue growth.

For junior analysts, three habits elevate financial models immediately:
1. Model inventory, receivables, and payables separately using operational day drivers rather than a single percentage-of-revenue shortcut.
2. Always pair base-case valuation outputs with a two-way WACC and EBITDA margin sensitivity table.
3. Translate spreadsheet outputs into concrete operational levers—such as SKU rationalization or vendor term renegotiation—that management teams can actually execute.`,
    comments: [
      {
        id: 'c1',
        author: 'Marte Lindqvist (Finance Recruiter)',
        date: '2025-02-20',
        text: 'Clear, practical framing—especially the point about connecting working capital drivers to operational levers.',
      },
    ],
  },
  {
    id: 'post-powerbi-kpi-governance',
    title: 'Designing Executive Power BI Dashboards That Drive Weekly Action',
    category: 'Data Analytics',
    date: '2025-01-29',
    author: 'Hassan Abdirahman Mohammud',
    tags: ['Power BI', 'Business Intelligence', 'KPI Design', 'DAX'],
    excerpt:
      'How to move from cluttered operational charts to decision-first executive scorecards using Price-Volume-Mix variance bridges.',
    content: `Many business intelligence dashboards fail not because of weak SQL or DAX formulas, but because they display twenty competing metrics without clarifying which decision each chart supports.

When designing a gross margin and working capital dashboard, structuring the executive landing page around three layers creates immediate clarity:
- Layer 1 (Headline KPIs): Actual vs. Budget variance with clear directional thresholds.
- Layer 2 (Diagnostic Bridge): A Price-Volume-Mix (PVM) waterfall isolating why margin moved.
- Layer 3 (Action Drill-Through): SKU- and region-level exception tables highlighting the top ten drivers requiring manager follow-up.

When business analysts combine clean star-schema modeling with executive storytelling, weekly commercial reviews shift from debating data accuracy to agreeing on corrective actions.`,
    comments: [],
  },
  {
    id: 'post-csrd-nordic-midcaps',
    title: 'CSRD and EU Taxonomy Readiness: What Nordic Mid-Caps Must Quantify Next',
    category: 'Sustainability',
    date: '2024-12-10',
    author: 'Hassan Abdirahman Mohammud',
    tags: ['ESG', 'CSRD', 'EU Taxonomy', 'Sustainable Finance'],
    excerpt:
      'Lessons from benchmarking 15 Oslo-listed companies on double materiality, Scope 3 supply-chain data, and green financing.',
    content: `Sustainability reporting in the Nordic market has moved rapidly from voluntary narrative summaries to auditable financial-grade disclosures under the Corporate Sustainability Reporting Directive (CSRD).

Benchmarking 15 Oslo-listed mid-cap firms highlighted a clear divide: while Scope 1 and Scope 2 operational emissions are widely reported, upstream Scope 3 supply-chain tracking and EU Taxonomy capex alignment remain key gaps.

Bridging this gap requires collaboration between finance, procurement, and sustainability teams—treating carbon intensity and taxonomy eligibility with the same internal control rigor as quarterly financial reporting.`,
    comments: [],
  },
  {
    id: 'post-frontline-to-consulting',
    title: 'From Frontline Operations at IKEA to Structured Business Analysis',
    category: 'Strategy',
    date: '2024-11-04',
    author: 'Hassan Abdirahman Mohammud',
    tags: ['Leadership', 'Operations', 'Customer Experience', 'OsloMet'],
    excerpt:
      'How hands-on customer relations and student organization budgeting shaped my approach to consulting problem-solving.',
    content: `Working in high-volume customer operations at IKEA Norway alongside completing a Bachelor in Economics and Business Administration at OsloMet taught me a lesson no textbook alone can provide: operational bottlenecks always show up first in customer friction.

Whether resolving complex order-fulfillment claims or managing semester budgets for a student organization, effective problem-solving follows the same discipline:
1. Listen carefully to separate symptoms from root causes.
2. Quantify the frequency and financial impact of the issue.
3. Align cross-functional stakeholders around a clear, practical improvement.`,
    comments: [],
  },
];

export const INITIAL_ANALYTICS = {
  totalVisitors: 1480,
  resumeDownloads: 164,
  recruiterInquiries: 23,
  avgSessionDuration: '3m 48s',
  monthlyVisitors: [
    { month: 'Sep', visitors: 165, projectViews: 290 },
    { month: 'Oct', visitors: 210, projectViews: 385 },
    { month: 'Nov', visitors: 248, projectViews: 460 },
    { month: 'Dec', visitors: 235, projectViews: 430 },
    { month: 'Jan', visitors: 294, projectViews: 550 },
    { month: 'Feb', visitors: 328, projectViews: 640 },
  ],
  engagementBreakdown: [
    { label: 'Case Study Deep Dives', percentage: 42 },
    { label: 'Recruiter Dashboard & CV', percentage: 31 },
    { label: 'Skills Matrix & OsloMet Bio', percentage: 17 },
    { label: 'Insights & AI Assistant', percentage: 10 },
  ],
};
