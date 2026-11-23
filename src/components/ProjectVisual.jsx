import React from 'react';

export default function ProjectVisual({ project, heightClass = 'h-44' }) {
  if (project.images && project.images.length > 0 && project.images[0]) {
    return (
      <div className={`relative w-full overflow-hidden bg-navy-900 ${heightClass}`}>
        <img
          src={project.images[0]}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const cat = project.category || 'Finance';

  if (cat === 'Data Analytics') {
    return (
      <div className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-850 to-emerald-950 p-4 ${heightClass}`}>
        <svg viewBox="0 0 320 130" className="h-full w-full max-w-[300px]" fill="none">
          <text x="12" y="18" fill="#94A3B8" fontSize="9" fontWeight="700" letterSpacing="1">
            EXECUTIVE BI MARGIN &amp; KPI TELEMETRY
          </text>
          <rect x="12" y="28" width="88" height="36" rx="6" fill="#0F172A" stroke="#1E293B" />
          <text x="20" y="43" fill="#94A3B8" fontSize="8">GROSS MARGIN</text>
          <text x="20" y="57" fill="#34D399" fontSize="12" fontWeight="700">38.4% (+2.3)</text>

          <rect x="110" y="28" width="95" height="36" rx="6" fill="#0F172A" stroke="#1E293B" />
          <text x="118" y="43" fill="#94A3B8" fontSize="8">REPORT LAG</text>
          <text x="118" y="57" fill="#FBBF24" fontSize="12" fontWeight="700">-72% Time</text>

          <rect x="215" y="28" width="93" height="36" rx="6" fill="#0F172A" stroke="#1E293B" />
          <text x="223" y="43" fill="#94A3B8" fontSize="8">SQL ROWS</text>
          <text x="223" y="57" fill="#F8FAFC" fontSize="12" fontWeight="700">120K+ Live</text>

          {[36, 52, 48, 66, 74, 88, 96].map((h, idx) => (
            <rect
              key={idx}
              x={22 + idx * 40}
              y={122 - h * 0.45}
              width="24"
              height={h * 0.45}
              rx="3"
              fill={idx >= 5 ? '#10B981' : '#334155'}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (cat === 'Sustainability') {
    return (
      <div className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-navy-900 to-slate-900 p-4 ${heightClass}`}>
        <svg viewBox="0 0 320 130" className="h-full w-full max-w-[300px]" fill="none">
          <text x="12" y="18" fill="#A7F3D0" fontSize="9" fontWeight="700" letterSpacing="1">
            CSRD &amp; EU TAXONOMY ESG SCORECARD
          </text>
          <g transform="translate(12, 32)">
            <text x="0" y="12" fill="#E2E8F0" fontSize="9" fontWeight="600">Environmental (45%)</text>
            <rect x="115" y="3" width="175" height="10" rx="5" fill="#1E293B" />
            <rect x="115" y="3" width="142" height="10" rx="5" fill="#10B981" />

            <text x="0" y="38" fill="#E2E8F0" fontSize="9" fontWeight="600">Social Capital (30%)</text>
            <rect x="115" y="29" width="175" height="10" rx="5" fill="#1E293B" />
            <rect x="115" y="29" width="128" height="10" rx="5" fill="#34D399" />

            <text x="0" y="64" fill="#E2E8F0" fontSize="9" fontWeight="600">Governance (25%)</text>
            <rect x="115" y="55" width="175" height="10" rx="5" fill="#1E293B" />
            <rect x="115" y="55" width="154" height="10" rx="5" fill="#FBBF24" />
          </g>
          <text x="12" y="118" fill="#94A3B8" fontSize="8.5">
            Scope 1–3 Intensity • Double Materiality • Green Spread -65 bps
          </text>
        </svg>
      </div>
    );
  }

  if (cat === 'Entrepreneurship') {
    return (
      <div className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-slate-900 to-amber-950/80 p-4 ${heightClass}`}>
        <svg viewBox="0 0 320 130" className="h-full w-full max-w-[300px]" fill="none">
          <text x="12" y="18" fill="#FCD34D" fontSize="9" fontWeight="700" letterSpacing="1">
            VENTURE UNIT ECONOMICS &amp; BREAKEVEN
          </text>
          <path d="M20 105 L80 96 L140 82 L200 58 L260 36 L300 24" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M20 92 L300 68" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="176" cy="68" r="5" fill="#10B981" />
          <text x="150" y="54" fill="#A7F3D0" fontSize="8.5" fontWeight="700">Breakeven M19</text>
          <text x="20" y="120" fill="#94A3B8" fontSize="8.5">
            36-Month Cash Runway • Occupancy &amp; CAC/LTV Sensitivity
          </text>
        </svg>
      </div>
    );
  }

  // Default: Finance (DCF Valuation Waterfall)
  return (
    <div className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 p-4 ${heightClass}`}>
      <svg viewBox="0 0 320 130" className="h-full w-full max-w-[300px]" fill="none">
        <text x="12" y="18" fill="#93C5FD" fontSize="9" fontWeight="700" letterSpacing="1">
          DCF VALUATION BRIDGE &amp; WACC SENSITIVITY
        </text>
        <rect x="24" y="64" width="38" height="44" rx="3" fill="#3B82F6" />
        <rect x="76" y="48" width="38" height="16" rx="3" fill="#10B981" />
        <rect x="128" y="34" width="38" height="14" rx="3" fill="#10B981" />
        <rect x="180" y="42" width="38" height="10" rx="3" fill="#F59E0B" />
        <rect x="244" y="28" width="46" height="80" rx="3" fill="#047857" stroke="#34D399" strokeWidth="1" />
        <text x="24" y="120" fill="#94A3B8" fontSize="8">PV FCF</text>
        <text x="74" y="120" fill="#94A3B8" fontSize="8">+Margin</text>
        <text x="128" y="120" fill="#94A3B8" fontSize="8">+WC</text>
        <text x="180" y="120" fill="#94A3B8" fontSize="8">-Capex</text>
        <text x="244" y="120" fill="#A7F3D0" fontSize="8" fontWeight="700">Enterprise Val</text>
      </svg>
    </div>
  );
}
