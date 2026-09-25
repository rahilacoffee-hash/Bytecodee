export const HOME_PAGE_DEFAULTS = {
  hero: {
    eyebrow: "Hey 🖐, I'm a Full Stack Developer",
    title: "BYTECODE",
    description:
      "Hi, I'm BYTECODE - a web developer specializing in React, Node.js, and JavaScript. I build fast, scalable, and user-friendly web applications using modern technologies.",
    scrollLabel: "SCROLL",
    toolsLabel: "TOOLS",
    backgroundVideo:
      "https://res.cloudinary.com/dhiytc3gu/video/upload/v1781738470/kling_20260618_Image_to_Video__1830_0_y9bur3.mp4",
  },
  about: {
    eyebrow: "Hey 🖐, About Me",
    heading: "Full",
    accentHeading: "Stack",
    trailingHeading: "Dev.",
    description:
      "I build fast, scalable, and user-friendly web applications using modern JavaScript technologies. My main tools of choice are React on the frontend and Node.js on the backend. Every project is crafted with performance and clarity in mind.",
    tags: [
      "Social Platforms",
      "Fintech",
      "Gaming",
      "SaaS",
      "E-Commerce",
      "Healthcare",
      "Real Estate",
    ],
    stats: [
      { value: 5, suffix: "+", label: "Projects" },
      { value: 98, suffix: "%", label: "Satisfaction" },
      { value: 1, suffix: "+", label: "Years" },
    ],
  },
  projects: {
    eyebrow: "What I've built",
    heading: "Projects",
    intro: "Shipped products spanning e-commerce, AI, cybersecurity, and fashion-tech.",
    githubUrl: "https://github.com/rahilacoffee-hash/",
    items: [
      {
        id: "rahila-coffee",
        label: "E-Commerce",
        title: "Rahila Coffee",
        description:
          "Full MERN e-commerce with Stripe payments, admin dashboard, cart, and mobile-responsive UI.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        image:
          "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781789451/Screenshot_from_2026-06-18_14-29-58_zihuvg.png",
        github: "https://github.com/rahilacoffee-hash/rahila-coffee-frontend",
        live: "https://rahila-coffeeee-one.vercel.app/",
      },
      {
        id: "ecohome-concepts",
        label: "Company profile",
        title: "Ecohome concepts",
        description: "Full MERN website with admin dashboard.",
        tech: ["React", "Node.js", "MongoDB"],
        image:
          "https://res.cloudinary.com/dhiytc3gu/image/upload/v1784756813/Screenshot_2026-07-22_22-07-23_hyilyk.png",
        github: "https://github.com/rahilacoffee-hash/Ecohome-concept-s",
        live: "https://ecohome-concepts.vercel.app/",
      },
      {
        id: "liliums-glee",
        label: "E-Commerce/portfolio",
        title: "Liliums Glee",
        description:
          "Full MERN e-commerce with Paystack payments, admin dashboard, cart, and mobile-responsive UI.",
        tech: ["React", "Node.js", "MongoDB", "Paystack"],
        image:
          "https://res.cloudinary.com/dhiytc3gu/image/upload/v1784753998/Screenshot_2026-07-22_21-55-14_etvz1j.png",
        github: "https://github.com/rahilacoffee-hash/Liliums-glee",
        live: "https://liliums-glee.vercel.app/",
      },
      {
        id: "bigbites-grills",
        label: "Food Delivery",
        title: "Bigbites Grills",
        description:
          "Food delivery platform with Paystack integration, JWT auth, OTP flow, and admin panel.",
        tech: ["React", "Express", "MongoDB", "Paystack"],
        image:
          "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781789932/Screenshot_from_2026-06-18_14-38-37_g0xail.png",
        github: "#",
        live: "#",
      },
      {
        id: "learnova-ai",
        label: "AI SaaS",
        title: "LearnOva AI",
        description:
          "AI-powered study assistant with quiz engine, flashcards, summaries, and chat interface.",
        tech: ["React", "Vite", "Node.js", "OpenAI"],
        image:
          "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781789847/Screenshot_from_2026-06-18_14-37-05_k42kyd.png",
        github: "https://github.com/rahilacoffee-hash/Learnova-AI",
        live: "https://leearnova-ai.vercel.app/",
      },
      {
        id: "tailored",
        label: "Fashion Tech",
        title: "Tailored",
        description:
          "Marketing site for a Nigerian fashion-tech app with animated loader and Groq AI chat widget.",
        tech: ["React", "Framer Motion", "Groq API", "Vercel"],
        image:
          "https://res.cloudinary.com/dhiytc3gu/image/upload/v1781790043/Screenshot_from_2026-06-18_14-39-58_xxeaja.png",
        github: "#",
        live: "#",
      },
    ],
  },
  testimonials: {
    eyebrow: "What clients say",
    heading: "Testimonials",
    intro:
      "Real feedback from people I've shipped products for — freelance clients and product leads alike.",
    items: [
      {
        id: "sarah-chen",
        name: "Sarah Chen",
        role: "Founder, Rahila Coffee",
        quote:
          "Bytecode rebuilt our entire storefront from scratch. The checkout flow alone cut our cart abandonment in half. Communication was clear at every step.",
        rating: 5,
        color: "#4ade80",
      },
      {
        id: "daniel-okafor",
        name: "Daniel Okafor",
        role: "CEO, Bigbites Grills",
        quote:
          "We needed Paystack integrated fast and bug-free. Bytecode delivered a full admin dashboard with five modules ahead of schedule. Genuinely impressive turnaround.",
        rating: 5,
        color: "#a78bfa",
      },
      {
        id: "glory-garuba",
        name: "Glory Judah Garuba",
        role: "Backend developer Lead, LearnOva AI",
        quote:
          "The AI chat and quiz generation features just worked. Bytecode understood the product vision immediately and translated it into a polished, fast experience.",
        rating: 5,
        color: "#fb923c",
      },
      {
        id: "james-whitfield",
        name: "James Whitfield",
        role: "Founder, Eco Homes Concept",
        quote:
          "Professional, responsive, and detail-oriented. Our construction site looks modern and loads instantly. Would hire again without hesitation.",
        rating: 5,
        color: "#22d3ee",
      },
      {
        id: "tunde-bakare",
        name: "Tunde Bakare",
        role: "Marketing Director, Tailored",
        quote:
          "The animated loader and AI chat widget gave our brand a premium feel. Bytecode iterated quickly on feedback and never missed a deadline.",
        rating: 5,
        color: "#4ade80",
      },
    ],
  },
};
