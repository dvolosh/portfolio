import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlowBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10">
      <motion.div style={{ x, y }} className="absolute -inset-20 rounded-full blur-3xl" aria-hidden>
        <div className="absolute left-[-10%] top-[-15%] w-[38vw] h-[38vw] rounded-full bg-blue-500/30 blur-[90px]" />
        <div className="absolute right-[-12%] bottom-[-18%] w-[42vw] h-[42vw] rounded-full bg-blue-400/50 blur-[110px] opacity-30" />
      </motion.div>
    </div>
  );
}
