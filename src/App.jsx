import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ArrowRight, Calendar, MapPin, ScatterChart, Cpu, Brain, Wrench, FileText } from "lucide-react";


const ME = {
  name: "Davyd Voloshyn",
  tagline: "Data Analytics & Machine Learning",
  blurb: 
    "I’m a rising senior at UNC–Chapel Hill studying CS & Economics. I blend research rigor with product sense to turn big questions into data-driven outcomes, and I'm eager to apply my skills for advanced analysis and storytelling.",
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
      "Delivered NPS and survey data analysis to identify improvement areas, satisfaction drivers, and inform strategic initiatives.",
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
      "Data mining: scraped and analyzed over 500,000 headlines and 50,000 full-text articles from WSJ, The Economist, and others."
    ],
  },
];

const SKILLS = {
  Languages: ["Python", "SQL", "Java", "R", "C"],
  Libraries: ["pandas", "scikit‑learn", 'NumPy', "TensorFlow", "NLTK", 'Streamlit', 'XGBoost', 'Plotly', 'seaborn'],
  Tools: ["Tableau", "Power BI", "Azure", "AWS", "Snowflake", "Git", 'VS Code'],
};

const RESEARCH = [
  { title: "Forecasting Market Volatility with Macroeconomic Expectations from News-Based Textual Data", 
    blurb: "Awarded The Guest Family Fund for Excellence in Economics. Conducted academic research focused on forecasting S&P 500 5-minute intraday realized variance using various real-time macroeconomic indicators scraped from media.",
    link: "https://econ.unc.edu/wp-content/uploads/sites/1423/2025/03/Voloshyn-summer_econ_research_paper.pdf",
    tags: ["Quantitative Research", "NLP", 'LLM']
  },
  { title: "Bipartisanship and Productivity", 
    blurb: "Work as a Research Assistant under Prof. Gallemore. The project maps the spread of political affiliations across companies to measure internal partisan alignment. It examines whether politically aligned workforces perform better, foster greater collaboration, and achieve stronger firm outcomes.",
    tags: ["Working paper", "Political Science", "Accounting"]
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
    title: "Portofolio Optimization",
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
function useSplash() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);
  return done;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

const PageTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="container mx-auto max-w-6xl px-4 pt-12 pb-6">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="text-emerald-400" size={22} />}
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
    </div>
    {subtitle && (
      <p className="mt-2 text-sm text-slate-400 max-w-2xl">{subtitle}</p>
    )}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-emerald-500/20 bg-slate-900/40 ${className}`}>
    {children}
  </div>
);

const LinkButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-slate-900 font-medium hover:opacity-95 focus:outline-none"
  >
    {children} <ArrowRight size={16} />
  </a>
);

// -------------------- Splash (loader) --------------------------------------
function Splash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="relative">
        <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.20),rgba(16,185,129,0)_60%)] blur-2xl" />
        <motion.div
          initial={{ scale: 0.9, filter: "blur(8px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-8 py-6 rounded-2xl border border-emerald-400/30 bg-slate-900/60 backdrop-blur"
        >
          <div className="text-center">
            <div className="text-sm uppercase tracking-widest text-emerald-400/80">Welcome</div>
            <div className="mt-2 text-2xl font-semibold text-white drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]">Davyd Voloshyn</div>
            <div className="mt-1 text-slate-400">Data Analytics & Applied ML</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// -------------------- Layout & Nav -----------------------------------------
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* background accent */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div className="absolute -top-20 -left-20 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),rgba(34,197,94,0)_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.10),rgba(132,204,22,0)_60%)] blur-3xl" />
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const links = useMemo(
    () => [
      { to: "/", label: "About" },
      { to: "/research", label: "Research" },
      { to: "/projects", label: "Projects" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur border-b border-emerald-500/20">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-[15px] font-semibold tracking-tight">
          {"Home"}
        </NavLink>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-emerald-400" : "text-slate-300 hover:text-emerald-300"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-emerald-500/20 mt-12">
      <div className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between text-sm text-slate-400">
        <span>© {new Date().getFullYear()} {ME.name}</span>
        <span className="opacity-80">Built with React & Tailwind</span>
      </div>
    </footer>
  );
}

// -------------------- Pages -------------------------------------------------
function HomePage() {
  return (
    <>
      {/* ABOUT ME — two columns */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left column */}
          <div>
            <h1 className="text-3xl sm:text-[34px] md:text-[40px] font-bold tracking-tight">
              {ME.name}
            </h1>
            <p className="mt-2 text-emerald-400/90 font-medium">{ME.tagline}</p>

            <p className="mt-5 text-[15px] leading-7 text-slate-300">
              {ME.blurb}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <a
                href={`mailto:${ME.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 px-4 py-2 hover:bg-slate-900"
              >
                <Mail size={16} /> {ME.email}
              </a>
              {ME.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 px-4 py-2 hover:bg-slate-900"
                >
                  <s.icon size={16} /> {s.label}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <LinkButton href="/resume.pdf">
                Resume <FileDown size={16} />
              </LinkButton>
            </div>

            <div className="mt-6 text-sm text-slate-400 flex items-center gap-2">
              <MapPin size={16} /> {ME.location}
            </div>
          </div>

          {/* Right column — Picture with static multi-layered glow */}
          <div className="flex justify-center md:justify-center">
            <div className="relative">
              {/* Outer green glow */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[120%] h-[120%] rounded-3xl bg-emerald-400/20 blur-3xl" />
              </div>

              {/* Inner brighter core */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[105%] h-[105%] rounded-3xl bg-emerald-400/40 blur-xl" />
              </div>

              {/* Picture */}
              <img
                src="/picture.jpg"
                alt="Davyd Voloshyn"
                className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl object-cover shadow-lg ring-2 ring-emerald-400/50"
              />
            </div>
          </div>



        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="border-t border-emerald-500/20" />
      </div>

      {/* EXPERIENCE (timeline) */}
      <div id="experience" className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex items-center gap-3">
          <Calendar className="text-emerald-400" size={22} />
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        </div>

        <div className="relative mt-6">
          <div className="absolute left-[9px] top-3 bottom-8 w-px bg-emerald-500/30" />
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="relative pb-10 pl-8 md:pl-10">
              <span className="absolute left-[9px] top-1.5 size-4 md:size-5 rounded-full border border-emerald-400 bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.15)] -translate-x-1/2" />
              <div className="text-[15px] font-semibold text-emerald-300">
                {item.role} <span className="text-slate-300">@ {item.org}</span>
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {item.period} • {item.where}
              </div>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-[15px] text-slate-200/90">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 mt-10">
        <div className="border-t border-emerald-500/20" />
      </div>

      {/* SKILLS */}
      <div id="skills" className="mx-auto max-w-6xl px-4 pt-12 pb-16">
        <div className="flex items-center gap-3">
          <Wrench className="text-emerald-400" size={22} />
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Card className="p-5">
            <div className="text-emerald-300 font-semibold">Languages</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILLS.Languages.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-emerald-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-emerald-300 font-semibold">Libraries</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILLS.Libraries.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-emerald-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-emerald-300 font-semibold">Tools</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILLS.Tools.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-emerald-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}




function ResearchCard({ item }) {
  return (
    <Card className="p-5 hover:-translate-y-0.5 transition-transform">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[17px] font-semibold">{item.title}</div>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-sm text-emerald-300 hover:bg-slate-900"
            aria-label="View paper"
            title="View paper"
          >
            <FileText size={16} /> View
          </a>
        ) : null}
      </div>

      <p className="text-[15px] text-slate-300 mt-2">{item.blurb}</p>

      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-emerald-500/20"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {!item.link ? (
        <div className="mt-3 text-sm text-slate-400">Details coming soon</div>
      ) : null}
    </Card>
  );
}

