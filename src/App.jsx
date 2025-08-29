import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Github from "lucide-react/dist/esm/icons/github.js";
import Linkedin from "lucide-react/dist/esm/icons/linkedin.js";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import FileDown from "lucide-react/dist/esm/icons/file-down.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Calendar from "lucide-react/dist/esm/icons/calendar.js";
import MapPin from "lucide-react/dist/esm/icons/map-pin.js";
import Wrench from "lucide-react/dist/esm/icons/wrench.js";
import Menu from "lucide-react/dist/esm/icons/menu.js";

// -------------------- Content ----------------------------------------------
const ME = {
  name: "Davyd Voloshyn",
  tagline: "Data Analytics & Machine Learning",
  blurb:
    "I’m a senior at UNC–Chapel Hill studying CS & Economics. I blend research rigor with product sense to turn big questions into data-driven outcomes, and I'm eager to apply my skills for advanced analysis and storytelling.",
  email: "dav.volosh@gmail.com",
  location: "Chapel Hill, NC",
  socials: [
    { icon: Github, label: "GitHub", href: "https://github.com/dvolosh" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/davyd-voloshyn/" },
  ],
};

const EXPERIENCE = [
  {
    org: "LPL Financial",
    role: "Data Analytics Intern",
    period: "Jun 2025 – Aug 2025",
    where: "Fort Mill, SC",
    bullets: [
      "Reported NPS and survey data analysis to identify improvement areas, satisfaction drivers, and inform strategic initiatives.",
      "Built a Power BI dashboard with KANO model, KPIs, and client segmentation to help executives prioritize product roadmap features.",
      "Applied and visualized topic modeling and summarization methods to turn textual data into actionable business insights.",
    ],
  },
  {
    org: "UNC Kenan‑Flagler Business School",
    role: "Research Assistant",
    period: "Jan 2025 – Present",
    where: "Remote, US",
    bullets: [
      "Clean large raw datasets, exploratory data analysis, ensure data quality, and time-series econometric modeling in Python.",
      "Built a scalable parallel computing pipeline for approximate string matching, improving memory efficiency and runtime.",
    ],
  },
  {
    org: "IBM",
    role: "Summer Fellow (Accelerate Program)",
    period: "Jun 2024 – Jul 2024",
    where: "Remote, US",
    bullets: [
      "Tailored a customer-focused virtual assistant suited for NLP tasks like summarization, sentiment analysis, and entity retrieval.",
      "Delivered demos and MVPs of scalable AI solutions to stakeholders, emphasizing business impact, usability, and innovation.",
    ],
  },
  {
    org: "UNC Department of Economics",
    role: "Undergraduate Researcher",
    period: "May 2024 – Sep 2024",
    where: "Chapel Hill, NC",
    bullets: [
      "Quantitative Research: modeling and forecasting market volatility with high-frequency financial data and textual data analytics.",
      "Achieved 30% accuracy increase with a more robust model including NLP methodologies and FinBERT LLM to quantify sentiment.",
      "Data mining: scraped and analyzed over 500,000 headlines and 50,000 full-text articles from WSJ, The Economist, and others.",
    ],
  },
  {
    org: "UNC Department of Computer Science",
    role: "Data Structures and Analysis TA",
    period: "Jan 2024 – Dec 2024",
    where: "Chapel Hill, NC",
    bullets: [
      "Communicated challenging data structures and analysis concepts to 400+ students. Debugged errors in students' code.",
      "Conducted office hours and led review session presentations to improve student understanding and assisted in grading."
    ],
  }
];

const SKILLS = {
  Languages: ["Python", "SQL", "Java", "R", "C", "JavaScript", 'CSS', 'HTML'],
  Libraries: ["pandas", "scikit‑learn", "NumPy", "TensorFlow", "NLTK", "Streamlit", "XGBoost", "Plotly", "seaborn"],
  Tools: ["Tableau", "Power BI", "Azure", "AWS", "Snowflake", "Git", "VS Code"],
};

const RESEARCH = [
  {
    title:
      "Forecasting Market Volatility with Macroeconomic Expectations from News-Based Textual Data",
    blurb:
      "Awarded The Guest Family Fund for Excellence in Economics. Conducted academic research focused on forecasting S&P 500 5-minute intraday realized variance using various real-time macroeconomic indicators scraped from media.",
    link: "https://econ.unc.edu/wp-content/uploads/sites/1423/2025/03/Voloshyn-summer_econ_research_paper.pdf",
    tags: ["Quantitative Research", "NLP", "LLM"],
  },
  {
    title: "Bipartisanship and Productivity",
    blurb:
      "Work as a Research Assistant under Prof. Gallemore. The project maps the spread of political affiliations across companies to measure internal partisan alignment. It examines whether politically aligned workforces perform better, foster greater collaboration, and achieve stronger firm outcomes.",
    tags: ["Working paper", "Political Science", "Accounting"],
  },
];

const PROJECTS = [
  {
    title: "Airbnb Daily Price Prediction",
    blurb:
      "Fine-tuned XGBoost regression and a TensorFlow neural network to predict daily listing prices using tabular and textual features. Engineered features from property descriptions using NLTK and built interactive geospatial visualization",
    link: "https://github.com/dvolosh/airbnb",
  },
  {
    title: "Portfolio Optimization",
    blurb:
      "Backtested market-neutral portfolio allocation with Monte Carlo simulation. Simulated sector-constrained mean-variance optimization using CAPM",
    link: "https://github.com/dvolosh/portfolio_optimization",
  },
  {
    title: "Spotify SVR Regression",
    blurb:
      "Developed a Support Vector Regression model to predict Spotify song popularity. Analyzed and visualized different trends across regions and time.",
    link: "https://github.com/dvolosh/spotify",
  },
];

// -------------------- Utilities --------------------------------------------
const fadeUp = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" },
};

