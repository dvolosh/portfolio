import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { PROJECTS, RESEARCH } from "../content/data";

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function FeaturedProject({ project, index }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-black/60 to-black/60 backdrop-blur p-8 sm:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)] transition-all duration-300 group"
    >
      <div className="mb-4">
        <h3 className="text-2xl sm:text-3xl font-semibold">{project.title}</h3>
        {project.category && (
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs text-blue-300 font-medium">
            {project.category}
          </div>
        )}
        {project.subtitle && (
          <p className="mt-1.5 text-blue-300/80 text-sm sm:text-base">{project.subtitle}</p>
        )}
        {project.period && (
          <p className="mt-1 text-white/50 text-sm">{project.period}</p>
        )}
      </div>

      <p className="text-white/80 leading-relaxed mb-6">{project.blurb}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            View Live Demo
            <ExternalLink size={16} />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-500/40 hover:bg-blue-500/10 hover:border-blue-400/60 text-white font-medium transition-all"
          >
            View on GitHub
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Featured Research Card (Vant-style elevated card) ── */
function FeaturedResearch({ research, index }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-black/60 to-black/60 backdrop-blur p-8 sm:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)] transition-all duration-300 group"
    >
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{research.title}</h3>
        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs text-blue-300 font-medium">
          Quantitative Research
        </div>
      </div>

      <p className="text-white/80 leading-relaxed mb-6">{research.blurb}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {research.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {research.link && (
        <a
          href={research.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          <FileText size={16} />
          Read Paper
          <ExternalLink size={16} />
        </a>
      )}
    </motion.div>
  );
}

function ResearchCard({ research, index }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-blue-500/30 bg-black/60 backdrop-blur p-6 sm:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:border-blue-400/50 transition-all duration-300"
    >
      <h3 className="text-lg sm:text-xl font-semibold leading-tight mb-3">{research.title}</h3>

      <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-4">{research.blurb}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {research.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {research.link && (
        <a
          href={research.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Read Paper
          <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border border-blue-500/30 bg-black/60 backdrop-blur p-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-blue-400/50 transition-all duration-300"
    >
      <div className="mb-3">
        <h4 className="text-lg font-semibold">{project.title}</h4>
        {project.category && (
          <p className="text-xs text-blue-300/70 mt-0.5">{project.category}</p>
        )}
      </div>

      <p className="text-sm text-white/70 leading-relaxed mb-4">{project.blurb}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View on GitHub
          <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );
}

export default function WorkSection() {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);
  const featuredResearch = RESEARCH.filter(r => r.featured);
  const otherResearch = RESEARCH.filter(r => !r.featured);

  return (
    <section id="work" className="section">
      <div className="container-page">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
          Projects & Research
        </h2>
        <p className="mt-3 text-center text-white/70 max-w-2xl mx-auto">
          Applying data science to real-world problems through research and production systems
        </p>

        {/* Featured Projects */}
        <div className="mt-12 space-y-6">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Research — vertical stack */}
        {RESEARCH.length > 0 && (
          <>
            <div className="mt-16 mb-8">
              <h3 className="text-2xl font-semibold text-center">Research</h3>
              <p className="mt-2 text-center text-white/60 text-sm">
                Academic work exploring quantitative methods and data-driven insights
              </p>
            </div>

            <div className="space-y-6">
              {featuredResearch.map((research, index) => (
                <FeaturedResearch key={research.title} research={research} index={index} />
              ))}
              {otherResearch.map((research, index) => (
                <ResearchCard key={research.title} research={research} index={index} />
              ))}
            </div>
          </>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="mt-16 mb-8">
              <h3 className="text-2xl font-semibold text-center">Additional Projects</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
