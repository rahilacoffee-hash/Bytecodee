import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiStar } from "react-icons/fi";
import { HOME_PAGE_DEFAULTS } from "../data/homepageContent";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Rahila Coffee",
    quote:
      "Bytecode rebuilt our entire storefront from scratch. The checkout flow alone cut our cart abandonment in half. Communication was clear at every step.",
    rating: 5,
    color: "#4ade80",
  },
  {
    name: "Daniel Okafor",
    role: "CEO, Bigbites Grills",
    quote:
      "We needed Paystack integrated fast and bug-free. Bytecode delivered a full admin dashboard with five modules ahead of schedule. Genuinely impressive turnaround.",
    rating: 5,
    color: "#a78bfa",
  },
  {
    name: " Glory Judah Garuba ",
    role: "Backend developer Lead, LearnOva AI",
    quote:
      "The AI chat and quiz generation features just worked. Bytecode understood the product vision immediately and translated it into a polished, fast experience.",
    rating: 5,
    color: "#fb923c",
  },
  {
    name: "James Whitfield",
    role: "Founder, Eco Homes Concept",
    quote:
      "Professional, responsive, and detail-oriented. Our construction site looks modern and loads instantly. Would hire again without hesitation.",
    rating: 5,
    color: "#22d3ee",
  },
  {
    name: "Tunde Bakare",
    role: "Marketing Director, Tailored",
    quote:
      "The animated loader and AI chat widget gave our brand a premium feel. Bytecode iterated quickly on feedback and never missed a deadline.",
    rating: 5,
    color: "#4ade80",
  },
];

export default function Testimonials({ content = HOME_PAGE_DEFAULTS.testimonials }) {
  let sectionRef = useRef(null);
  let isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  let [active, setActive] = useState(0);
  const displayedTestimonials = content.items || testimonials;
  const activeIndex = Math.min(active, displayedTestimonials.length - 1);

  function next() {
    setActive((activeIndex + 1) % displayedTestimonials.length);
  }
  function prev() {
    setActive((activeIndex - 1 + displayedTestimonials.length) % displayedTestimonials.length);
  }

  let t = displayedTestimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen font-sans overflow-hidden flex flex-col px-8 md:px-14 pt-24 pb-14"
      style={{ background: "#000" }}
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(132,0,255,0.07) 0%, transparent 70%)", top: "10%", right: "8%" }} />
      <div className="pointer-events-none absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)", bottom: "15%", left: "5%" }} />

      {/* Vertical label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pr-4" style={{ zIndex: 2 }}>
        <div className="w-px h-24 bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          SAY
        </span>
      </div>

      {/* Eyebrow */}
      <p className="text-[13px] font-medium tracking-widest uppercase text-white/40 mb-6">
        {content.eyebrow}
      </p>

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <h2 className="font-bold uppercase leading-[0.9] tracking-tighter text-white" style={{ fontSize: "clamp(52px, 9vw, 130px)" }}>
          <span style={{ color: "#4ade80" }}>{content.heading}</span>.
        </h2>
        <p className="text-[15px] text-white/45 leading-relaxed max-w-sm md:text-right pb-2">
          {content.intro}
        </p>
      </div>

      {/* MAIN — spotlight quote */}
      <div className="flex-1 flex flex-col lg:flex-row gap-12 items-start">

        {/* LEFT — Big quote card */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{
            borderRadius: 24,
            border: `1px solid ${t.color}30`,
            background: "rgba(255,255,255,0.02)",
            padding: "48px 40px",
            minHeight: 320,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.4s ease",
          }}
        >
          {/* Quote mark */}
          <div
            style={{
              fontSize: 90,
              lineHeight: 1,
              color: t.color,
              opacity: 0.15,
              fontFamily: "Georgia, serif",
              position: "absolute",
              top: 16,
              left: 32,
            }}
          >
            "
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-6 relative z-10">
            {Array.from({ length: t.rating }).map((_, i) => (
              <FiStar key={i} size={16} style={{ color: t.color, fill: t.color }} />
            ))}
          </div>

          {/* Quote text */}
          <p
            className="relative z-10"
            style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.5, color: "#fff", fontWeight: 300, marginBottom: 32 }}
          >
            {t.quote}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 relative z-10">
      
            <div>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{t.name}</p>
              <p style={{ color: t.color, fontSize: 12, fontWeight: 500 }}>{t.role}</p>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2 absolute bottom-10 right-10 z-10">
            <button
              onClick={prev}
              style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.background = t.color + "20"; e.currentTarget.style.color = t.color; e.currentTarget.style.borderColor = t.color + "40"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <FiArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.background = t.color + "20"; e.currentTarget.style.color = t.color; e.currentTarget.style.borderColor = t.color + "40"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT — testimonial list / picker */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3">
          {displayedTestimonials.map((item, i) => (
            <button
              key={item.id || item.name}
              onClick={() => setActive(i)}
              className="flex items-center gap-3 text-left transition-all"
              style={{
                borderRadius: 14,
                padding: "12px 14px",
                background: i === active ? "rgba(255,255,255,0.04)" : "transparent",
                border: `1px solid ${i === activeIndex ? item.color + "35" : "rgba(255,255,255,0.06)"}`,
              }}
            >
          
              <div style={{ opacity: i === activeIndex ? 1 : 0.45, transition: "opacity 0.3s ease" }}>
                <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{item.name}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{item.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row */}
     
    </section>
  );
}