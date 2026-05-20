import React, { useState } from "react";
import { Menu, X } from "lucide-react";

/* ── Track whether user has scrolled past the hero ── */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

export default function Navbar() {
  const ids = ["home", "journey", "skills", "work", "contact"];
  const active = useScrollSpy(ids);
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(60);

  const LinkItem = ({ id, label }) => (
    <a
      href={`#${id}`}
      onClick={() => setOpen(false)}
      className={`group relative inline-block text-sm transition-colors duration-200 ${
        active === id ? "text-blue-300" : "text-white/75 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-blue-400/70 transition-transform duration-200 ${
          active === id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </a>
  );

  return (
    <header
      className="sticky top-0 z-[100] transition-all duration-500"
      style={{
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        background: scrolled ? "rgba(0,0,0,0.55)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="relative container-page h-14 sm:h-16 flex items-center justify-center">

        {/* Desktop nav — pill fades in/out, links always visible */}
        <nav
          className="hidden md:flex items-center gap-7 rounded-full px-5 py-2 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(0,0,0,0.35)" : "transparent",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
          }}
        >
          <LinkItem id="home" label="Home" />
          <LinkItem id="journey" label="Journey" />
          <LinkItem id="skills" label="Skills" />
          <LinkItem id="work" label="Projects" />
          <LinkItem id="contact" label="Contact" />
        </nav>

        {/* Mobile hamburger */}
        <div className="absolute right-4 md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="container-page py-3 flex flex-col gap-3">
            <LinkItem id="home" label="Home" />
            <LinkItem id="journey" label="Journey" />
            <LinkItem id="skills" label="Skills" />
            <LinkItem id="work" label="Projects" />
            <LinkItem id="contact" label="Contact" />
          </div>
        </div>
      )}
    </header>
  );
}
