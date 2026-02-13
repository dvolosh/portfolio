import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { EXPERIENCE, LEADERSHIP } from "../content/data";

const fadeUp = {
    initial: { opacity: 0, y: 24, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function ExperienceCard({ item, icon: Icon, index }) {
    return (
        <motion.li
            {...fadeUp}
            transition={{ delay: index * 0.1 }}
            className="relative"
        >
            <div className="flex gap-5 sm:gap-6">
                <div className="relative flex-shrink-0 flex items-start justify-center group">
                    <div className="relative z-10 rounded-full bg-gradient-to-br from-blue-950/40 to-black/60 ring-2 ring-blue-500/20 p-3 sm:p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:ring-blue-400/40 hover:shadow-[0_8px_32px_rgba(59,130,246,0.25)]">
                        <img
                            src={item.logo}
                            alt={`${item.org} logo`}
                            className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                        <h3 className="text-xl sm:text-2xl font-semibold leading-tight">
                            {item.role}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2 text-blue-300/90 font-medium">
                        <Icon size={16} />
                        <span>{item.org}</span>
                    </div>

                    <div className="mt-1 text-sm text-white/60">
                        <span>{item.period}</span>
                        <span className="mx-2">•</span>
                        <span>{item.where}</span>
                    </div>

                    <ul className="mt-4 space-y-2.5 text-[15px] text-white/85 marker:text-blue-400/70 list-disc pl-5">
                        {item.bullets.map((b, j) => (
                            <li key={j} className="leading-relaxed">
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.li>
    );
}

export default function Journey() {
    return (
        <section id="journey" className="section">
            <div className="container-page">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
                    Experience & Leadership
                </h2>
                <p className="mt-3 text-center text-white/70 max-w-2xl mx-auto">
                    Quantitative research to production analytics, delivering data-driven impact across industry and academia
                </p>

                <div className="mt-12 space-y-12">
                    {/* Work Experience */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="text-blue-400" size={24} />
                            <h3 className="text-2xl font-semibold">Work Experience</h3>
                        </div>
                        <ol className="space-y-10">
                            {EXPERIENCE.map((item, i) => (
                                <ExperienceCard key={i} item={item} icon={Briefcase} index={i} />
                            ))}
                        </ol>
                    </div>

                    {/* Leadership */}
                    {LEADERSHIP && LEADERSHIP.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-8 mt-16">
                                <Users className="text-blue-400" size={24} />
                                <h3 className="text-2xl font-semibold">Leadership & Community</h3>
                            </div>
                            <ol className="space-y-10">
                                {LEADERSHIP.map((item, i) => (
                                    <ExperienceCard key={i} item={item} icon={Users} index={i} />
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
