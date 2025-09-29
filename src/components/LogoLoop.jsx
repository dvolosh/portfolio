import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import "./LogoLoop.css";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };
const toCssLength = (v) => (typeof v === "number" ? `${v}px` : v ?? undefined);

const useResizeObserver = (callback, elements, deps) => {
  useEffect(() => {
    // Fallback if ResizeObserver is not available
    if (typeof window === "undefined") return;
    if (!("ResizeObserver" in window)) {
      const handle = () => callback();
      window.addEventListener("resize", handle);
      callback();
      return () => window.removeEventListener("resize", handle);
    }

    const observers = elements
      .map((ref) => {
        const el = ref && ref.current ? ref.current : null;
        if (!el) return null;
        const observer = new ResizeObserver(() => callback());
        observer.observe(el);
        return observer;
      })
      .filter(Boolean);

    callback();

    return () => {
      observers.forEach((o) => {
        try {
          o.disconnect();
        } catch {}
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useImageLoader = (seqRef, onLoad, deps) => {
  useEffect(() => {
    const root = seqRef.current;
    if (!root) {
      onLoad();
      return;
    }
    const images = root.querySelectorAll
      ? root.querySelectorAll("img")
      : [];

    if (!images || images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining <= 0) onLoad();
    };

    images.forEach((img) => {
      if (!img) return;
      if (img.complete) {
        done();
      } else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        if (!img) return;
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useAnimationLoop = (
  trackRef,
  targetVelocity,
  seqWidth,
  isHovered,
  pauseOnHover
) => {
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      const mod = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      offsetRef.current = mod;
      track.style.transform = `translate3d(${-mod}px,0,0)`;
    }

    const animate = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      if (seqWidth > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        try {
          track.style.transform = `translate3d(${-next}px,0,0)`;
        } catch {}
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor,
  scaleOnHover = true,
  ariaLabel = "Technology logos",
  className,
  style,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dirMul = direction === "left" ? 1 : -1;
    const sign = speed < 0 ? -1 : 1;
    return mag * dirMul * sign;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerEl = containerRef.current;
    const seqEl = seqRef.current;

    const containerWidth =
      containerEl && containerEl.clientWidth ? containerEl.clientWidth : 0;

    let sequenceWidth = 0;
    if (seqEl && seqEl.getBoundingClientRect) {
      const rect = seqEl.getBoundingClientRect();
      sequenceWidth = rect && rect.width ? Math.ceil(rect.width) : 0;
    }

    if (sequenceWidth > 0) {
      setSeqWidth(sequenceWidth);
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) +
        ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(
        Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded || 0)
      );
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [
    logos,
    gap,
    logoHeight,
  ]);

  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);

  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

  const cssVars = useMemo(
    () => ({
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : null),
    }),
    [gap, logoHeight, fadeOutColor]
  );

  const rootCls = useMemo(() => {
    const parts = ["logoloop"];
    if (fadeOut) parts.push("logoloop--fade");
    if (scaleOnHover) parts.push("logoloop--scale-hover");
    if (className) parts.push(className);
    return parts.join(" ");
  }, [fadeOut, scaleOnHover, className]);

  const onEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);
  const onLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  const renderLogoItem = useCallback((item, key) => {
    const isNode = Object.prototype.hasOwnProperty.call(item, "node");
    let content;
    if (isNode) {
      content = (
        <span
          className="logoloop__node"
          aria-hidden={!!item.href && !item.ariaLabel}
        >
          {item.node}
        </span>
      );
    } else {
      // image item mode (src/srcSet/etc.)
      const { alt, ...rest } = item || {};
      content = (
        <img
          {...rest}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
    }
    const label = isNode ? item.ariaLabel ?? item.title : item.alt ?? item.title;

    const inner = item.href ? (
      <a
        className="logoloop__link"
        href={item.href}
        aria-label={label || "logo link"}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ) : (
      content
    );

    return (
      <li className="logoloop__item" key={key} role="listitem">
        {inner}
      </li>
    );
  }, []);

  const lists = useMemo(() => {
    const copies = Math.max(ANIMATION_CONFIG.MIN_COPIES, copyCount || 0);
    return Array.from({ length: copies }, (_, i) => (
      <ul
        className="logoloop__list"
        key={`copy-${i}`}
        role="list"
        aria-hidden={i > 0}
        ref={i === 0 ? seqRef : undefined}
      >
        {(Array.isArray(logos) ? logos : []).map((item, j) =>
          renderLogoItem(item, `${i}-${j}`)
        )}
      </ul>
    ));
  }, [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo(
    () => ({
      width: toCssLength(width) ?? "100%",
      ...cssVars,
      ...(style || {}),
    }),
    [width, cssVars, style]
  );

  return (
    <div
      ref={containerRef}
      className={rootCls}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="logoloop__track" ref={trackRef}>
        {lists}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";
export default LogoLoop;
