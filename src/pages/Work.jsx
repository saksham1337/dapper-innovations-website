import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Seo } from "@/components/site/Seo";
import { PageHero, CtaBand } from "@/components/site/Blocks";
import { CaseCard } from "@/components/site/CaseCard";
import { CASE_STUDIES } from "@/data/caseStudies";

export const useHashScroll = () => {
  const { hash, key } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior }), 120);
    return () => clearTimeout(t);
  }, [hash, key]);
};

export default function Work() {
  useHashScroll();
  return (
    <>
      <Seo title="White Label Case Studies" path="/work"
        description="Anonymized results from real white-label work: paid ads, social media, influencer campaigns, websites, SEO and design across education and consumer tech." />
      <PageHero eyebrow="Work" title="Real numbers. No client names."
        lead="These are real accounts we have delivered. We keep every client anonymous, the same way we will keep yours. Money figures are left out on purpose." />
      <section className="section work-section">
        <div className="container-x grid lg:grid-cols-2 gap-5" data-testid="work-case-list">
          {CASE_STUDIES.map((c) => <CaseCard key={c.id} c={c} />)}
        </div>
      </section>
      <CtaBand title="Want results like these under your brand?" />
    </>
  );
}
