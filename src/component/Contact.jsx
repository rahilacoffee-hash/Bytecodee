import { useState } from "react";
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiCheck } from "react-icons/fi";

export default function Contact() {
  let [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  let [status, setStatus] = useState("idle"); // idle | sending | sent | error
  let [focused, setFocused] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    try {
      // Formspree API call configured for real-time AJAX/fetch response
      const response = await fetch("https://formspree.io/f/xykvweel", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" // CRITICAL: Prevents page redirect and forces JSON response
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  let fields = [
    { name: "name", label: "Your Name", type: "text", placeholder: "Bytecode" },
    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { name: "subject", label: "Subject", type: "text", placeholder: "Project inquiry" },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen font-sans overflow-hidden flex flex-col px-8 md:px-14 pt-24 pb-14"
      style={{ background: "#000" }}
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", top: "10%", left: "10%" }} />
      <div className="pointer-events-none absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(132,0,255,0.07) 0%, transparent 70%)", bottom: "10%", right: "8%" }} />

      {/* Vertical label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pr-4" style={{ zIndex: 2 }}>
        <div className="w-px h-24 bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          TALK
        </span>
      </div>

      {/* Eyebrow */}
      <p className="text-[13px] font-medium tracking-widest uppercase text-white/40 mb-6">
        Get in touch
      </p>

      {/* Heading */}
      <div className="mb-14">
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter text-white mb-6"
          style={{ fontSize: "clamp(52px, 9vw, 130px)" }}
        >
          Let's<br />
          <span style={{ color: "#4ade80" }}>Talk</span>.
        </h2>
        <p className="text-[15px] text-white/45 leading-relaxed max-w-md">
          Have a project in mind? Tell me about it — I usually
          reply within 24 hours.
        </p>
      </div>

      {/* MAIN — form + info */}
      <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* LEFT — Contact info */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
          {[
            { icon: FiMail, label: "Email", value: "abrahamfred123@gmail.com", href: "mailto:abrahamfred@gmail.com", color: "#4ade80" },
            { icon: FiPhone, label: "Phone", value: "+234 912 124 9422", href: "tel:+2349121249422", color: "#a78bfa" },
            { icon: FiMapPin, label: "Location", value: "Abuja, Nigeria", href: "https://www.google.com/maps/place/5+Isiyaku+Ismaila+Cres,+Utako,+Abuja+900108,+Federal+Capital+Territory/@9.056593,7.4482982,1129m/data=!3m2!1e3!4b1!4m6!3m5!1s0x104e0b307ac958ad:0x7044653f066f700d!8m2!3d9.056593!4d7.4482982!16s%2Fg%2F11rg5y3rhp?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D", color: "#fb923c" },
          ].map(({ icon: Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-4 transition-all"
              style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", padding: "16px 18px", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color + "40"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: color + "15", border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{value}</p>
              </div>
            </a>
          ))}

         

          {/* Availability badge */}
          <div className="flex items-center gap-2 mt-2" style={{ padding: "10px 14px", borderRadius: 99, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
            <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 500 }}>Available for new projects</span>
          </div>
        </div>

        {/* RIGHT — Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1"
          style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", padding: "36px 32px" }}
        >
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {fields.slice(0, 2).map((f) => (
              <FormField key={f.name} field={f} form={form} focused={focused} setFocused={setFocused} handleChange={handleChange} />
            ))}
          </div>

          <div className="mb-5">
            <FormField field={fields[2]} form={form} focused={focused} setFocused={setFocused} handleChange={handleChange} />
          </div>

          {/* Message textarea */}
          <div className="mb-6">
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 8 }}>Message</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="Tell me about your project, timeline, and budget..."
              required
              style={{
                width: "100%",
                resize: "none",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${focused === "message" ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 12,
                padding: "12px 14px",
                color: "#fff",
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
            style={{
              borderRadius: 999,
              padding: "14px 28px",
              background: status === "sent" ? "rgba(74,222,128,0.15)" : status === "error" ? "rgba(239,68,68,0.15)" : "#4ade80",
              color: status === "sent" ? "#4ade80" : status === "error" ? "#ef4444" : "#0a0a0a",
              border: status === "sent" ? "1px solid rgba(74,222,128,0.4)" : status === "error" ? "1px solid rgba(239,68,68,0.4)" : "none",
              fontWeight: 600,
              fontSize: 14,
              cursor: status === "sending" ? "wait" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
              transition: "all 0.3s ease",
            }}
          >
            {status === "idle" && (<>Send Message <FiArrowUpRight size={16} /></>)}
            {status === "sending" && "Sending..."}
            {status === "sent" && (<>Message Sent <FiCheck size={16} /></>)}
            {status === "error" && "Something went wrong — try again"}
          </button>
        </form>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-14 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="text-[13px] text-white/30">© 2026 BYTECODE. All rights reserved.</p>
        <p className="text-[13px] text-white/30">Built by BYTECODE</p>
      </div>
    </section>
  );
}

function FormField({ field, form, focused, setFocused, handleChange }) {
  return (
    <div>
      <label style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 8 }}>
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        value={form[field.name]}
        onChange={handleChange}
        onFocus={() => setFocused(field.name)}
        onBlur={() => setFocused(null)}
        placeholder={field.placeholder}
        required={field.name !== "subject"}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${focused === field.name ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 12,
          padding: "12px 14px",
          color: "#fff",
          fontSize: 14,
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
      />
    </div>
  );
}