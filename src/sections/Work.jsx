import React from "react";
import { motion } from "framer-motion";
import { PROJECTS, RESEARCH } from "../content/data";

const fadeUp = {
  initial: { opacity: 0, y: 14, filter: "blur(2px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" },
};

function Chip({ children }) {
  return <span className="px-3 py-1 rounded-full text-xs bg-black/60 border border-blue-500/40">{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-blue-500/30 bg-black/60 backdrop-blur p-5 ${className}`}>{children}</div>;
}

function MixedCard({ item }) {
  const isProject = item._type === "projects";
  return (
    <Card className="p-5 h-full flex flex-col hover:-translate-y-0.5 transition-transform">
      <div className="text-[12px] uppercase tracking-wider text-blue-300">{isProject ? "Project" : "Research"}</div>
      <div className="text-[17px] font-semibold mt-1">{item.title}</div>
      <p className="text-[15px] text-white/80 mt-2 flex-1">{item.blurb}</p>
      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">{item.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
      ) : null}
      <div className="mt-4">
        {isProject ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/40 text-sm text-white hover:bg-black/60">Open →</a>
        ) : item.link ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/40 text-sm text-white hover:bg-black/60">View Paper</a>
        ) : (
          <div className="text-sm text-white/60">Details coming soon</div>
        )}
      </div>
    </Card>
  );
}

export default function WorkSection() {
  const items = React.useMemo(() => [
    ...RESEARCH.map((r) => ({ ...r, _type: "research" })),
    ...PROJECTS.map((p) => ({ ...p, _type: "projects" })),
  ], []);
  const [filter, setFilter] = React.useState("all");
  const counts = { all: items.length, research: RESEARCH.length, projects: PROJECTS.length };
  const visible = items.filter((it) => (filter === "all" ? true : it._type === filter));

  return (
    <section id="work" className="py-16 sm:py-20">
      <div className="container-page">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">Research & Projects</h2>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-1 rounded-xl bg-black/40 p-1 ring-1 ring-white/10">
            {["all", "research", "projects"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  filter === t ? "bg-black/60 text-blue-300" : "text-white/80 hover:text-blue-300 hover:bg-black/40"
                }`}
              >
                {t === "all" ? `All (${counts.all})` : t === "research" ? `Research (${counts.research})` : `Projects (${counts.projects})`}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {visible.map((item, i) => (
            <motion.div key={i} {...fadeUp}><MixedCard item={item} /></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
