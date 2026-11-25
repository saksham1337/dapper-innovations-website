import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/data/site";

const linkCls = ({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const mobileNav = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    mobileNav.current?.querySelector("a")?.focus();
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50" data-testid="site-header">
      <div className="container-x flex h-20 items-center justify-between gap-5">
        <Link to="/" data-testid="header-logo-link" aria-label="Dapper Innovations home"><Logo dark /></Link>
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation" data-testid="desktop-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls} data-testid={`nav-${n.to.slice(1)}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/partner" data-testid="header-partner-cta" className="header-cta hidden sm:inline-flex">
            Become a partner <ArrowUpRight size={16} />
          </Link>
          <button ref={menuButton} className="menu-toggle lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" data-testid="mobile-menu-toggle">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav ref={mobileNav} id="mobile-navigation" className="mobile-navigation lg:hidden" aria-label="Mobile navigation" data-testid="mobile-nav">
          {NAV.map((n, i) => (
            <NavLink key={n.to} to={n.to} className={linkCls} data-testid={`mobile-nav-${n.to.slice(1)}`}><span className="font-num text-xs opacity-40">0{i + 1}</span>{n.label}<ArrowUpRight size={20} /></NavLink>
          ))}
          <Link to="/partner" className="mobile-partner-link" data-testid="mobile-nav-partner">Become a partner <ArrowUpRight size={20} /></Link>
        </nav>
      )}
    </header>
  );
};