function useSplash() {
  const [done, setDone] = useState(false);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (prefersReduced) { setDone(true); return; }
    const t = setTimeout(() => setDone(true), 600);
    return () => clearTimeout(t);
  }, [prefersReduced]);
  return done;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-indigo-500/20 bg-slate-900/40 ${className}`}>{children}</div>
);

// -------------------- Top Navbar (centered nav) ----------------------------
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/experience", label: "Experience & Skills" },
      { to: "/research-projects", label: "Research & Projects" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-40">
      <div className="relative mx-auto max-w-7xl px-4 h-14 sm:h-16 flex items-center justify-center">
        <nav className="hidden md:flex items-center gap-6 rounded-full bg-slate-950/70 backdrop-blur px-4 py-1.5 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `group relative inline-block text-sm ${
                  isActive ? "text-emerald-400" : "text-slate-300 hover:text-emerald-300"
                }`
              }
            >
              {l.label}
              <span
                className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-emerald-400/60 transition-transform group-hover:scale-x-100"
                aria-hidden
              />
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle (absolute right) */}
        <div className="absolute right-4 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg border border-emerald-500/30 text-slate-200"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/40"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ y: -220 }}
              animate={{ y: 0 }}
              exit={{ y: -220 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 right-0 top-0 bg-slate-950 border-b border-emerald-500/20 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Navigation</span>
                <button onClick={() => setOpen(false)} className="text-slate-300">✕</button>
              </div>
              <div className="flex flex-col gap-2">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-emerald-300 hover:bg-slate-900/40"
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// -------------------- Layout & Frame ---------------------------------------
function Frame({ children }) {
  // green outer field
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1400px_900px_at_10%_10%,rgba(34,197,94,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_90%_90%,rgba(132,204,22,0.16),transparent_60%)]" />
      </div>
      {children}
    </div>
  );
}

function Layout({ children }) {
  return (
    <Frame>
      <Navbar />
      <a href="#main" className="sr-only focus:not-sr-only absolute left-2 top-2 px-3 py-1 rounded bg-emerald-500 text-slate-900">Skip to content</a>
      <main id="main">{children}</main>
      <footer className="border-t border-indigo-500/20 mt-12">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-xs sm:text-sm text-slate-400">
          <span>© {new Date().getFullYear()} {ME.name}</span>
          <span className="opacity-80">Built with React & Tailwind</span>
        </div>
      </footer>
    </Frame>
  );
}

// -------------------- Pages -------------------------------------------------
function HomePage() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      {/* Inner container — bigger */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="relative rounded-3xl border border-indigo-500/20 bg-slate-900/70 backdrop-blur p-6 sm:p-10 md:p-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Text */}
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-br from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(16,185,129,0.25)]">{ME.name}</span>
            </h1>
            <p className="mt-3 text-emerald-300/90 text-lg sm:text-xl font-medium">{ME.tagline}</p>
            <p className="mt-5 text-[15px] leading-7 text-slate-300 max-w-prose">{ME.blurb}</p>

            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-slate-900 font-medium hover:opacity-95">
                Resume <FileDown size={16} />
              </a>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 ml-3">
                <MapPin size={16} /> {ME.location}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <a href={`mailto:${ME.email}`} className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/20 px-4 py-2 hover:bg-slate-950/60"><Mail size={16} /> {ME.email}</a>
              {ME.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/20 px-4 py-2 hover:bg-slate-950/60"><s.icon size={16} /> {s.label}</a>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-emerald-400/20 blur-3xl" />
              <div className="absolute -inset-3 rounded-3xl bg-emerald-400/30 blur-xl" />
              <img src="/picture.jpg" alt="Davyd Voloshyn" loading="lazy" decoding="async" sizes="(max-width: 768px) 18rem, 24rem" className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-3xl object-cover shadow-xl ring-2 ring-emerald-400/40" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <div className="relative mt-6">
      <div className="absolute left-[9px] top-3 bottom-8 w-px bg-emerald-500/30" />
      {EXPERIENCE.map((item, idx) => (
        <motion.div key={idx} {...fadeUp} className="relative pb-8 pl-8 md:pl-10">
          <span className="absolute left-[9px] top-1.5 size-4 md:size-5 rounded-full border border-emerald-400 bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.15)] -translate-x-1/2" />
          <div className="text-[15px] font-semibold text-emerald-300">{item.role} <span className="text-slate-300">@ {item.org}</span></div>
          <div className="text-sm text-slate-400 mt-1">{item.period} • {item.where}</div>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-[15px] text-slate-200/90">{item.bullets.map((b, i) => (<li key={i}>{b}</li>))}</ul>
        </motion.div>
      ))}
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-3 items-stretch">
      <motion.div {...fadeUp} className="h-full"><Card className="p-5 h-full flex flex-col"><div className="text-emerald-300 font-semibold">Languages</div><div className="mt-3 flex flex-wrap gap-2">{SKILLS.Languages.map((s) => (<span key={s} className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-indigo-500/20">{s}</span>))}</div></Card></motion.div>
      <motion.div {...fadeUp} className="h-full"><Card className="p-5 h-full flex flex-col"><div className="text-emerald-300 font-semibold">Libraries</div><div className="mt-3 flex flex-wrap gap-2">{SKILLS.Libraries.map((s) => (<span key={s} className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-indigo-500/20">{s}</span>))}</div></Card></motion.div>
      <motion.div {...fadeUp} className="h-full"><Card className="p-5 h-full flex flex-col"><div className="text-emerald-300 font-semibold">Tools</div><div className="mt-3 flex flex-wrap gap-2">{SKILLS.Tools.map((s) => (<span key={s} className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-indigo-500/20">{s}</span>))}</div></Card></motion.div>
    </div>
  );
}

function ExperiencePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-slate-900 font-medium hover:opacity-95"
        >
          PDF Resume <FileDown size={16} />
        </a>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2"><Calendar className="text-emerald-400" size={22}/><h2 className="text-xl font-semibold tracking-tight">Experience</h2></div>
        <ExperienceTimeline />
      </div>

      <div className="mt-10">
        <div className="flex items items-center gap-2"><Wrench className="text-emerald-400" size={22}/><h2 className="text-xl font-semibold tracking-tight">Skills</h2></div>
        <SkillsSection />
      </div>
    </section>
  );
}

function MixedCard({ item }) {
  const isProject = item._type === "projects";
  return (
    <Card className="p-5 h-full flex flex-col hover:-translate-y-0.5 transition-transform">
      <div className="text-[12px] uppercase tracking-wider text-emerald-300/80">{isProject ? "Project" : "Research"}</div>
      <div className="text-[17px] font-semibold mt-1">{item.title}</div>
      <p className="text-[15px] text-slate-300 mt-2 flex-1">{item.blurb}</p>
      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-indigo-500/20">{t}</span>
          ))}
        </div>
      ) : null}
      <div className="mt-4">
        {isProject ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-sm text-emerald-300 hover:bg-slate-900">Open →</a>
        ) : item.link ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-sm text-emerald-300 hover:bg-slate-900">View Paper</a>
        ) : (
          <div className="text-sm text-slate-400">Details coming soon</div>
        )}
      </div>
    </Card>
  );
}

function ResearchProjectsPage() {
  const [filter, setFilter] = useState("all");
  const items = useMemo(
    () => [
      ...RESEARCH.map((r) => ({ ...r, _type: "research" })),
      ...PROJECTS.map((p) => ({ ...p, _type: "projects" })),
    ],
    []
  );
  const counts = { all: items.length, research: RESEARCH.length, projects: PROJECTS.length };
  const visible = items.filter((it) => (filter === "all" ? true : it._type === filter));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-xl bg-slate-900/40 p-1 ring-1 ring-white/10">
          {(["all", "research", "projects"]).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                filter === t ? "bg-slate-800/60 text-emerald-300" : "text-slate-300 hover:text-emerald-300 hover:bg-slate-900/40"
              }`}
            >
              {t === "all" ? `All (${counts.all})` : t === "research" ? `Research (${counts.research})` : `Projects (${counts.projects})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {visible.map((item, i) => (
          <motion.div key={i} {...fadeUp}>
            <MixedCard item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-slate-400">The page you’re looking for doesn’t exist.</p>
      <div className="mt-6"><NavLink to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 hover:bg-slate-900">Go Home</NavLink></div>
    </section>
  );
}

// -------------------- Meta (SEO & Social) ----------------------------------
function Meta() {
  const title = "Davyd Voloshyn"; // renamed per request
  const desc = "Data Analytics & Machine Learning — portfolio, experience, research & projects.";
  const url = "https://your-domain.com"; // TODO: set your deployed URL
  const image = `${url}/og.png`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
      <link rel="preload" href="/resume.pdf" as="fetch" type="application/pdf" crossOrigin="anonymous" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: ME.name,
        jobTitle: "Data Analytics & Machine Learning",
        email: `mailto:${ME.email}`,
        url,
        sameAs: ME.socials.map((s) => s.href),
      })}</script>
    </Helmet>
  );
}

// -------------------- Router Shell -----------------------------------------
function Shell() {
  const splashDone = useSplash();
  return (
    <AnimatePresence>
      {splashDone ? (
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/research-projects" element={<ResearchProjectsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      ) : (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-slate-950" />
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Meta />
        <Shell />
      </BrowserRouter>
    </HelmetProvider>
  );
}