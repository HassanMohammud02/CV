export function generateRecruiterReply(query, { profile, projects, skills }) {
  const q = query.toLowerCase().trim();

  const financeProjects = projects.filter((p) => p.category === 'Finance');
  const analyticsProjects = projects.filter((p) => p.category === 'Data Analytics');
  const esgProjects = projects.filter((p) => p.category === 'Sustainability');
  const ventureProjects = projects.filter((p) => p.category === 'Entrepreneurship');

  if (q.includes('study') || q.includes('education') || q.includes('oslomet') || q.includes('degree')) {
    return {
      text: `${profile.fullName} completed a ${profile.degree} at ${profile.university} (${profile.location}). His academic concentration covers Financial & Managerial Accounting, Corporate Finance, Investment Analysis, Quantitative Statistics, Corporate Strategy, and Sustainability Reporting.`,
      actionLabel: 'View Education & OsloMet Background',
      targetPage: 'about',
    };
  }

  if (q.includes('finance') || q.includes('valuation') || q.includes('dcf') || q.includes('budget')) {
    const titles = financeProjects.map((p) => p.title).join('; ');
    return {
      text: `Hassan has completed ${financeProjects.length} dedicated Finance case studies—including ${titles}. These demonstrate 3-statement modeling, WACC sensitivity analysis, working capital optimization, and zero-based departmental budgeting.`,
      actionLabel: 'Explore Finance Case Studies',
      targetPage: 'projects',
    };
  }

  if (q.includes('skill') || q.includes('tool') || q.includes('excel') || q.includes('power bi') || q.includes('sql') || q.includes('python')) {
    const topSkills = skills
      .flatMap((cat) => cat.items)
      .sort((a, b) => b.level - a.level)
      .slice(0, 5)
      .map((s) => `${s.name} (${s.level}%)`)
      .join(', ');
    return {
      text: `Hassan's strongest capabilities span four pillars—Finance, Business, Analytics, and Sustainability. His top-rated competencies include ${topSkills}, supported by hands-on proficiency in Excel, Power BI, Tableau, SQL, Python for Analytics, and Financial Modeling.`,
      actionLabel: 'Inspect 4-Pillar Skills Matrix',
      targetPage: 'skills',
    };
  }

  if (q.includes('leadership') || q.includes('experience') || q.includes('ikea') || q.includes('student') || q.includes('work')) {
    return {
      text: `Hassan combines commercial frontline experience at IKEA Norway—where he handled complex customer relations, billing/fulfillment problem-solving, and cross-functional service improvements—with financial governance as Financial & Event Coordinator for his OsloMet Business & Economics Student Organization, managing semester budgets and sponsor coordination.`,
      actionLabel: 'Open Recruiter Brief',
      targetPage: 'recruiter',
    };
  }

  if (q.includes('esg') || q.includes('sustainab') || q.includes('csrd') || q.includes('green')) {
    const titles = esgProjects.map((p) => p.title).join('; ');
    return {
      text: `In Sustainability & ESG, Hassan has authored ${esgProjects.length} applied studies (${titles}), covering CSRD double-materiality benchmarking, Scope 1–3 carbon intensity analysis, EU Taxonomy capex alignment, and ICMA Green Bond allocation tracking.`,
      actionLabel: 'View Sustainability Projects',
      targetPage: 'projects',
    };
  }

  if (q.includes('analytics') || q.includes('data') || q.includes('bi') || q.includes('dashboard')) {
    const titles = analyticsProjects.map((p) => p.title).join('; ');
    return {
      text: `Hassan's Data Analytics portfolio (${titles}) focuses on converting raw operational and financial datasets into executive Power BI dashboards, SQL variance queries, and Python cohort/queue optimization models.`,
      actionLabel: 'View Data Analytics Case Studies',
      targetPage: 'projects',
    };
  }

  if (q.includes('why') || q.includes('hire') || q.includes('fit') || q.includes('strength')) {
    return {
      text: `Hassan brings a rare graduate combination: rigorous Economics & Business Administration training from OsloMet, practical Excel/Power BI/SQL/Python execution, real-world customer & operational composure from IKEA Norway, and proven budget accountability from student leadership. He bridges financial analysis with clear executive communication from day one.`,
      actionLabel: 'Open Recruiter Dashboard',
      targetPage: 'recruiter',
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('cv') || q.includes('resume') || q.includes('interview')) {
    return {
      text: `You can reach Hassan directly at ${profile.email}, connect via LinkedIn, or download his ATS-friendly PDF resume immediately. He is currently based in ${profile.location} and open to graduate analyst, consulting, and finance roles.`,
      actionLabel: 'Go to Contact & CV Download',
      targetPage: 'contact',
    };
  }

  return {
    text: `Hassan Abdirahman Mohammud is an OsloMet Economics & Business Administration graduate specializing in Finance (${financeProjects.length} projects), Data Analytics (${analyticsProjects.length} projects), Sustainability (${esgProjects.length} projects), and Entrepreneurship (${ventureProjects.length} projects). Ask about his degree, financial modeling, IKEA & leadership experience, or why he is a strong graduate hire.`,
    actionLabel: 'View Recruiter Dashboard',
    targetPage: 'recruiter',
  };
}