function ResearchPage() {
  const papers = RESEARCH.filter((r) => !!r.link);
  const inProgress = RESEARCH.filter((r) => !r.link);

  return (
    <>
      <PageTitle
        icon={ScatterChart}
        title="Research"
      />

      {/* Papers & Reports */}
      {papers.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-8">
          <h2 className="text-lg font-semibold text-emerald-300 mb-4">Academic papers</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {papers.map((r, i) => (
              <ResearchCard key={`paper-${i}`} item={r} />
            ))}
          </div>
        </div>
      )}

      {/* In-Progress / Assistantships */}
      {inProgress.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-lg font-semibold text-emerald-300 mb-4">In-Progress / Assistantship</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {inProgress.map((r, i) => (
              <ResearchCard key={`inprog-${i}`} item={r} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}


function ProjectsPage() {
  return (
    <>
      <PageTitle icon={Cpu} title="Projects" />
      <div className="mx-auto max-w-6xl px-4 pb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => {
          const content = (
            <>
              <div className="text-[17px] font-semibold">{p.title}</div>
              <p className="text-[15px] text-slate-300 mt-2 flex-1">{p.blurb}</p>
            </>
          );

          // If there's a link, render as an <a> "card"
          if (p.link) {
            return (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open project: ${p.title}`}
                className="
                  group block h-full p-5 rounded-2xl border bg-slate-900/40
                  border-emerald-500/20 hover:border-emerald-400/40
                  hover:-translate-y-0.5 transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60
                  cursor-pointer
                "
              >
                {content}
                <div className="mt-3 text-sm text-emerald-300 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition">
                  Open →
                </div>
              </a>
            );
          }

          // Fallback: no link → non-clickable card
          return (
            <div
              key={i}
              className="h-full p-5 rounded-2xl border border-emerald-500/20 bg-slate-900/40"
            >
              {content}
            </div>
          );
        })}
      </div>
    </>
  );
}


// -------------------- Router Shell -----------------------------------------
function Shell() {
  const splashDone = useSplash();
  return (
    <AnimatePresence>{
      splashDone ? (
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </Layout>
      ) : (
        <Splash />
      )
    }</AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
