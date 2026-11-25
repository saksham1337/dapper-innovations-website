import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/site/Seo";
import { PageHero, CtaBand, Reveal } from "@/components/site/Blocks";
import { PillarArt } from "@/components/site/BrandArtwork";
import { PILLARS } from "@/data/site";
import { servicesByPillar } from "@/data/services";

export default function Services() {
  return (
    <>
      <Seo title="White Label Services for Agencies" path="/services"
        description="White label web development, software, AI chatbots, AI voice agents, PPC, SEO, social media, video editing and graphic design for agencies." />
      <PageHero eyebrow="Services" title="Everything your clients ask for. Delivered under your name."
        lead="Nine services across three pillars. Sell one, or sell them together. Every deliverable ships white-label." />
      {PILLARS.map((p, i) => (
        <section key={p.key} className={`services-pillar services-pillar-${p.key}`} data-testid={`services-pillar-${p.key}`}>
          <div className="container-x py-16 lg:py-24 grid lg:grid-cols-12 gap-10">
            <div className={`service-pillar-heading lg:col-span-4 pillar-${p.key}`}>
              <span className="font-num text-xs">0{i + 1} / THE SERVICES</span>
              <h2 className="mt-5 text-base md:text-lg font-bold">{p.label}.</h2>
              <p className="mt-3 leading-relaxed max-w-xs">{p.line}</p>
              <PillarArt pillar={p.key} />
            </div>
            <div className="lg:col-span-8 service-directory">
              {servicesByPillar(p.key).map((s, idx) => (
                <Reveal key={s.slug} delay={idx * 0.04}>
                  <Link to={`/services/${s.slug}`} data-testid={`service-card-${s.slug}`} className="service-directory-row group">
                    <span className="font-num text-xs text-[#5b5b5b]">0{idx + 1}</span>
                    <div><h3 className="text-lg font-bold">{s.name}</h3><p className="mt-2 text-sm text-[#5b5b5b] leading-relaxed">{s.short}</p></div>
                    <span className="directory-arrow"><ArrowUpRight size={22} /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
