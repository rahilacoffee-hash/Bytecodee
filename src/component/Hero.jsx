import { useEffect, useRef, useState } from "react";

const STAGES = [
  {
    id: "intro",
    image: "/heroimg/image.png",
    fallback:
      "linear-gradient(180deg, #050816 0%, #0b1020 50%, #111827 100%)",
    title: "BYTECODE",
    line: "Digital experiences engineered with purpose.",
    kind: "brand",
  },

  {
    id: "studio",
    image: "/heroimg/image2.png",
    fallback:
      "linear-gradient(180deg, #0b1020 0%, #111827 50%, #1e293b 100%)",
    title: "We build for the web",
    line: "Modern interfaces, powerful systems, and experiences that feel alive.",
    kind: "text",
  },

  {
    id: "engineering",
    image: "/heroimg/image3.png",
    fallback:
      "linear-gradient(180deg, #111827 0%, #172554 55%, #050816 100%)",
    title: "Design meets engineering",
    line: "From the first interaction to the backend behind it — every detail is intentional.",
    kind: "text",
  },

   {
    id: "work",
    image: "/heroimg/image4.png",
    fallback:
      "linear-gradient(180deg, #050816 0%, #0f172a 55%, #020617 100%)",
    title: "Built to stand out",
    line: "Websites, platforms, and digital products crafted for ambitious brands.",
    kind: "work",
  },

  {
    id: "cta",
    image: "/heroimg/image5.png",
    fallback:
      "linear-gradient(180deg, #020617 0%, #0b1020 60%, #050816 100%)",
    title: "Let's build something",
    line: "Have an idea? Let's turn it into a digital experience.",
    kind: "cta",
  },

 
];

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));

export default function ChesneyHero() {
  const wrapRef = useRef(null);

  const [pos, setPos] = useState(0);
  const [solidHeader, setSolidHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      const scrollable = Math.max(
        el.offsetHeight - window.innerHeight,
        1
      );

      const p = clamp(-rect.top / scrollable);

      setPos(p * (STAGES.length - 1));

      setSolidHeader(rect.bottom < 72);
    };

    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="ch-hero"
      aria-label="BYTECODE digital studio"
    >
      <div className="ch-pin">
        {STAGES.map((s, i) => {
          const d = pos - i;

          const imgOpacity = clamp(1 - Math.abs(d));

          const txtOpacity = clamp(1 - Math.abs(d) * 2.2);

          const scale = 1.05 + d * 0.06;

          /*
           * The CTA remains interactive while it is
           * visibly on screen.
           */
          const isActive = Math.abs(d) < 0.45;

          const isCTA = s.kind === "cta";
          const isInteractive = isCTA ? txtOpacity > 0.1 : isActive;

          return (
            <div
              key={s.id}
              className={`ch-stage ${
                isInteractive ? "ch-stage-active" : ""
              }`}
              aria-hidden={!isInteractive}
              style={{
                pointerEvents: isInteractive ? "auto" : "none",
                zIndex: isInteractive ? 10 : 1,
              }}
            >
              {/* IMAGE */}
              <div
                className="ch-img"
                style={{
                  opacity: imgOpacity,
                  transform: `scale(${scale})`,
                  backgroundImage: s.image
                    ? `url("${s.image}")`
                    : s.fallback,
                }}
              />

              {/* DARK OVERLAY */}
              <div
                className="ch-scrim"
                style={{
                  opacity: imgOpacity,
                }}
              />

              {/* CONTENT */}
              <div
                className={`ch-copy ch-${s.kind}`}
                style={{
                  opacity: txtOpacity,
                  transform: `translateY(${d * -18}px)`,

                  /*
                   * Important:
                   * CTA gets pointer events while visible.
                   */
                  pointerEvents:
                    isInteractive && (isCTA || txtOpacity > 0.6)
                      ? "auto"
                      : "none",
                }}
              >
                {s.kind === "crest" && <Crest />}

                <h1 className="ch-title">{s.title}</h1>

                {s.line && (
                  <p className="ch-line">{s.line}</p>
                )}

                {s.kind === "cta" && (
                  <div className="ch-actions">
    <a
      className="ch-btn ch-btn-fill"
      href="#pricing"
      onClick={(e) => e.stopPropagation()}
    >
      Start a project
    </a>

    <a
      className="ch-btn ch-btn-line"
      href="#project"
      onClick={(e) => e.stopPropagation()}
    >
      Explore our work
    </a>
  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* SCROLL HINT */}
        <div
          className="ch-hint"
          style={{
            opacity: clamp(1 - pos * 4),
          }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}

function Crest() {
  return (
    <svg
      className="ch-crest"
      viewBox="0 0 80 80"
      width="72"
      height="72"
      aria-hidden="true"
    >
      <circle
        cx="40"
        cy="40"
        r="34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />

      <circle
        cx="40"
        cy="40"
        r="28"
        fill="none"
        stroke="currentColorx"
        strokeWidth="0.6"
      />

      <text
        x="40"
        y="51"
        textAnchor="middle"
        fontSize="32"
        fill="currentColor"
        fontFamily="Poiret One, serif"
      >
        B
      </text>
    </svg>
  );
}