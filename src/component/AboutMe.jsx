import { useRef } from "react";
import { useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import MotionCounter from "./MotionCounter";
import { HOME_PAGE_DEFAULTS } from "../data/homepageContent";

export default function AboutMe({ content = HOME_PAGE_DEFAULTS.about }) {
  let statsRef = useRef(null);
  let isInView = useInView(statsRef, { once: false, amount: 0.4 });

  return (
    <section
      id="about"
      className="relative min-h-screen font-sans overflow-hidden flex flex-col px-8 md:px-14 pt-24 pb-14"
      style={{ background: "#000000" }}
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute" style={{ width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", top: "10%", left: "30%", transform: "translate(-50%, -10%)" }} />
      <div className="pointer-events-none absolute" style={{ width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)", bottom: "5%", right: "10%" }} />

      {/* Vertical ABOUT label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pr-4">
        <div className="w-px h-24 bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          ABOUT
        </span>
      </div>

      {/* Eyebrow */}
      <div className="mb-10">
        <p className="text-[13px] font-medium tracking-widest uppercase text-white/40">
          {content.eyebrow}
        </p>
      </div>

      {/* Main grid */}
      <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-between h-full">
          <h2 className="font-bold uppercase leading-[0.9] tracking-tighter text-white mb-10" style={{ fontSize: "clamp(52px, 9vw, 130px)" }}>
            {content.heading}{" "}
            <span style={{ color: "#4ade80" }}>{content.accentHeading}</span>{" "}
            {content.trailingHeading}
          </h2>

          <p className="text-[15px] text-white/55 leading-relaxed max-w-md mb-10">
            {content.description}
          </p>

          {/* <button className="self-start flex items-center text-[15px] font-medium rounded-full overflow-hidden group mb-10" style={{ background: "#4ade80", color: "#0a0a0a" }}>
            <span className="px-6 py-3.5">View my work</span>
            <span className="px-4 py-3.5 flex items-center self-stretch transition-colors" style={{ background: "rgba(0,0,0,0.12)" }}>
              <FiArrowUpRight size={18} />
            </span>
          </button> */}

          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-[12px] rounded-full px-3 py-1.5 cursor-default" style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#4ade80" }} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Value card */}
        <div className="w-full lg:w-80 rounded-2xl overflow-hidden flex flex-col shrink-0" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h3 className="text-white text-[14px] font-medium tracking-wide">The Value Provided</h3>
            <FiArrowUpRight size={16} className="text-white/30" />
          </div>

          <div className="mx-4 rounded-xl overflow-hidden" style={{ height: "220px", background: "#0d0d1a" }}>
            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80" alt="Developer at work" className="w-full h-full object-cover" style={{ opacity: 0.75, mixBlendMode: "luminosity" }} />
          </div>

          <div className="px-5 py-5 flex-1">
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              I combine design systems, rapid prototyping, and real-world
              user research to deliver products that scale. Every project
              is built with performance and clarity in mind.
            </p>
          </div>

          {/* ✅ statsRef attached here — this is what useInView watches */}
          <div
            ref={statsRef}
            className="flex border-t px-5 py-4 gap-6"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {content.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="contents">
                {index > 0 && (
                  <div className="w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                )}
                <div>
                  <p className="text-[28px] font-bold leading-none" style={{ color: "#4ade80" }}>
                    <MotionCounter key={`${stat.value}-${stat.label}`} value={stat.value} isInView={isInView} />
                    {stat.suffix}
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between mt-16 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex flex-col gap-1">
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>E abrahamfred123@gmail.com</p>
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>T +234 912 124 9422</p>
        </div>
        <div className="flex gap-5">
          {["/ Twitter (X)", "/ LinkedIn", "/ GitHub", "/ CodePen"].map((s) => (
            <a key={s} href="#" className="text-[13px] transition-colors" style={{ color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={e => e.target.style.color = "#4ade80"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}