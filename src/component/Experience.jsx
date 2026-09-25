
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { FiArrowUpRight, FiCode, FiLayers, FiServer, FiShield, FiSmartphone } from "react-icons/fi";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "BYTECODE",
    period: "2025 — Present",
    type: "Full-time",
    description: "Building and shipping client products end-to-end — from architecture to deployment. Clients span food delivery, fashion-tech, e-commerce, and AI SaaS.",
    achievements: [
      "Shipped 5+ production apps with MERN stack",
      "Integrated payment gateways — Stripe & Paystack",
      "Built AI-powered features using Groq & OpenAI APIs",
      "Deployed on Vercel, Render with CI/CD pipelines",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind", "Framer Motion"],
    icon: FiCode,
    color: "#4ade80",
  },
 
{
  role: "Node.js & Express – Backend Development",
  company: "OQVERA",
  period: "2025 — Present",
  type: "Full-time",
  description:
    "Building scalable REST APIs, authentication systems, and backend services using Node.js, Express, and modern database technologies.",
  achievements: [
    "Developed secure RESTful APIs with Express.js",
    "Implemented JWT authentication and role-based access control",
    "Integrated MongoDB and PostgreSQL for data management",
    "Optimized backend performance and API response times",
  ],
  tech: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "JWT",
    "REST API",
  ],
  icon: FiServer,
  color: "#22d3ee",
},
];

const skills = [
  { category: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Framer Motion", "MUI", "Three.js"] },
  { category: "Backend",  items: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT", ] },
  { category: "Tools",    items: ["Git", "Vercel", "Render", "Cloudinary", "Postman"] },
];

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ label, isInView, delay = 0 }) {
  let [width, setWidth] = useState(0);
  let pct = 70 + Math.floor(Math.random() * 25); // 70–95% range, stable per render

  useEffect(() => {
    if (isInView) {
      let t = setTimeout(() => setWidth(pct), delay);
      return () => clearTimeout(t);
    } else {
      setWidth(0);
    }
  }, [isInView]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{pct}%</span>
      </div>
      <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: width + "%",
            borderRadius: 99,
            background: "linear-gradient(90deg, #4ade80, rgba(132,0,255,0.8))",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Timeline dot ─────────────────────────────────────────────────────────────
function TimelineDot({ color, isActive }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 40, height: 40, flexShrink: 0 }}>
      {isActive && (
        <div
          className="absolute"
          style={{ width: 40, height: 40, borderRadius: "50%", background: color, opacity: 0.15, animation: "ping 2s ease-in-out infinite" }}
        />
      )}
      <div style={{ width: 14, height: 14, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}60`, flexShrink: 0 }} />
    </div>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExpCard({ exp, index, isInView }) {
  let [hovered, setHovered] = useState(false);
  let isActive = index === 0; // most recent = active

  return (
    <div
      className="flex gap-4 md:gap-8 group"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center" style={{ paddingTop: 4 }}>
        <TimelineDot color={exp.color} isActive={isActive} />
        {index < experiences.length - 1 && (
          <div style={{ width: 1, flex: 1, background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.02))", marginTop: 8 }} />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 20,
          border: `1px solid ${hovered ? exp.color + "40" : "rgba(255,255,255,0.07)"}`,
          background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
          padding: "24px 28px",
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 8px 32px ${exp.color}18` : "none",
          cursor: "default",
        }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: exp.color + "18", border: `1px solid ${exp.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <exp.icon size={16} style={{ color: exp.color }} />
            </div>
            <div>
              <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 17, lineHeight: 1.2, marginBottom: 2 }}>{exp.role}</h3>
              <p style={{ color: exp.color, fontSize: 13, fontWeight: 500 }}>{exp.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:items-end" style={{ flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>{exp.period}</span>
            <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 99, background: exp.color + "18", color: exp.color, border: `1px solid ${exp.color}25` }}>
              {exp.type}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>{exp.description}</p>

        {/* Achievements */}
        <ul className="flex flex-col gap-2 mb-5">
          {exp.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2.5" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: exp.color, marginTop: 6, flexShrink: 0 }} />
              {a}
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map(t => (
            <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Experience() {
  let sectionRef = useRef(null);
  let skillsRef = useRef(null);
  let isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  let skillsInView = useInView(skillsRef, { once: false, amount: 0.3 });

  // stable skill percentages (seeded per skill name)
  let skillPcts = useRef({});
  function getPct(label) {
    if (!skillPcts.current[label]) skillPcts.current[label] = 70 + ((label.length * 7) % 26);
    return skillPcts.current[label];
  }

  return (
    <section
      id="experience"
      className="relative min-h-screen font-sans overflow-hidden flex flex-col px-8 md:px-14 pt-24 pb-14"
      style={{ background: "#000" }}
    >
      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", top: "10%", left: "20%" }} />
      <div className="pointer-events-none absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(132,0,255,0.06) 0%, transparent 70%)", bottom: "15%", right: "5%" }} />

      {/* Vertical label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pr-4" style={{ zIndex: 2 }}>
        <div className="w-px h-24 bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>XP</span>
      </div>

      {/* Eyebrow */}
      <p className="text-[13px] font-medium tracking-widest uppercase text-white/40 mb-6">Where I've worked</p>

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <h2 className="font-bold uppercase leading-[0.9] tracking-tighter text-white" style={{ fontSize: "clamp(52px,9vw,130px)" }}>
          Exp<br /><span style={{ color: "#4ade80" }}>erience</span>.
        </h2>
        <p className="text-[15px] text-white/45 leading-relaxed max-w-sm md:text-right pb-2">
          1+ years building real products — from freelance client work to academic research and collaborative campus projects.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 flex-1">

        {/* LEFT — Timeline */}
        <div className="flex-1" ref={sectionRef}>
          {experiences.map((exp, i) => (
            <ExpCard key={i} exp={exp} index={i} isInView={isInView} />
          ))}
        </div>

        {/* RIGHT — Skills */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">

          {/* Sticky skills panel */}
          <div
            ref={skillsRef}
            style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", padding: "24px 24px", position: "sticky", top: 100 }}
          >
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 20 }}>
              Skills & Proficiency
            </h3>

            {skills.map((group) => (
              <div key={group.category} className="mb-6">
                <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>
                  {group.category}
                </p>
                <div className="flex flex-col gap-3">
                  {group.items.map((skill, i) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                      <span className="text-md font-semibold bg-gradient-to-r from-[#4ade80] via-[#4ade81] to-[rgba(132,0,255,0.8)] bg-clip-text text-transparent">
  {skill}
</span>
                      </div>
                   
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick stats */}
            <div className="flex gap-4 mt-2 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[["3+", "Years"], ["5+", "Projects"], ["98%", "Satisfaction"]].map(([num, label]) => (
                <div key={label} className="flex-1 text-center">
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#4ade80", lineHeight: 1 }}>{num}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4, letterSpacing: "0.06em" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        
        </div>

      </div>

      {/* Bottom border */}
      <div className="mt-14 pt-6 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="text-[13px] text-white/30">Open to new opportunities</p>
        <a href="#contact" style={{ fontSize: 13, color: "#4ade80", fontWeight: 500, textDecoration: "none" }}>
          Let's work together →
        </a>
      </div>
    </section>
  );
}