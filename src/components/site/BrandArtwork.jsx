import { ArrowUpRight, Check, Code2, Sparkles } from "lucide-react";
import { Asterisk } from "./Blocks";

export const BrandArtwork = () => (
  <div className="brand-art" role="img" aria-label="Illustration of unbranded creative and digital work, delivered under your agency's name" data-testid="hero-brand-artwork">
    <div className="art-orbit" aria-hidden="true" />
    <div className="art-backplate"><span>THE TEAM BEHIND YOUR TEAM</span><Asterisk /></div>
    <div className="art-browser">
      <div className="art-browser-bar"><span className="browser-dots"><i /><i /><i /></span><span>yourbrand.com</span><ArrowUpRight size={14} /></div>
      <div className="art-browser-body">
        <div className="art-site-nav"><span>YOUR BRAND®</span><span>Ideas into impact <ArrowUpRight size={12} /></span></div>
        <div className="art-site-headline">Made for<br />your next<br /><em>big thing.</em></div>
        <div className="art-sculpture"><div /><div /><div /><div /></div>
        <div className="art-site-bottom"><span>YOUR VISION. BROUGHT TO LIFE.</span><span className="art-round-arrow"><ArrowUpRight size={22} /></span></div>
      </div>
    </div>
    <div className="art-code"><Code2 size={17} /><span>Behind the scenes.<br /><strong>Under your name.</strong></span><Check size={17} /></div>
    <div className="art-stamp"><Sparkles size={17} /><span>YOU GET<br />THE CREDIT.</span></div>
    <div className="art-caption"><span>01 — WHITE-LABEL BY DESIGN</span><span>BUILD / GROW / CONTENT</span></div>
  </div>
);

export const PillarArt = ({ pillar }) => (
  <div className={`pillar-art pillar-art-${pillar}`} aria-hidden="true">
    {pillar === "build" && <><div className="build-window"><span /><span /><span /><Code2 /></div><div className="build-window rear" /></>}
    {pillar === "grow" && <><div className="growth-bar" /><div className="growth-bar" /><div className="growth-bar" /><ArrowUpRight className="growth-arrow" /></>}
    {pillar === "content" && <><div className="content-disc" /><Asterisk className="content-star" /><div className="content-label">MAKE IT<br />STAND OUT.</div></>}
  </div>
);
