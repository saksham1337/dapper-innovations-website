export const LogoMark = ({ size = 28, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="7" fill={dark ? "#ffffff" : "#0a0a0a"} />
    <path d="M22.5 8.5H9.5V15.5H14" fill="none" stroke={dark ? "#0a0a0a" : "#ffffff"} strokeWidth="3.2" strokeLinecap="square" />
    <path d="M9.5 23.5H22.5V16.5H18" fill="none" stroke={dark ? "#c91c1c" : "#ff4d4d"} strokeWidth="3.2" strokeLinecap="square" />
  </svg>
);

export const Logo = ({ dark = false }) => (
  <span className="inline-flex items-center gap-2.5" data-testid={dark ? "footer-logo" : "site-logo"}>
    <LogoMark size={30} dark={dark} />
    <span className={`font-display text-[1.3rem] font-extrabold tracking-[-0.055em] ${dark ? "text-white" : "text-[#111111]"}`}>
      Dapper Innovations
    </span>
  </span>
);
