import React from "react";
import { FileDown, MapPin, Mail } from "lucide-react";
import { ME } from "../content/data";
import GlowBackground from "./shared/GlowBackground";
import GradientText from "../components/GradientText";
import AvatarGlow from "../components/AvatarGlow";


export default function Hero() {
  return (
    <section id="home" className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="-z-10">
        <GlowBackground />
      </div>

      <div className="container-page w-full grid md:grid-cols-2 gap-10 items-center py-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center md:text-left mb-2">
            <GradientText
              colors={["#9EEEF7", "#3BE3F5", "#25B6F5", "#039EFB", "#027DFA", "#0262F7", "#0252F0"]}
              animationSpeed={6}
            >
              Davyd Voloshyn
            </GradientText>
          </h1>

          <p className="mt-1 text-center md:text-left text-blue-300/90 text-lg sm:text-xl font-medium">
            {ME.tagline}
          </p>
          <p className="mt-5 text-[15px] leading-7 text-white/80 max-w-prose mx-auto md:mx-0">
            {ME.blurb}
          </p>

          <div className="mt-7 flex items-center gap-3 flex-wrap">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium shadow-[0_0_24px_2px_rgba(59,130,246,0.35)] hover:shadow-[0_0_80px_16px_rgba(30,58,138,0.25)] transition-shadow"
            >
              Resume <FileDown size={16} />
            </a>
            <span className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 px-4 py-2 hover:bg-black/60">
              <MapPin size={16} /> {ME.location}
            </span>
            <a
              href={`mailto:${ME.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 px-4 py-2 hover:bg-black/60"
            >
              <Mail size={16} /> {ME.email}
            </a>
            {ME.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 px-4 py-2 hover:bg-black/60"
              >
                <s.icon size={16} /> {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <AvatarGlow
            src="/picture.jpg"
            alt="Davyd Voloshyn"
            className="w-72 h-72 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
