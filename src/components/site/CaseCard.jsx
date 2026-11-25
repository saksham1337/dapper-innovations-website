import { Stat } from "./Blocks";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CaseVisual = ({ c }) => (
  <div className={`case-visual case-visual-${c.id}`}>
    <div className="case-visual-heading"><span>THE WORK / {c.id.toUpperCase()}</span><ArrowUpRight size={23} /></div>
    <div className="case-visual-motif" aria-hidden="true"><i /><i /><i /></div>
    <div className="case-feature" data-testid={`case-feature-${c.id}`}>
      <span>{c.stats.length ? c.stats[0].value : 'The long game.'}</span>
      <p>{c.stats.length ? c.stats[0].label : 'Strategy for a considered purchase'}</p>
    </div>
    <span className="case-visual-caption">{c.type === "results" ? "REAL RESULTS. IDENTITY PROTECTED." : "STRATEGY & PLANNING. NO REPORTED RESULTS."}</span>
  </div>
);

export const CaseCard = ({ c, compact = false }) => (
  <article id={c.id} className={`case-card scroll-mt-28 ${c.lead ? "case-lead lg:col-span-2" : ""}`} data-testid={`case-study-${c.id}`}>
    <CaseVisual c={c} />
    <div className="case-content p-7 lg:p-9">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-num text-[0.7rem] uppercase tracking-[0.18em] text-[#5b5b5b]">{c.industry}</span>
        <span className="text-xs text-[#5b5b5b]">{c.markets}</span>
        {c.type === "strategy" && (
          <span className="ml-auto rounded-full border border-[#d4d4d4] bg-[#f1f1f1] px-3 py-1 font-num text-[0.65rem] uppercase tracking-[0.15em] text-[#0a0a0a]" data-testid={`case-label-strategy-${c.id}`}>
            Strategy work, no reported results
          </span>
        )}
        {c.lead && <span className="ml-auto rounded-full bg-[#c91c1c] px-3 py-1 font-num text-[0.65rem] uppercase tracking-[0.15em] text-white">All three pillars</span>}
      </div>
      <h3 className="mt-5 text-2xl lg:text-3xl font-semibold text-[#111111] max-w-2xl">{c.title}</h3>
      <p className="mt-4 text-[#5b5b5b] leading-relaxed max-w-2xl">{c.summary}</p>
      {c.stats.length > 0 && (
        <div className={`case-stats mt-9 grid gap-8 grid-cols-2 ${c.lead ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {(compact ? c.stats.slice(0, 4) : c.stats).map((s, i) => <Stat key={s.label} {...s} testid={`case-${c.id}-stat-${i}`} />)}
        </div>
      )}
      {compact && <Link to={`/work#${c.id}`} className="case-read-link" data-testid={`case-read-${c.id}`}>Inside the work <ArrowRight size={17} /></Link>}
      {!compact && (
        <div className="case-details mt-9 border-t border-border pt-8">
          <ul className="lg:col-span-8 space-y-3">
            {c.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-[#111111] leading-relaxed"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#c91c1c]" />{d}</li>
            ))}
          </ul>
          <div className="lg:col-span-4">
            <p className="eyebrow !text-[#8f8f8f] mb-3">Services involved</p>
            <div className="flex flex-wrap gap-2">
              {c.services.map((s) => <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-[#5b5b5b]">{s}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  </article>
);
