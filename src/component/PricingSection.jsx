import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  Code2,
  Layers3,
  X,
  MessageCircle,
  Smartphone,
  RotateCcw,
  Loader2,
  AlertCircle,
  Mail,
} from "lucide-react";

import { registerClient } from "../Services/auth.api";
import { createConversation } from "../Services/conversation.api";

const plans = [
  {
    name: "Landing Page",
    service: "LANDING_PAGE",
    description:
      "A focused, high-impact website for products, services, campaigns, and personal brands.",
    price: "₦100k",
    icon: Code2,
    color: "#a78bfa",
    features: [
      "1–3 custom pages",
      "Responsive design",
      "Modern animations",
      "WhatsApp / contact integration",
      "SEO fundamentals",
      "Deployment",
    ],
  },
  {
    name: "Business Website",
    service: "BUSINESS_WEBSITE",
    description:
      "A complete digital presence designed to establish credibility and turn visitors into customers.",
    price: "₦200k",
    icon: Sparkles,
    color: "#4ade80",
    featured: true,
    features: [
      "5–8 custom pages",
      "Custom UI implementation",
      "Responsive across devices",
      "Advanced animations",
      "Contact & lead forms",
      "SEO fundamentals",
      "Deployment & launch support",
    ],
  },
  {
    name: "Web Application",
    service: "WEB_APPLICATION",
    description:
      "A custom digital product with frontend, backend infrastructure, databases, and business logic.",
    price: "₦400k",
    icon: Layers3,
    color: "#22d3ee",
    features: [
      "Custom frontend",
      "Backend & REST API",
      "Authentication",
      "Database integration",
      "Admin dashboard",
      "Third-party integrations",
      "Deployment",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const serviceLabels = {
  LANDING_PAGE: "Landing Page",
  BUSINESS_WEBSITE: "Business Website",
  WEB_APPLICATION: "Web Application",
  CUSTOM: "Custom Project",
};

const servicePrices = {
  LANDING_PAGE: "₦100k",
  BUSINESS_WEBSITE: "₦200k",
  WEB_APPLICATION: "₦400k",
  CUSTOM: "Custom",
};

export default function PricingSection() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openProjectFlow = (plan) => {
    setSelectedPlan(plan);
    setShowOptions(true);
    setShowMessageForm(false);
    setError("");
  };

  const closeModal = () => {
    if (loading) return;

    setShowOptions(false);
    setShowMessageForm(false);
    setSelectedPlan(null);
    setError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleMessageHere = () => {
    setShowOptions(false);
    setShowMessageForm(true);
    setError("");
  };

  const handleBackToOptions = () => {
    if (loading) return;

    setShowMessageForm(false);
    setShowOptions(true);
    setError("");
  };

  const handleWhatsApp = () => {
    if (!selectedPlan) return;

    const message = encodeURIComponent(
      `Hi BYTECODEE, I'm interested in a ${selectedPlan.name} project starting from ${selectedPlan.price}. I'd like to discuss the project.`
    );

    const whatsappUrl = `https://wa.me/?text=${message}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleContinuePreviousConversation = () => {
    /*
      We will connect this to the existing client recovery flow next.

      Intended flow:
      Continue Previous Conversation
              ↓
           Email
              ↓
             OTP
              ↓
       Existing conversations
              ↓
             Chat
    */

    navigate("/client/recover");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPlan || loading) return;

    setError("");
    setLoading(true);

    try {
      await registerClient({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        companyName: form.companyName.trim(),
      });

      const conversationResponse = await createConversation({
        service: selectedPlan.service,
        source: "PORTFOLIO_PRICING",
      });

      const conversation = conversationResponse?.data?.conversation;

      if (!conversation?.id) {
        throw new Error(
          "Conversation was created, but no conversation ID was returned."
        );
      }

      const service = selectedPlan.service;
      closeModal();

      // Full page so the chat isn't lost on refresh and gets its own URL.
      navigate(
        `/client-chat?service=${encodeURIComponent(service)}&conversationId=${encodeURIComponent(
          conversation.id
        )}`
      );
    } catch (requestError) {
      console.error("Start project error:", requestError);

      setError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="pricing"
        className="relative min-h-screen overflow-hidden bg-black px-8 pt-24 pb-14 font-sans text-white md:px-14"
      >
        {/* Background glows */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
            top: "10%",
            left: "20%",
          }}
        />

        <div
          className="pointer-events-none absolute"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(132,0,255,0.06) 0%, transparent 70%)",
            bottom: "15%",
            right: "5%",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          {/* Vertical label */}
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 pr-4 lg:flex">
            <div className="h-24 w-px bg-white/20" />

            <span
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              SERVICES
            </span>
          </div>

          {/* Eyebrow */}
          <p className="mb-6 text-[13px] font-medium uppercase tracking-widest text-white/40">
            What I can build
          </p>

          {/* Heading */}
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2
              className="font-bold uppercase leading-[0.9] tracking-tighter text-white"
              style={{ fontSize: "clamp(52px, 9vw, 130px)" }}
            >
              Ser
              <br />
              <span style={{ color: "#4ade80" }}>vices</span>.
            </h2>

            <p className="max-w-sm pb-2 text-[15px] leading-relaxed text-white/45 md:text-right">
              Digital experiences built around your goals — from
              high-impact websites to complete full-stack applications.
            </p>
          </div>

          {/* Pricing grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid gap-5 lg:grid-cols-3"
          >
            {plans.map((plan) => {
              const Icon = plan.icon;

              return (
                <motion.article
                  key={plan.name}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative"
                >
                  <div
                    className="relative flex h-full min-h-[570px] flex-col overflow-hidden rounded-[20px] p-6 md:p-7"
                    style={{
                      border: `1px solid ${
                        plan.featured
                          ? plan.color + "4d"
                          : "rgba(255,255,255,0.07)"
                      }`,
                      background: plan.featured
                        ? plan.color + "08"
                        : "rgba(255,255,255,0.02)",
                      boxShadow: plan.featured
                        ? `0 0 60px ${plan.color}18`
                        : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {plan.featured && (
                      <div
                        className="absolute left-0 right-0 top-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
                        }}
                      />
                    )}

                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${plan.color}18, transparent 55%)`,
                      }}
                    />

                    <div className="relative z-10 flex h-full flex-col">
                      {/* Card top */}
                      <div className="mb-10 flex items-start justify-between">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{
                            background: plan.color + "18",
                            border: `1px solid ${plan.color}30`,
                          }}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.7}
                            style={{ color: plan.color }}
                          />
                        </div>

                        {plan.featured && (
                          <span
                            className="text-[10px] font-medium uppercase tracking-[0.15em]"
                            style={{ color: plan.color + "b3" }}
                          >
                            Recommended
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <h3 className="text-[21px] font-semibold tracking-tight text-white">
                          {plan.name}
                        </h3>

                        <p className="mt-3 min-h-[72px] max-w-md text-[13px] leading-6 text-white/40">
                          {plan.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div
                        className="my-7 border-y py-6"
                        style={{ borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-white/25">
                          Starting from
                        </p>

                        <div className="flex items-end gap-2">
                          <span
                            className="text-[38px] font-bold tracking-[-0.05em]"
                            style={{ color: plan.color }}
                          >
                            {plan.price}
                          </span>

                          <span className="mb-1 text-[11px] text-white/25">
                            / project
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex-1">
                        <p className="mb-4 text-[10px] uppercase tracking-[0.14em] text-white/25">
                          Includes
                        </p>

                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-[13px] text-white/50"
                            >
                              <span
                                className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  background: plan.color + "18",
                                  color: plan.color,
                                }}
                              >
                                <Check size={9} strokeWidth={3} />
                              </span>

                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <motion.button
                        type="button"
                        onClick={() => openProjectFlow(plan)}
                        whileHover="hover"
                        className="mt-9 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-medium"
                        style={{
                          background: plan.featured
                            ? plan.color
                            : "rgba(255,255,255,0.04)",
                          color: plan.featured
                            ? "#000"
                            : "rgba(255,255,255,0.75)",
                          border: `1px solid ${
                            plan.featured
                              ? plan.color
                              : "rgba(255,255,255,0.08)"
                          }`,
                          transition: "all 0.25s ease",
                        }}
                      >
                        Start a project

                        <motion.span
                          variants={{ hover: { x: 3, y: -3 } }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight size={15} />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Bottom information */}
          <div className="mt-14 border-t border-white/[0.08] pt-6">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <p className="max-w-xl text-[13px] leading-relaxed text-white/30">
                Every project is scoped individually. Final pricing
                depends on features, timeline, integrations, and
                technical requirements.
              </p>

              <button
                type="button"
                onClick={() =>
                  openProjectFlow({
                    name: "Custom Project",
                    service: "CUSTOM",
                    price: "Custom",
                    color: "#4ade80",
                  })
                }
                className="group flex items-center gap-2 text-[13px] font-medium text-[#4ade80] transition-opacity hover:opacity-70"
              >
                Have a custom project?
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>

          {/* Mini stats */}
          <div className="mt-10 flex max-w-md gap-8">
            {[
              ["1+", "Years"],
              ["5+", "Projects"],
              ["∞", "Possibilities"],
            ].map(([num, label]) => (
              <div key={label}>
                <p
                  className="text-[22px] font-bold leading-none"
                  style={{ color: "#4ade80" }}
                >
                  {num}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-white/25">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROJECT START MODAL (options + form only — chat is a page)
      ============================================================ */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-white/10 bg-[#080808] p-6 shadow-2xl md:p-8"
            >
              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={17} />
              </button>

              <AnimatePresence mode="wait">
                {/* ==================================================
                    OPTIONS
                ================================================== */}
                {showOptions && (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <div className="pr-10">
                      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#4ade80]">
                        Start a project
                      </p>

                      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        How would you like to continue?
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/40">
                        You’re interested in{" "}
                        <span className="text-white/70">
                          {selectedPlan.name}
                        </span>
                        {selectedPlan.price !== "Custom" && (
                          <>
                            {" "}
                            starting from{" "}
                            <span style={{ color: selectedPlan.color }}>
                              {selectedPlan.price}
                            </span>
                          </>
                        )}
                        .
                      </p>
                    </div>

                    {/* Options */}
                    <div className="mt-8 space-y-3">
                      {/* Message Here */}
                      <button
                        type="button"
                        onClick={handleMessageHere}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition duration-200 hover:border-[#4ade80]/30 hover:bg-[#4ade80]/[0.06]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4ade80]/10 text-[#4ade80] transition group-hover:bg-[#4ade80]/15">
                          <MessageCircle size={20} />
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm font-medium text-white">
                            Message Here
                          </span>

                          <span className="mt-1 block text-xs leading-5 text-white/35">
                            Start a private conversation directly on the website.
                          </span>
                        </span>

                        <ArrowUpRight
                          size={17}
                          className="text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4ade80]"
                        />
                      </button>

                      {/* WhatsApp */}
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition duration-200 hover:border-green-400/30 hover:bg-green-400/[0.05]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-400/10 text-green-400 transition group-hover:bg-green-400/15">
                          <Smartphone size={20} />
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm font-medium text-white">
                            WhatsApp
                          </span>

                          <span className="mt-1 block text-xs leading-5 text-white/35">
                            Continue the conversation directly on WhatsApp.
                          </span>
                        </span>

                        <ArrowUpRight
                          size={17}
                          className="text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-400"
                        />
                      </button>

                      {/* Continue previous */}
                      <button
                        type="button"
                        onClick={handleContinuePreviousConversation}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400/15">
                          <RotateCcw size={20} />
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm font-medium text-white">
                            Continue Previous Conversation
                          </span>

                          <span className="mt-1 block text-xs leading-5 text-white/35">
                            Recover your previous BYTECODEE conversations.
                          </span>
                        </span>

                        <ArrowUpRight
                          size={17}
                          className="text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                        />
                      </button>
                    </div>

                    {error && (
                      <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.05] p-3">
                        <AlertCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-red-400"
                        />

                        <p className="text-xs leading-5 text-red-300/80">
                          {error}
                        </p>
                      </div>
                    )}

                    <p className="mt-6 text-center text-[10px] uppercase tracking-[0.12em] text-white/20">
                      No account or password required
                    </p>
                  </motion.div>
                )}

                {/* ==================================================
                    MESSAGE HERE FORM
                ================================================== */}
                {showMessageForm && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <button
                      type="button"
                      onClick={handleBackToOptions}
                      disabled={loading}
                      className="mb-6 flex items-center gap-2 text-xs text-white/35 transition hover:text-white disabled:opacity-40"
                    >
                      ← Back
                    </button>

                    <div className="pr-8">
                      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#4ade80]">
                        Message Here
                      </p>

                      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        Let’s start the conversation.
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/40">
                        Tell me a little about yourself and I’ll
                        create your private project conversation.
                      </p>
                    </div>

                    {/* Selected service */}
                    <div className="mt-7 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
                          Service
                        </p>

                        <p className="mt-1 text-sm font-medium text-white">
                          {serviceLabels[selectedPlan.service]}
                        </p>
                      </div>

                      <p
                        className="text-sm font-semibold"
                        style={{ color: selectedPlan.color }}
                      >
                        {servicePrices[selectedPlan.service]}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {/* Name */}
                      <div>
                        <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                          Full name
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          autoComplete="name"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#4ade80]/40 focus:bg-white/[0.05]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                          Email address
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#4ade80]/40 focus:bg-white/[0.05]"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                          Phone number
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          placeholder="+234..."
                          required
                          autoComplete="tel"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#4ade80]/40 focus:bg-white/[0.05]"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                          Company / Brand
                          <span className="ml-1 text-white/15">optional</span>
                        </label>

                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleInputChange}
                          placeholder="Company or brand name"
                          autoComplete="organization"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#4ade80]/40 focus:bg-white/[0.05]"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.05] p-3">
                          <AlertCircle
                            size={16}
                            className="mt-0.5 shrink-0 text-red-400"
                          />

                          <p className="text-xs leading-5 text-red-300/80">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4ade80] text-sm font-semibold text-black transition hover:bg-[#65e98f] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Creating your conversation...
                          </>
                        ) : (
                          <>
                            <MessageCircle size={16} />
                            Start Conversation
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-white/20">
                      <Mail size={11} />
                      Your email is used to recover this conversation later.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}