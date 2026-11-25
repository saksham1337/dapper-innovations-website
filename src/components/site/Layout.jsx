import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="site-shell min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link" data-testid="skip-to-content">Skip to content</a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}><Outlet /></main>
      <Footer />
    </div>
  );
}
