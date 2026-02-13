import React, { useState } from "react";
import { Menu } from "lucide-react";

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

  const LinkItem = ({ id, label }) => (
    <a
      href={`#${id}`}
      onClick={() => setOpen(false)}
      className={`group relative inline-block text-sm ${active === id ? "text-blue-300" : "text-white/80 hover:text-blue-300"
        }`}
    >
      {label}
      <span
        className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-blue-400/70 transition-transform ${active === id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
      />
    </a>
  );

  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="relative container-page h-14 sm:h-16 flex items-center justify-center">
        <nav className="hidden md:flex items-center gap-6 rounded-full bg-black/50 backdrop-blur px-4 py-1.5 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <LinkItem id="home" label="Home" />
          <LinkItem id="journey" label="Journey" />
          <LinkItem id="skills" label="Skills" />
          <LinkItem id="work" label="Projects" />
          <LinkItem id="contact" label="Contact" />
        </nav>
        <div className="absolute right-4 md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg border border-blue-500/40 text-white"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="container-page py-2 flex flex-col gap-2">
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
