import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { HOME_PAGE_DEFAULTS } from "../data/homepageContent";

// ─── Project Data ────────────────────────────────────────────────────────────

const projects = [
  {
    label: "E-Commerce",
    title: "Rahila Coffee",
    description: "Full MERN e-commerce with Stripe payments, admin dashboard, cart, and mobile-responsive UI.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781789451/Screenshot_from_2026-06-18_14-29-58_zihuvg.png", // 
     github: "https://github.com/rahilacoffee-hash/rahila-coffee-frontend",
    live: "https://rahila-coffeeee-one.vercel.app/",
    
  },
   {
    label: "Company profile",
    title: "Ecohome concepts",
    description: "Full MERN website with admin dashbordd.",
    tech: ["React", "Node.js", "MongoDB", ],
    image: "https://res.cloudinary.com/dhiytc3gu/image/upload/v1784756813/Screenshot_2026-07-22_22-07-23_hyilyk.png", // 
     github: "https://github.com/rahilacoffee-hash/Ecohome-concept-s",
    live: "https://ecohome-concepts.vercel.app/",
    
  },
    {
    label: "E-Commerce/portfolio",
    title: "Liliums Glee",
    description: "Full MERN e-commerce with paystack payments, admin dashboard, cart, and mobile-responsive UI.",
    tech: ["React", "Node.js", "MongoDB", "paystack"],
    image: "https://res.cloudinary.com/dhiytc3gu/image/upload/v1784753998/Screenshot_2026-07-22_21-55-14_etvz1j.png", // 
     github: "https://github.com/rahilacoffee-hash/Liliums-glee",
    live: "https://liliums-glee.vercel.app//",
    
  },
  {
    label: "Food Delivery",
    title: "Bigbites Grills",
    description: "Food delivery platform with Paystack integration, JWT auth, OTP flow, and admin panel.",
    tech: ["React", "Express", "MongoDB", "Paystack"],
    image: "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781789932/Screenshot_from_2026-06-18_14-38-37_g0xail.png",
    github: "#",
    live: "#",
   
  },
  {
    label: "AI SaaS",
    title: "LearnOva AI",
    description: "AI-powered study assistant with quiz engine, flashcards, summaries, and chat interface.",
    tech: ["React", "Vite", "Node.js", "OpenAI"],
    image: "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781789847/Screenshot_from_2026-06-18_14-37-05_k42kyd.png",
  github: "https://github.com/rahilacoffee-hash/Learnova-AI",
    live: "https://leearnova-ai.vercel.app/",
  
  },

  {
    label: "Fashion Tech",
    title: "Tailored",
    description: "Marketing site for a Nigerian fashion-tech app with animated loader and Groq AI chat widget.",
    tech: ["React", "Framer Motion", "Groq API", "Vercel"],
    image: "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781790043/Screenshot_from_2026-06-18_14-39-58_xxeaja.png",
    github: "#",
    live: "#",
   
  },

];

// ─── Constants ────────────────────────────────────────────────────────────────
const GLOW_COLOR = "132, 0, 255";
const PARTICLE_COUNT = 10;
const SPOTLIGHT_RADIUS = 350;

// ─── Particle Card ────────────────────────────────────────────────────────────
function ParticleCard({ children, className = "", style, glowColor = GLOW_COLOR }) {
  let cardRef = useRef(null);
  let particlesRef = useRef([]);
  let timeoutsRef = useRef([]);
  let isHoveredRef = useRef(false);

  function spawnParticles() {
    if (!cardRef.current) return;
    let { width, height } = cardRef.current.getBoundingClientRect();

    Array.from({ length: PARTICLE_COUNT }).forEach((_, i) => {
      let id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        let el = document.createElement("div");
        el.style.cssText = `
          position:absolute; width:4px; height:4px; border-radius:50%;
          background:rgba(${glowColor},1); box-shadow:0 0 6px rgba(${glowColor},0.6);
          pointer-events:none; z-index:100;
          left:${Math.random() * width}px; top:${Math.random() * height}px;
        `;
        cardRef.current.appendChild(el);
        particlesRef.current.push(el);
        gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(el, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: "none", repeat: -1, yoyo: true });
        gsap.to(el, { opacity: 0.25, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(id);
    });
  }

  function clearParticles() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => p.parentNode?.removeChild(p) });
    });
    particlesRef.current = [];
  }

  useEffect(() => {
    let el = cardRef.current;
    if (!el) return;

    function onEnter() { isHoveredRef.current = true; spawnParticles(); }
    function onLeave() { isHoveredRef.current = false; clearParticles(); }
    function onMove(e) {
      let rect = el.getBoundingClientRect();
      let x = e.clientX - rect.left, y = e.clientY - rect.top;
      let cx = rect.width / 2, cy = rect.height / 2;
      gsap.to(el, { rotateX: ((y - cy) / cy) * -6, rotateY: ((x - cx) / cx) * 6, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
    }
    function onLeaveReset() {
      isHoveredRef.current = false; clearParticles();
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
    }

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeaveReset);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeaveReset);
      clearParticles();
    };
  }, []);

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
}

