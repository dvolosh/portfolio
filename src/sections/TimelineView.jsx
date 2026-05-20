import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Users } from "lucide-react";

/* ── helpers ── */
function parseDate(str) {
  if (!str) return new Date();
  const [y, m] = str.split("-").map(Number);
  return new Date(y, m - 1);
}

function formatMonth(date) {
  return date.toLocaleString("en-US", { month: "short" });
}

function monthDiff(a, b) {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}

/* ── Tooltip ── */
function Tooltip({ item, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.15 }}
      className="timeline-tooltip"
      style={style}
    >
      <div className="font-semibold text-sm leading-tight">{item.role}</div>
      <div className="text-white/70 text-xs mt-0.5">{item.org}</div>
      <div className="text-white/50 text-[11px] mt-0.5">{item.period}</div>
      {item.bullets && item.bullets.length > 0 && (
        <ul className="mt-2 space-y-1 text-[11px] text-white/80 list-disc pl-3.5">
          {item.bullets.map((b, i) => (
            <li key={i} className="leading-snug">{b}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ── Single timeline bar ── */
function TimelineBar({ item, leftPct, widthPct, isPresent, rowIndex }) {
  const [hovered, setHovered] = useState(false);
  const color = item.color || "#3b82f6";

  return (
    <div className="relative" style={{ height: "100%" }}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: rowIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 h-full origin-left"
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      >
        <div
          className="timeline-bar group relative h-full flex items-center px-3 cursor-pointer"
          style={{
            backgroundColor: `${color}25`,
            borderColor: `${color}60`,
            boxShadow: hovered ? `0 0 20px ${color}30, inset 0 0 12px ${color}15` : "none",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Colour accent line at top */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg"
            style={{ backgroundColor: color }}
          />

          {/* Label (only show if bar is wide enough) */}
          {widthPct > 8 && (
            <span className="text-[11px] sm:text-xs text-white/90 font-medium truncate whitespace-nowrap pointer-events-none select-none">
              {item.role}
            </span>
          )}

          {/* Present pulse indicator */}
          {isPresent && (
            <div className="absolute right-0 top-0 bottom-0 flex items-center">
              <div
                className="timeline-pulse w-2.5 h-2.5 rounded-full mr-1"
                style={{ backgroundColor: color }}
              />
            </div>
          )}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <Tooltip
              item={item}
              style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, marginTop: 6 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ── Mobile card for vertical timeline ── */
function MobileTimelineCard({ item, index }) {
  const color = item.color || "#3b82f6";
  const isPresent = !item.endDate;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative pl-6 pb-6 last:pb-0"
    >
      {/* Vertical line */}
      <div
        className="absolute left-[7px] top-3 bottom-0 w-[2px]"
        style={{ backgroundColor: `${color}40` }}
      />
      {/* Dot */}
      <div
        className="absolute left-0 top-[6px] w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: color,
          backgroundColor: `${color}30`,
        }}
      >
        {isPresent && (
          <div
            className="timeline-pulse w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </div>

      <div
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: `${color}10`,
          borderColor: `${color}35`,
        }}
      >
        <div className="flex items-start gap-3">
          <img
            src={item.logo}
            alt={`${item.org} logo`}
            className="w-8 h-8 object-contain rounded-md flex-shrink-0 mt-0.5"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="font-semibold text-sm leading-tight">{item.role}</div>
            <div className="text-white/70 text-xs mt-0.5">{item.org}</div>
            <div className="text-white/50 text-[11px] mt-0.5">{item.period}</div>
          </div>
        </div>
        {item.bullets && item.bullets.length > 0 && (
          <ul className="mt-2.5 space-y-1 text-[11px] text-white/75 list-disc pl-4">
            {item.bullets.slice(0, 2).map((b, i) => (
              <li key={i} className="leading-snug">{b}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main TimelineView ── */
export default function TimelineView({ experienceItems, leadershipItems }) {
  const allItems = useMemo(() => {
    const exp = experienceItems.map((e) => ({ ...e, category: "experience" }));
    const lead = leadershipItems.map((e) => ({ ...e, category: "leadership" }));
    return [...exp, ...lead];
  }, [experienceItems, leadershipItems]);

  /* Compute timeline range */
  const { minDate, maxDate, totalMonths, monthMarkers } = useMemo(() => {
    const now = new Date();
    let earliest = now;
    let latest = now;

    allItems.forEach((item) => {
      const s = parseDate(item.startDate);
      const e = item.endDate ? parseDate(item.endDate) : now;
      if (s < earliest) earliest = s;
      if (e > latest) latest = e;
    });

    // Pad by 1 month on each side
    const min = new Date(earliest.getFullYear(), earliest.getMonth() - 1);
    const max = new Date(latest.getFullYear(), latest.getMonth() + 2);
    const total = monthDiff(min, max);

    // Build month markers (show every 3 months for clarity)
    const markers = [];
    for (let i = 0; i <= total; i++) {
      const d = new Date(min.getFullYear(), min.getMonth() + i);
      markers.push(d);
    }

    return { minDate: min, maxDate: max, totalMonths: total, monthMarkers: markers };
  }, [allItems]);

  function getBarPosition(item) {
    const s = parseDate(item.startDate);
    const e = item.endDate ? parseDate(item.endDate) : new Date();
    const leftMonths = monthDiff(minDate, s);
    const widthMonths = Math.max(monthDiff(s, e), 1);
    return {
      leftPct: (leftMonths / totalMonths) * 100,
      widthPct: (widthMonths / totalMonths) * 100,
    };
  }

  const experienceRows = allItems.filter((i) => i.category === "experience");
  const leadershipRows = allItems.filter((i) => i.category === "leadership");

  // Sort by start date (earliest first)
  experienceRows.sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
  leadershipRows.sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));

  const allSorted = [...experienceRows, ...leadershipRows];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Desktop Gantt ── */}
      <div className="hidden md:block rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
        {/* Time axis header */}
        <div className="relative h-8 mb-2 ml-[180px]">
          {monthMarkers.map((date, i) => {
            const pct = (i / totalMonths) * 100;
            const isJan = date.getMonth() === 0;
            const showLabel = isJan || i % 3 === 0;
            return (
              <div
                key={i}
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
              >
                {showLabel && (
                  <span className={`text-[10px] whitespace-nowrap ${isJan ? "text-white/70 font-medium" : "text-white/40"}`}>
                    {isJan ? date.getFullYear() : formatMonth(date)}
                  </span>
                )}
                <div
                  className={`mt-1 w-px ${isJan ? "h-3 bg-white/25" : "h-2 bg-white/10"}`}
                />
              </div>
            );
          })}
        </div>

        {/* Experience section */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Briefcase className="text-blue-400" size={16} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Experience</span>
        </div>

        {experienceRows.map((item, i) => {
          const { leftPct, widthPct } = getBarPosition(item);
          return (
            <div key={`exp-${i}`} className="flex items-center mb-2" style={{ height: 36 }}>
              {/* Label */}
              <div className="w-[180px] flex-shrink-0 pr-3 flex items-center gap-2">
                <img
                  src={item.logo}
                  alt={item.org}
                  className="w-5 h-5 object-contain rounded-sm flex-shrink-0"
                  loading="lazy"
                />
                <span className="text-[11px] text-white/70 truncate">{item.org}</span>
              </div>
              {/* Bar container */}
              <div className="flex-1 relative" style={{ height: 28 }}>
                <TimelineBar
                  item={item}
                  leftPct={leftPct}
                  widthPct={widthPct}
                  isPresent={!item.endDate}
                  rowIndex={i}
                />
              </div>
            </div>
          );
        })}

        {/* Divider */}
        <div className="border-t border-white/10 my-4" />

        {/* Leadership section */}
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-blue-400" size={16} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Leadership & Community</span>
        </div>

        {leadershipRows.map((item, i) => {
          const { leftPct, widthPct } = getBarPosition(item);
          return (
            <div key={`lead-${i}`} className="flex items-center mb-2" style={{ height: 36 }}>
              <div className="w-[180px] flex-shrink-0 pr-3 flex items-center gap-2">
                <img
                  src={item.logo}
                  alt={item.org}
                  className="w-5 h-5 object-contain rounded-sm flex-shrink-0"
                  loading="lazy"
                />
                <span className="text-[11px] text-white/70 truncate">{item.org}</span>
              </div>
              <div className="flex-1 relative" style={{ height: 28 }}>
                <TimelineBar
                  item={item}
                  leftPct={leftPct}
                  widthPct={widthPct}
                  isPresent={!item.endDate}
                  rowIndex={experienceRows.length + i}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile vertical timeline ── */}
      <div className="md:hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-5 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="text-blue-400" size={16} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Experience</span>
        </div>
        {experienceRows.map((item, i) => (
          <MobileTimelineCard key={`m-exp-${i}`} item={item} index={i} />
        ))}

        <div className="border-t border-white/10 my-5" />

        <div className="flex items-center gap-2 mb-4">
          <Users className="text-blue-400" size={16} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Leadership & Community</span>
        </div>
        {leadershipRows.map((item, i) => (
          <MobileTimelineCard key={`m-lead-${i}`} item={item} index={experienceRows.length + i} />
        ))}
      </div>
    </motion.div>
  );
}
