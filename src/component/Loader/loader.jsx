import { useState, useEffect, useRef } from "react";

export default function Loader({ onComplete }) {
  let [progress, setProgress] = useState(0);
  let [visible, setVisible] = useState(true);
  let [statusText, setStatusText] = useState("Approaching BYTECODE HQ");
  let rafRef = useRef(null);
  let targetRef = useRef(0);

  // ── REAL browser load tracking ──────────────────────────────────────────────
  useEffect(() => {
    function collectResources() {
      let imgs = Array.from(document.images);
      let scripts = Array.from(document.scripts).filter(s => s.src);
      let links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return [...imgs, ...scripts, ...links];
    }
    function updateTarget() {
      let resources = collectResources();
      let total = resources.length || 1;
      let loadedCount = resources.filter(r => (r.tagName === "IMG" ? r.complete : true)).length;
      targetRef.current = Math.min(99, (loadedCount / total) * 100);
    }
    updateTarget();
    let imgs = Array.from(document.images);
    imgs.forEach(img => {
      if (!img.complete) {
        img.addEventListener("load", updateTarget);
        img.addEventListener("error", updateTarget);
      }
    });
    function onFullyLoaded() { targetRef.current = 100; }
    if (document.readyState === "complete") onFullyLoaded();
    else {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") targetRef.current = Math.max(targetRef.current, 70);
        if (document.readyState === "complete") onFullyLoaded();
      });
      window.addEventListener("load", onFullyLoaded);
    }
    let perfInterval = setInterval(() => {
      let nav = performance.getEntriesByType?.("navigation")?.[0];
      if (nav?.loadEventEnd > 0) targetRef.current = 100;
      else if (nav?.domContentLoadedEventEnd > 0) targetRef.current = Math.max(targetRef.current, 75);
    }, 150);
    function tick() {
      setProgress(prev => {
        let target = targetRef.current;
        let next = prev + (target - prev) * 0.06;
        if (target >= 100 && next > 99.3) next = 100;
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(perfInterval);
      window.removeEventListener("load", onFullyLoaded);
      imgs.forEach(img => { img.removeEventListener("load", updateTarget); img.removeEventListener("error", updateTarget); });
    };
  }, []);

  // ── Narrative scenes driven by real progress ────────────────────────────────
  // Scene 1 (0–30%):  walking toward the building, outside
  // Scene 2 (30–60%): entering / walking through the office
  // Scene 3 (60–100%): sits at desk, meets you, screen lights up
  let scene = progress < 30 ? 1 : progress < 60 ? 2 : 3;

  useEffect(() => {
    if (scene === 1) setStatusText("Approaching BYTECODE HQ");
    else if (scene === 2) setStatusText("Walking in");
    else if (progress < 92) setStatusText("Taking a seat");
    else if (progress < 100) setStatusText("Say hello");
    else setStatusText("Welcome");
  }, [scene, progress]);

  useEffect(() => {
    if (progress >= 99.9) {
      let t = setTimeout(() => { setVisible(false); onComplete?.(); }, 600);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  if (!visible) return null;

  // walk progress within scene 1/2 (0→1)
  let walkT = scene === 1 ? Math.min(1, progress / 30) : 1;
  let doorT = scene === 2 ? Math.min(1, (progress - 30) / 30) : scene === 3 ? 1 : 0;
  let seated = scene === 3;
  let typing = scene === 3 && progress > 75 && progress < 96;
  let meeting = progress >= 96;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999, background: "#000",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: progress >= 99.9 ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: progress >= 99.9 ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes loader-walk-bob   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes loader-leg-l      { 0%,100% { transform: rotate(18deg); } 50% { transform: rotate(-18deg); } }
        @keyframes loader-leg-r      { 0%,100% { transform: rotate(-18deg); } 50% { transform: rotate(18deg); } }
        @keyframes loader-arm-l      { 0%,100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
        @keyframes loader-arm-r      { 0%,100% { transform: rotate(14deg); } 50% { transform: rotate(-14deg); } }
        @keyframes loader-type-l     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes loader-type-r     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(2px); } }
        @keyframes loader-blink      { 0%,90%,100% { opacity: 1; } 95% { opacity: 0; } }
        @keyframes loader-glow-pulse { 0%,100% { opacity:.5; } 50% { opacity:1; } }
        @keyframes loader-wave       { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-20deg); } 75% { transform: rotate(20deg); } }
        @keyframes loader-fadein     { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }
        @keyframes loader-window-flicker { 0%,100%{opacity:.85} 50%{opacity:1} }
      `}</style>

      {/* ── STAGE ─────────────────────────────────────────────────────────────── */}
      <svg width="320" height="190" viewBox="0 0 320 190" style={{ marginBottom: 24 }}>

        {/* ═══ BUILDING (always visible, recedes/scene changes) ═══════════════ */}
        <g opacity={scene === 3 ? 0.25 : 1} style={{ transition: "opacity 0.6s ease" }}>
          {/* Building body */}
          <rect x="150" y="20" width="120" height="140" fill="#0e0e10" stroke="#222" strokeWidth="1.5" />
          {/* Roof ledge */}
          <rect x="146" y="16" width="128" height="6" fill="#161618" />
          {/* Windows grid */}
          {[0,1,2,3].map(row => (
            [0,1,2].map(col => (
              <rect
                key={`${row}-${col}`}
                x={162 + col * 32}
                y={32 + row * 26}
                width="20" height="16" rx="1.5"
                fill={(row + col) % 3 === 0 ? "#4ade80" : "#151515"}
                opacity={(row + col) % 3 === 0 ? 0.55 : 1}
                style={(row + col) % 3 === 0 ? { animation: "loader-window-flicker 3s ease-in-out infinite" } : {}}
              />
            ))
          ))}
          {/* BYTECODE sign on building */}
          <rect x="160" y="118" width="100" height="14" fill="#000" />
          <text x="210" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80" letterSpacing="2" fontFamily="monospace">BYTECODE</text>

          {/* Door — opens as scene 2 progresses */}
          <rect x="195" y="132" width="30" height="28" fill="#000" />
          <rect
            x="195" y="132" width="15" height="28" fill="#1a1a1a" stroke="#2a2a2a"
            style={{ transformOrigin: "195px 132px", transform: `rotateY(${doorT * 70}deg)`, transition: "transform 0.3s ease" }}
          />
          {/* warm light glow from open doorway */}
          <rect x="197" y="134" width={26 * doorT} height="24" fill="#4ade80" opacity={0.15 * doorT} style={{ transition: "width 0.3s ease" }} />

          {/* Ground / pavement */}
          <rect x="0" y="160" width="320" height="6" fill="#161616" />
        </g>

        {/* ═══ SCENE 3: DESK (fades in, replaces building once inside) ════════ */}
        <g opacity={seated ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
          {/* Desk */}
          <rect x="80" y="128" width="160" height="8" rx="2" fill="#1a1a1a" />
          <rect x="90" y="136" width="8" height="20" fill="#151515" />
          <rect x="222" y="136" width="8" height="20" fill="#151515" />

          {/* Laptop */}
          <rect x="138" y="118" width="64" height="10" rx="2" fill="#181818" stroke="#2a2a2a" />
          <rect x="140" y="78" width="60" height="40" rx="3" fill="#0d0d0d" stroke="#2a2a2a" />
          <rect x="144" y="82" width="52" height="32" rx="1.5" fill="#000" />
          <rect x="148" y="87" width={typing ? "30" : "20"} height="2" fill="#4ade80" opacity="0.8" style={{ transition: "width .4s" }} />
          <rect x="148" y="92" width={typing ? "18" : "26"} height="2" fill="#4ade80" opacity="0.5" style={{ transition: "width .4s" }} />
          <rect x="148" y="97" width={typing ? "36" : "14"} height="2" fill="rgba(132,0,255,0.8)" style={{ transition: "width .4s" }} />
          <rect x="148" y="102" width={typing ? "14" : "32"} height="2" fill="#4ade80" opacity="0.4" style={{ transition: "width .4s" }} />

          {/* Second chair (you) — appears once "meeting" */}
          <g opacity={meeting ? 1 : 0} style={{ transition: "opacity 0.5s ease" }}>
            <ellipse cx="262" cy="158" rx="22" ry="4" fill="#000" opacity="0.4" />
            <path d="M250 158 C250 138 256 124 266 124 C276 124 282 138 282 158 Z" fill="#16201b" />
            <circle cx="266" cy="112" r="13" fill="#caa173" />
            <path d="M254 116 C254 104 259 96 266 96 C273 96 278 104 278 116 L275 119 C273 109 270 104 266 104 C262 104 259 109 257 119 Z" fill="#0f1612" />
            {/* waving arm */}
            <g style={{ transformOrigin: "278px 124px", animation: meeting ? "loader-wave 1s ease-in-out 3" : "none" }}>
              <path d="M278 124 C284 120 288 112 288 105" stroke="#16201b" strokeWidth="8" strokeLinecap="round" fill="none" />
              <circle cx="289" cy="104" r="4" fill="#caa173" />
            </g>
          </g>

          {/* Ambient glow */}
          <ellipse cx="170" cy="118" rx="34" ry="6" fill="#4ade80" opacity="0.08" style={{ animation: "loader-glow-pulse 2.4s ease-in-out infinite" }} />
        </g>

        {/* ═══ WALKING CHARACTER (you) ══════════════════════════════════════════ */}
        <g
          style={{
            transform: seated
              ? "translate(170px, 0px)"
              : `translate(${20 + walkT * (doorT > 0 ? 180 + doorT * 0 : 155)}px, 0px)`,
            transition: scene === 3 ? "transform 0.6s ease" : "none",
          }}
          opacity={seated ? 0 : 1}
        >
          <g style={{ animation: scene !== 3 ? "loader-walk-bob 0.5s ease-in-out infinite" : "none" }}>
            {/* Shadow */}
            <ellipse cx="0" cy="160" rx="14" ry="3" fill="#000" opacity="0.4" />

            {/* Legs */}
            <g style={{ transformOrigin: "0px 145px", animation: scene !== 3 ? "loader-leg-l 0.5s ease-in-out infinite" : "none" }}>
              <rect x="-6" y="145" width="6" height="18" rx="2" fill="#222" />
            </g>
            <g style={{ transformOrigin: "0px 145px", animation: scene !== 3 ? "loader-leg-r 0.5s ease-in-out infinite" : "none" }}>
              <rect x="0" y="145" width="6" height="18" rx="2" fill="#1a1a1a" />
            </g>

            {/* Torso (hoodie) */}
            <path d="M-10 148 C-10 130 -6 118 0 118 C6 118 10 130 10 148 Z" fill="#1e2a24" />

            {/* Arms */}
            <g style={{ transformOrigin: "-8px 122px", animation: scene !== 3 ? "loader-arm-l 0.5s ease-in-out infinite" : "none" }}>
              <rect x="-12" y="122" width="5" height="16" rx="2.5" fill="#1e2a24" />
            </g>
            <g style={{ transformOrigin: "8px 122px", animation: scene !== 3 ? "loader-arm-r 0.5s ease-in-out infinite" : "none" }}>
              <rect x="7" y="122" width="5" height="16" rx="2.5" fill="#16201b" />
            </g>

            {/* Head */}
            <circle cx="0" cy="108" r="11" fill="#caa173" />
            {/* Hood */}
            <path d="M-10 112 C-10 100 -6 92 0 92 C6 92 10 100 10 112 L7 115 C6 104 3 99 0 99 C-3 99 -6 104 -7 115 Z" fill="#16201b" />
            {/* Glasses */}
            <rect x="-7" y="106" width="6" height="5" rx="1.2" fill="none" stroke="#111" strokeWidth="1.2" />
            <rect x="1" y="106" width="6" height="5" rx="1.2" fill="none" stroke="#111" strokeWidth="1.2" />
          </g>
        </g>

      </svg>

      {/* BYTECODE wordmark */}
      <div className="flex items-center gap-2 mb-4">
        <svg viewBox="0 0 36 36" fill="none" style={{ width: 16, height: 16 }}>
          <rect width="16" height="16" rx="3" fill="#4ade80" />
          <rect x="20" width="16" height="16" rx="3" fill="#4ade80" opacity="0.5" />
          <rect y="20" width="16" height="16" rx="3" fill="#4ade80" opacity="0.5" />
          <rect x="20" y="20" width="16" height="16" rx="3" fill="#4ade80" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em" }}>BYTECODE</span>
      </div>

      {/* Narrative status */}
      <p
        key={statusText}
        style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.04em", marginBottom: 20, minHeight: 18, animation: "loader-fadein 0.4s ease" }}
      >
        {statusText}<span style={{ animation: "loader-blink 1s infinite" }}>...</span>
      </p>

      {/* Progress bar */}
      <div style={{ width: "min(280px, 60vw)", height: 3, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 10 }}>
        <div style={{
          height: "100%", width: `${progress}%`, borderRadius: 99,
          background: "linear-gradient(90deg, #4ade80, rgba(132,0,255,0.9))",
          transition: "width 0.1s linear",
        }} />
      </div>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.05em" }}>
        {Math.floor(progress)}%
      </p>
    </div>
  );
}