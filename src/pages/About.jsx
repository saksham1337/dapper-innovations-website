import { Seo } from "@/components/site/Seo";
import { PageHero, CtaBand, Stat, Asterisk } from "@/components/site/Blocks";

const REASONS = [
  { title: "Agencies only", body: "We do not sell to end clients. That keeps our incentives simple: we grow when your agency grows, and we never compete with you." },
  { title: "Delivery, not sales", body: "You already know how to win clients. We focus on the part that slows agencies down: getting the work done well and on time." },
  { title: "One team across three pillars", body: "Build, Grow and Content under one roof means one partner can run a full client account, not just one piece of it." },
];

export default function About() {
  return (
    <>
      <Seo title="About Dapper Innovations, White Label Partner" path="/about"
        description="Dapper Innovations is a Canada-based white-label delivery team for digital agencies in Canada and the USA, with 150+ websites built." />
      <PageHero eyebrow="About" title="The team behind your agency's delivery."
        lead="Dapper Innovations is a delivery team based in Canada. We work only with digital agencies in Canada and the USA, and only under their brands." />
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="about-poster" data-testid="about-brand-artwork">
              <span className="font-num text-xs">CANADA / DAPPER INNOVATIONS</span>
              <Asterisk />
              <p>Behind<br />the scenes.<br /><span>Ahead of<br />the game.</span></p>
              <span className="about-poster-footer">YOUR BRAND. OUR TEAM.</span>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <p className="eyebrow">Track record</p>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#111111]">Real work across real industries.</h2>
            <p className="mt-5 text-[#5b5b5b] leading-relaxed">We have built more than 150 websites and run paid ads, social media, SEO and design for brands in consumer tech, education and automotive. We keep every one of those clients anonymous.</p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <Stat value="150+" label="Websites built" testid="about-stat-websites" />
              <Stat value="3" label="Industries: consumer tech, education, automotive" testid="about-stat-industries" />
              <Stat value="3+ yrs" label="Longest continuous ads account" testid="about-stat-longest" />
              <Stat value="3" label="Countries run on one account at once" testid="about-stat-countries" />
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-[#f5f5f5] border-t border-border">
        <div className="container-x">
          <p className="eyebrow">Why agencies only</p>
          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            {REASONS.map((r) => (
              <div key={r.title} className="border border-border bg-white p-8" data-testid={`about-reason-${r.title.split(" ")[0].toLowerCase()}`}>
                <h3 className="text-xl font-semibold text-[#111111]">{r.title}</h3>
                <p className="mt-3 text-sm text-[#5b5b5b] leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
