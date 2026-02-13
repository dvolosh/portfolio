import React from "react";
import LogoLoop from "../components/LogoLoop";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiPandas,
  SiNodedotjs, SiR, SiMysql, SiTableau, SiStreamlit, SiJavascript, SiNumpy
} from "react-icons/si";
import { FaJava, FaGitAlt } from "react-icons/fa6";
import { Database, Brain, Code, TrendingUp } from "lucide-react";

// Simple chip component
function Chip({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-[11px] bg-black/60 border border-blue-500/40">
      {children}
    </span>
  );
}

// Highlight row (4 cards now)
function HighlightRow() {
  const groups = [
    { icon: Database, title: "Data Engineering", items: ["SQL", "BigQuery", "ETL Pipelines", "Apache Spark"] },
    { icon: Brain, title: "Machine Learning", items: ["TensorFlow", "scikit-learn", "NLP", "Vertex AI"] },
    { icon: Code, title: "Development", items: ["Python", "R", "JavaScript", "Git", "Docker", "Next.js"] },
    { icon: TrendingUp, title: "Analytics & BI", items: ["Tableau", "Power BI", "Streamlit", "pandas", "SQL", "Plotly Dash"] },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map(({ icon: Icon, title, items }) => (
        <div
          key={title}
          className="rounded-2xl border border-blue-500/30 bg-black/60 backdrop-blur p-5 hover:border-blue-400/40 transition-all"
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon className="text-blue-300" size={18} />
            <div className="font-semibold text-sm">{title}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function FallbackRow() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-6 py-4 opacity-70">
        {[
          "React", "Next.js", "TypeScript", "Tailwind", "Python", "pandas",
          "sklearn", "TensorFlow", "AWS", "Azure", "Snowflake", "Power BI",
          "Git", "PostgreSQL", "Node.js"
        ].map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full text-xs bg-black/60 border border-blue-500/40"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

export default function SkillsSection() {
  const logos = [
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiPandas />, title: "pandas", href: "https://pandas.pydata.org/" },
    { node: <SiR />, title: "R", href: "https://www.r-project.org/" },
    { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com/" },
    { node: <SiTableau />, title: "Tableau", href: "https://www.tableau.com/" },
    { node: <SiStreamlit />, title: "Streamlit", href: "https://streamlit.io/" },
    { node: <FaJava />, title: "Java", href: "https://www.java.com" },
    { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org/" },
    { node: <FaGitAlt />, title: "Git", href: "https://git-scm.com" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  ];

  let content;
  try {
    content = (
      <LogoLoop
        logos={logos}
        speed={120}
        direction="left"
        logoHeight={44}
        gap={44}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Skills logos"
      />
    );
  } catch (e) {
    console.error("LogoLoop crashed:", e);
    content = <FallbackRow />;
  }

  return (
    <section id="skills" className="section">
      <div className="container-page">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">Technical Skills</h2>
        <p className="mt-3 text-center text-white/70 max-w-2xl mx-auto">
          Engineering pipelines, training models, and visualizing insights at scale
        </p>

        <div className="mt-8">{content}</div>

        <HighlightRow />
      </div>
    </section>
  );
}
