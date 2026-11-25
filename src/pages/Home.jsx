import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, LockKeyhole, Files, UserRoundCheck, Fingerprint, Handshake } from "lucide-react";
import { Seo } from "@/components/site/Seo";
import { PrimaryBtn, GhostBtn, SectionHead, Stat, TextLink, CtaBand, Reveal, Asterisk } from "@/components/site/Blocks";
import { BrandArtwork, PillarArt } from "@/components/site/BrandArtwork";
import { CaseCard } from "@/components/site/CaseCard";
import { FaqList } from "@/components/site/FaqList";
import { SITE, GUARANTEES, PILLARS, STEPS, MODELS, FAQ_GROUPS, STATS } from "@/data/site";
import { servicesByPillar } from "@/data/services";
import { CASE_STUDIES } from "@/data/caseStudies";
import { priceFor } from "@/data/pricing";

const Hero = () => (
  <section className="home-hero" data-testid="home-hero">
    <div className="container-x hero-layout">
      <div className="hero-copy">
        <p className="eyebrow reveal" data-testid="hero-audience"><span className="status-dot" />WHITE-LABEL DELIVERY. AGENCY-ONLY.</p>
        <h1 className="reveal hero-title" style={{ animationDelay: "80ms" }} data-testid="home-hero-title">
          Your brand.<br />Our team.<br /><span>Delivered<br className="hero-title-break" /> on time.</span>
        </h1>
        <p className="reveal hero-description" style={{ animationDelay: "160ms" }}>
          You win the clients. We do the delivery. Web, AI, ads and content from our Canada-based team—under your name, never ours.
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
          <PrimaryBtn to="/partner" testid="hero-partner-cta">Become a partner</PrimaryBtn>
          <GhostBtn to="/work" testid="hero-work-cta">Explore our work <ArrowUpRight size={16} /></GhostBtn>
        </div>
        <p className="hero-footnote reveal" style={{ animationDelay: "300ms" }}><ShieldCheck size={14} /> NDA first. Your clients stay yours.</p>
      </div>
      <Reveal className="hero-art-column" delay={0.2}><BrandArtwork /></Reveal>
    </div>
    <div className="hero-bottom"><div className="container-x"><span>BASED IN CANADA. BUILT FOR YOUR AGENCY.</span><span>CANADA & USA <ArrowUpRight size={13} /></span></div></div>
  </section>
);

const TrackRecord = () => (
  <section className="track-record" aria-label="Our track record" data-testid="hero-stats">
    <div className="container-x track-record-inner">
      <p className="eyebrow">Quietly behind{" "}<br />big things.</p>
      {STATS.map((s, i) => <Stat key={s.label} {...s} testid={`hero-stat-${i}`} />)}
    </div>
  </section>
);

const Marquee = () => (
  <div className="service-ribbon" aria-label="Build. Grow. Content. All under your brand." data-testid="services-ribbon">
    <div className="ribbon-track" aria-hidden="true">{[0, 1, 2, 3].map((n) => <span className="ribbon-group" key={n}>BUILD <Asterisk /> GROW <Asterisk /> CONTENT <Asterisk /> ALL UNDER YOUR BRAND <Asterisk /></span>)}</div>
  </div>
);

