import React from "react";
import LogoLoop from "../components/LogoLoop";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiPandas,
  SiNodedotjs, SiR, SiMysql, SiTableau, SiStreamlit, SiJavascript, SiNumpy
} from "react-icons/si";
import { FaJava, FaGitAlt } from "react-icons/fa6";
import { BookText, Code2, BarChart3 } from "lucide-react";

// Simple chip component
function Chip({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-[11px] bg-black/60 border border-blue-500/40">
      {children}
    </span>
  );
}

// Highlight row (3 cards)
function HighlightRow() {
  const groups = [
    { icon: BookText, title: "Natural Language Processing", items: ["NLTK", "Gensim", "TensorFlow"] },
    { icon: Code2, title: "Scripting", items: ["Python", "R", "SQL"] },
    { icon: BarChart3, title: "Data Visualizations", items: ["Streamlit", "Power BI", "Tableau"] },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {groups.map(({ icon: Icon, title, items }) => (
        <div
          key={title}
          className="rounded-2xl border border-blue-500/30 bg-black/60 backdrop-blur p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon className="text-blue-300" size={18} />
            <div className="font-semibold">{title}</div>
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
          "React","Next.js","TypeScript","Tailwind","Python","pandas",
          "sklearn","TensorFlow","AWS","Azure","Snowflake","Power BI",
          "Git","PostgreSQL","Node.js"
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
    <section id="skills" className="py-16 sm:py-20">
      <div className="container-page">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">Skills</h2>

        {/* Slider */}
        <div className="mt-8">{content}</div>

        {/* Highlighted groups */}
        <HighlightRow />
      </div>
    </section>
  );
}
