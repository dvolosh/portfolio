// src/App.jsx
import React from "react";
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import ExperienceSection from "./sections/Experience";
import SkillsSection from "./sections/Skills";
import WorkSection from "./sections/Work";
import LiquidEther from "./components/LiquidEther"; // ⬅️ import it
import "./index.css";

export default function App() {
  return (
    <>
      {/* Full-site background (behind everything) */}
      <div className="fixed inset-0 -z-10">
        <LiquidEther
          style={{ width: "100%", height: "100%" }}
          colors={["#039EFB", "#027DFA", "#0262F7", "#010DA8"]} // matches your new palette
          resolution={0.45}
          dt={0.014}
          BFECC
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          className="pointer-events-none"
          // the following only matter if you remove pointer-events-none
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          isBounce={false}
        />
      </div>

      {/* Foreground content */}
      <div className="min-h-screen text-white">
        {/* optional: subtle readability veil over the canvas */}
        {/* <div className="fixed inset-0 -z-5 bg-black/30" /> */}

        <Navbar />
        <Hero />
        <ExperienceSection />
        <SkillsSection />
        <WorkSection />
      </div>
    </>
  );
}
