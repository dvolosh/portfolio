// sections/Experience.jsx
import React from "react";
import { EXPERIENCE } from "../content/data";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 14, filter: "blur(2px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="container-page">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
          Experience
        </h2>

        <motion.div
          {...fadeUp}
          className="mt-8 rounded-2xl bg-black/80 border border-white/10 ring-1 ring-white/10 backdrop-blur p-5 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
        >
          <div className="relative">
            <ol className="space-y-8">
              {EXPERIENCE.map((item, i) => (
                <li key={i} className="relative">
                  <div className="grid grid-cols-[72px,1fr] sm:grid-cols-[80px,1fr] gap-4 sm:gap-6">
                    <div className="relative flex items-start justify-center">
                      <div className="relative z-10 rounded-xl bg-white/5 ring-1 ring-white/15 p-2.5 sm:p-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                        <img
                          src={item.logo}
                          alt={`${item.org} logo`}
                          className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                          {item.role}
                        </h3>
                        <span className="text-white/60">·</span>
                        <div className="text-white/85">{item.org}</div>
                      </div>

                      <div className="mt-1 text-sm text-white/60">
                        <span>{item.period}</span>
                        <span className="mx-2">•</span>
                        <span>{item.where}</span>
                      </div>

                      <ul className="mt-3 space-y-2 text-[14px] text-white/90 marker:text-white/50 list-disc pl-5">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
