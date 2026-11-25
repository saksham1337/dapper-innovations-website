import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, className = "", delay = 0 }) => {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
};

export const Asterisk = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x="43" y="3" width="14" height="94" rx="1" transform={`rotate(${i * 22.5} 50 50)`} />)}
  </svg>
);

export const PageHero = ({ eyebrow, title, lead, children, testid = "page-hero" }) => (
  <section className="page-hero" data-testid={testid}>
    <div className="container-x relative z-10 py-16 lg:py-24">
      <p className="eyebrow reveal" data-testid={`${testid}-eyebrow`}>{eyebrow}</p>
      <h1 className="reveal mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ animationDelay: "80ms" }} data-testid={`${testid}-title`}>{title}</h1>
      {lead && <p className="reveal mt-7 max-w-2xl text-base text-neutral-300 leading-relaxed" style={{ animationDelay: "160ms" }} data-testid={`${testid}-lead`}>{lead}</p>}
      {children && <div className="reveal mt-9" style={{ animationDelay: "240ms" }}>{children}</div>}
    </div>
    <Asterisk className="page-hero-mark" />
    <span className="page-hero-caption" aria-hidden="true">S / YOUR BEHIND-THE-SCENES ADVANTAGE</span>
  </section>
);

export const SectionHead = ({ eyebrow, title, lead, action }) => (
  <div className="section-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4 font-extrabold text-[#111111]">{title}</h2>
      {lead && <p className="mt-5 max-w-xl text-base text-[#5b5b5b] leading-relaxed">{lead}</p>}
    </div>
    {action}
  </div>
);

export const PrimaryBtn = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid}
    className="primary-button group">
    {children}
    <span className="button-arrow"><ArrowUpRight size={17} /></span>
  </Link>
);

export const GhostBtn = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid}
    className="ghost-button">
    {children}
  </Link>
);

export const TextLink = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid} className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#111111]">
    <span className="link-underline">{children}</span>
    <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </Link>
);

export const Stat = ({ value, label, testid }) => (
  <div className="stat-block" data-testid={testid}>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export const CtaBand = ({ title = "Add a delivery team without adding headcount.", lead = "Start with a discovery call and a small pilot. You keep the client, the brand and the margin." }) => (
  <section className="cta-band" data-testid="cta-band">
    <div className="container-x py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center relative z-10">
      <div className="lg:col-span-8">
        <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION.</p>
        <h2 className="section-title mt-5 font-extrabold" data-testid="cta-band-title">{title}</h2>
        <p className="mt-6 max-w-xl leading-relaxed">{lead}</p>
      </div>
      <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-5">
        <Link to="/partner" data-testid="cta-band-partner" className="primary-button">
          Become a partner <span className="button-arrow"><ArrowUpRight size={20} /></span>
        </Link>
        <Link to="/pricing#rate-card" data-testid="cta-band-rate-card" className="inline-flex items-center gap-3 text-sm font-semibold link-underline">
          Or, get the rate card <ArrowRight size={16} />
        </Link>
      </div>
    </div>
    <Asterisk className="cta-asterisk" />
  </section>
);
