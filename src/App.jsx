import React from "react";
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import Journey from "./sections/Journey";
import SkillsSection from "./sections/Skills";
import WorkSection from "./sections/Work";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import LiquidEther from "./components/LiquidEther";
import "./index.css";

export default function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <LiquidEther
          style={{ width: "100%", height: "100%" }}
          colors={["#039EFB", "#027DFA", "#0262F7", "#010DA8"]}
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
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          isBounce={false}
        />
      </div>

      <div className="min-h-screen text-white">
        <Navbar />
        <Hero />
        <Journey />
        <SkillsSection />
        <WorkSection />
        <Contact />
      </div>

      <Footer />
    </>
  );
}