const Pillars = () => (
  <section className="section" data-testid="home-pillars">
    <div className="container-x">
      <SectionHead eyebrow="What we deliver" title="Nine services. Three pillars. One partner." action={<TextLink to="/services" testid="pillars-all-services">All services</TextLink>} />
      <div className="pillar-grid">
        {PILLARS.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.08} className={`pillar-card pillar-${p.key}`}>
            <div data-testid={`pillar-${p.key}`}>
              <div className="pillar-top"><span className="font-num text-xs">0{i + 1} / {p.label.toUpperCase()}</span><ArrowUpRight size={22} /></div>
              <PillarArt pillar={p.key} />
              <h3 className="pillar-title">{p.label}<span>.</span></h3>
              <p className="pillar-description">{p.line}</p>
              <ul className="pillar-links">
                {servicesByPillar(p.key).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} data-testid={`pillar-service-${s.slug}`}>
                      {s.name}<ArrowUpRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const GUARANTEE_ICONS = [ShieldCheck, LockKeyhole, Files, UserRoundCheck, Fingerprint, Handshake];
const Guarantees = () => (
  <section className="section guarantee-section" data-testid="home-guarantees">
    <div className="container-x guarantee-layout">
      <Reveal className="guarantee-intro">
        <p className="eyebrow">The white-label promise</p>
        <h2 className="section-title mt-5">Your agency.<br />Your clients.<br /><span>Your spotlight.</span></h2>
        <p className="mt-6 text-sm leading-relaxed text-slate-400 max-w-xs">We do the work. You take the credit. That's not a feature—it's the entire point.</p>
        <div className="confidential-seal"><ShieldCheck size={28} /><span>100% WHITE-LABEL<br /><strong>BY DESIGN. BY DEFAULT.</strong></span></div>
      </Reveal>
      <div className="guarantee-grid">
        {GUARANTEES.map((g, i) => {
          const Icon = GUARANTEE_ICONS[i];
          return <Reveal key={g.title} delay={i * 0.035} className="guarantee-item">
            <div data-testid={`guarantee-${i}`}><div className="guarantee-item-top"><Icon size={23} /><span className="font-num">0{i + 1}</span></div><h3 className="mt-5 text-base font-bold">{g.title}</h3><p className="mt-3 text-sm leading-relaxed">{g.body}</p></div>
          </Reveal>;
        })}
      </div>
    </div>
  </section>
);

const HowShort = () => (
  <section className="section border-b border-border" data-testid="home-how">
    <div className="container-x">
      <SectionHead eyebrow="How it works" title="From first call to steady delivery." action={<TextLink to="/how-it-works" testid="how-full-process">The full process</TextLink>} />
      <ol className="home-process-grid">
        {STEPS.map((s, i) => (
          <li key={s.title} data-testid={`home-step-${i}`}>
            <span className="process-dot">0{i + 1}</span>
            <h3 className="mt-5 text-sm font-bold">{s.title}</h3>
            {i === 2 && <span className="process-note">Start small. See the quality.</span>}
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const Models = () => (
  <section className="section" data-testid="home-models">
    <div className="container-x">
      <SectionHead eyebrow="Engagement models" title="Buy delivery the way you sell it." action={<TextLink to="/pricing" testid="models-pricing-link">Partner pricing</TextLink>} />
      <div className="home-model-list">
        {MODELS.map((m, i) => (
          <Link to="/pricing" key={m.key} className="home-model-row" data-testid={`home-model-${m.key}`}>
            <span className="font-num text-xs">0{i + 1}</span>
            <h3>{m.name}</h3>
            <p>{m.line}</p>
            <span className="model-rate">{priceFor(m.key)}</span>
            <ArrowUpRight size={22} />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Proof = () => (
  <section className="section bg-[#F4F4F2] border-y border-border" data-testid="home-proof">
    <div className="container-x">
      <SectionHead eyebrow="Real results, anonymized" title="We keep our clients' names private. Yours too." lead="Every number below comes from real accounts we have delivered. No money figures, no client names." action={<TextLink to="/work" testid="proof-all-work">All case studies</TextLink>} />
      <div className="grid lg:grid-cols-2 gap-5">
        {CASE_STUDIES.filter((c) => c.type === "results").map((c) => <CaseCard key={c.id} c={c} compact />)}
      </div>
    </div>
  </section>
);

const FaqTeaser = () => (
  <section className="section" data-testid="home-faq">
    <div className="container-x grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#111418]">What agencies ask first.</h2>
        <div className="mt-6"><TextLink to="/faq" testid="faq-teaser-all">Read every answer</TextLink></div>
      </div>
      <div className="lg:col-span-8">
        <FaqList prefix="home-faq" items={[FAQ_GROUPS[0].items[0], FAQ_GROUPS[0].items[1], FAQ_GROUPS[3].items[0], FAQ_GROUPS[1].items[3]]} />
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Seo title="Dapper Innovations | White Label Agency Delivery Partner" path="/"
        description={`White-label web, AI, paid ads, SEO and content delivery for digital agencies in ${SITE.markets}. Your brand. Our team. Delivered on time.`} />
      <Hero /><TrackRecord /><Pillars /><Marquee /><Proof /><Guarantees /><HowShort /><Models /><FaqTeaser /><CtaBand />
    </>
  );
}