// ─── Global Spotlight ─────────────────────────────────────────────────────────
function GlobalSpotlight({ gridRef }) {
  useEffect(() => {
    let spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position:fixed; width:700px; height:700px; border-radius:50%; pointer-events:none;
      background: radial-gradient(circle, rgba(${GLOW_COLOR},0.13) 0%, rgba(${GLOW_COLOR},0.06) 20%, rgba(${GLOW_COLOR},0.02) 40%, transparent 65%);
      z-index:200; opacity:0; transform:translate(-50%,-50%); mix-blend-mode:screen;
    `;
    document.body.appendChild(spotlight);

    function onMove(e) {
      if (!gridRef.current) return;
      let rect = gridRef.current.getBoundingClientRect();
      let inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });

      if (!inside) { gsap.to(spotlight, { opacity: 0, duration: 0.4 }); return; }

      let cards = gridRef.current.querySelectorAll(".proj-card");
      let minDist = Infinity;

      cards.forEach(card => {
        let cr = card.getBoundingClientRect();
        let cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
        let dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
        minDist = Math.min(minDist, dist);
        let intensity = dist <= SPOTLIGHT_RADIUS * 0.5 ? 1 : dist <= SPOTLIGHT_RADIUS * 0.75 ? (SPOTLIGHT_RADIUS * 0.75 - dist) / (SPOTLIGHT_RADIUS * 0.25) : 0;
        let rx = ((e.clientX - cr.left) / cr.width) * 100;
        let ry = ((e.clientY - cr.top) / cr.height) * 100;
        card.style.setProperty("--glow-x", rx + "%");
        card.style.setProperty("--glow-y", ry + "%");
        card.style.setProperty("--glow-intensity", intensity.toString());
      });

      let targetOpacity = minDist <= SPOTLIGHT_RADIUS * 0.5 ? 0.85 : minDist <= SPOTLIGHT_RADIUS * 0.75 ? ((SPOTLIGHT_RADIUS * 0.75 - minDist) / (SPOTLIGHT_RADIUS * 0.25)) * 0.85 : 0;
      gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.15 : 0.4 });
    }

    document.addEventListener("mousemove", onMove);
    return () => { document.removeEventListener("mousemove", onMove); spotlight.parentNode?.removeChild(spotlight); };
  }, [gridRef]);

  return null;
}

// ─── Image Placeholder ────────────────────────────────────────────────────────
function ImageArea({ image, title, featured }) {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{
        height: featured ? "420px" : "260px",
        background: "linear-gradient(135deg, rgba(132,0,255,0.1) 0%, rgba(74,222,128,0.05) 60%, rgba(255,255,255,0.02) 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Subtle grid pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(132,0,255,0.12)", border: "1px solid rgba(132,0,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FiExternalLink size={18} style={{ color: "rgba(132,0,255,0.5)" }} />
          </div>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>Add Screenshot</p>
        </div>
      )}

      {/* Shimmer on hover */}
      <div className="proj-card-shimmer absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(132,0,255,0.08) 50%, transparent 60%)", transform: "translateX(-100%)", transition: "transform 0.6s ease" }} />
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, featured }) {
  return (
    <ParticleCard
      className={`proj-card group flex flex-col ${featured ? "proj-card-featured" : ""}`}
      style={{
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#0d0d0d",
        "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": "0",
      }}
    >
      {/* Image */}
      <ImageArea image={project.image} title={project.title} featured={featured} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between mb-3">
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999, background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.18)" }}>
            {project.label}
          </span>
          <div className="flex gap-1.5">
            {[{ href: project.github, Icon: FiGithub, hoverColor: "#fff" }, { href: project.live, Icon: FiArrowUpRight, hoverColor: "#4ade80" }].map(({ href, Icon, hoverColor }, i) => (
              <a key={i} href={href}
                style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 16, marginBottom: 6, lineHeight: 1.3 }}>{project.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.4)", flex: 1 }}>{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 999, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.32)", border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
          ))}
        </div>
      </div>
    </ParticleCard>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export default function Projects({ content = HOME_PAGE_DEFAULTS.projects }) {
  let gridRef = useRef(null);
  const displayedProjects = content.items || projects;

  return (
    <section
      id="project"
      className="relative min-h-screen font-sans overflow-hidden flex flex-col px-8 md:px-14 pt-24 pb-14"
      style={{ background: "#000" }}
    >
      <style>{`
        .proj-card {
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
          cursor: pointer;
        }
        .proj-card:hover {
          border-color: rgba(132,0,255,0.4) !important;
          box-shadow: 0 8px 40px rgba(132,0,255,0.18), 0 0 0 1px rgba(132,0,255,0.1);
          transform: translateY(-3px);
        }
        .proj-card::after {
          content: '';
          position: absolute; inset: 0; padding: 1px;
          background: radial-gradient(300px circle at var(--glow-x) var(--glow-y),
            rgba(${GLOW_COLOR}, calc(var(--glow-intensity) * 0.7)) 0%, transparent 60%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none; z-index: 1;
        }
        .proj-card:hover .proj-card-shimmer { transform: translateX(200%) !important; }

        .proj-grid {
          display: grid;
          gap: 10px;
          width: 100%;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto;
        }
        /* MagicBento-style layout — matches the reference screenshot */
        .proj-grid .proj-card:nth-child(1) { grid-column: span 2; }
        .proj-grid .proj-card:nth-child(2) { grid-column: span 2; }
        .proj-grid .proj-card:nth-child(3) { grid-column: span 2; grid-row: span 2; }
        .proj-grid .proj-card:nth-child(4) { grid-column: span 2; }
        .proj-grid .proj-card:nth-child(5) { grid-column: span 1; }
        .proj-grid .proj-card:nth-child(6) { grid-column: span 1; }

        @media (max-width: 900px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
          .proj-grid .proj-card { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
        @media (max-width: 580px) {
          .proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <GlobalSpotlight gridRef={gridRef} />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(132,0,255,0.08) 0%, transparent 70%)", top: "15%", right: "5%" }} />
      <div className="pointer-events-none absolute" style={{ width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)", bottom: "10%", left: "5%" }} />

      {/* Vertical label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pr-4" style={{ zIndex: 2 }}>
        <div className="w-px h-24 bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>WORK</span>
      </div>

      {/* Eyebrow */}
      <p className="text-[13px] font-medium tracking-widest uppercase text-white/40 mb-6">{content.eyebrow}</p>

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="font-bold uppercase leading-[0.9] tracking-tighter text-white" style={{ fontSize: "clamp(52px,9vw,130px)" }}>
          My<br /><span style={{ color: "#4ade80" }}>{content.heading}</span>.
        </h2>
        <p className="text-[15px] text-white/45 leading-relaxed max-w-sm md:text-right pb-2">
          {content.intro}
        </p>
      </div>

      {/* Bento grid */}
      <div className="proj-grid" ref={gridRef}>
        {displayedProjects.map((p, i) => (
          <ProjectCard
            key={p.id || p.title}
            project={p}
            featured={i === 2} /* card 3 is the tall double-row featured one */
          />
        ))}
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="text-[13px] text-white/30">More on GitHub →</p>
        <a href={content.githubUrl} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-[13px] font-medium rounded-full px-5 py-2.5 transition-all"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.1)"; e.currentTarget.style.color = "#4ade80"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          <FiGithub size={14} /> View GitHub
        </a>
      </div>
    </section>
  );
}