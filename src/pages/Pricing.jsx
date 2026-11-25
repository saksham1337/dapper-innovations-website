import { Seo } from "@/components/site/Seo";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, SectionHead } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { MODELS } from "@/data/site";
import { priceFor } from "@/data/pricing";
import { useHashScroll } from "./Work";

export default function Pricing() {
  useHashScroll();
  return (
    <>
      <Seo title="White Label Partner Pricing" path="/pricing"
        description="Four ways for agencies to buy white-label delivery: per project, monthly per client, dedicated team or a pilot project. Request the partner rate card." />
      <PageHero eyebrow="Partner pricing" title="Clear rates you can mark up."
        lead="Prices depend on the service, the scope and your monthly volume. Partners get a rate card with clear numbers, so you always know your margin before you quote." />
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Engagement models" title="Four ways to work with us." />
          <div className="grid md:grid-cols-2 gap-5">
            {MODELS.map((m, i) => (
              <div key={m.key} className={`pricing-model ${m.key === "pilotProject" ? "pricing-pilot" : ""} p-8 lg:p-10`} data-testid={`pricing-model-${m.key}`}>
                <div className="flex justify-between items-center"><span className="font-num text-xs">0{i + 1} / ENGAGEMENT</span>{m.key === "pilotProject" ? <span className="pilot-tag" data-testid="pricing-pilot-label">A GOOD PLACE TO START</span> : <ArrowUpRight size={24} />}</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111111]">{m.name}</h3>
                <p className="mt-1 text-[#111111]">{m.line}</p>
                <p className="mt-4 text-sm text-[#5b5b5b] leading-relaxed">{m.body}</p>
                <div className="mt-7 border-t border-border pt-5">
                  <p className="eyebrow !text-[#8f8f8f] mb-3">Suits</p>
                  <div className="flex flex-wrap gap-2">
                    {m.fits.map((f) => <span key={f} className="rounded-full bg-[#f5f5f5] px-3 py-1 text-xs text-[#5b5b5b]">{f}</span>)}
                  </div>
                </div>
                <Link to="#rate-card" className="pricing-rate-link" data-testid={`pricing-request-${m.key}`}><span data-testid={`pricing-price-${m.key}`}>{priceFor(m.key)}</span><ArrowUpRight size={18} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="rate-card" className="section scroll-mt-16 bg-[#f5f5f5] border-t border-border" data-testid="rate-card-section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Rate card</p>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#111111]">Get the partner rate card.</h2>
            <p className="mt-4 text-[#5b5b5b] leading-relaxed">Tell us what you sell and roughly how much. We will email you the rates that apply to your agency.</p>
          </div>
          <div className="enquiry-panel lg:col-span-8 p-6 sm:p-8 lg:p-10">
            <EnquiryForm type="rate_card" />
          </div>
        </div>
      </section>
    </>
  );
}
