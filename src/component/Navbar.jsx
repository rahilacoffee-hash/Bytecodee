import { useState, useEffect } from "react";
import BubbleMenu from "./BubbleMenu";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

const items = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -20,
    hoverStyles: { bgColor: "#dec34a", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: -20,
    hoverStyles: { bgColor: "#246cd8", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#project",
    ariaLabel: "Projects",
    rotation: -20,
    hoverStyles: { bgColor: "#4ade80", textColor: "#ffffff" },
  },
  {
    label: "experience",
    href: "#experience",
    ariaLabel: "Experience",
    rotation: -20,
    hoverStyles: { bgColor: "#FF4500", textColor: "#ffffff" },
  },
  {
    label: "testimonials",
    href: "#testimonials",
    ariaLabel: "Testimonials",
    rotation: -20,
    hoverStyles: { bgColor: "#FF4500", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -20,
    hoverStyles: { bgColor: "#d80909", textColor: "#ffffff" },
  },
];

export default function Navbar({  }) {
  let [menuOpen, setMenuOpen] = useState(false);
  let [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Bubble overlay — fully controlled, closes on any link click */}
      <BubbleMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={items}
        menuBg="#ffffff"
        menuContentColor="#111111"
      />

      {/* Navbar bar — glass on scroll, always on top */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1002] flex items-center justify-between px-5 sm:px-8 md:px-14 py-4 sm:py-5 transition-all duration-500 border-b ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-white/10"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo — bracket monogram + wordmark */}
        <div className="flex items-center gap-2.5 sm:gap-3 group cursor-default">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-[#4ade80]/30 flex items-center justify-center backdrop-blur-sm group-hover:border-[#4ade80] group-hover:bg-[#4ade80]/10 transition-all duration-300">
            <span
              className="text-[#4ade80] font-bold text-[13px] sm:text-sm leading-none"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {"{}"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-white font-bold text-[13px] sm:text-[15px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Bytecode
            </span>
            <span className="w-[6px] h-[6px] rounded-full bg-[#4ade80] animate-pulse shrink-0" />
          </div>
        </div>

        {/* Menu / Close — syntax-styled toggle */}
        <div className="flex items-center gap-2">
         
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="group flex items-center gap-2 sm:gap-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#4ade80]/50 rounded-full pl-3.5 sm:pl-4 pr-2 sm:pr-2.5 py-2 sm:py-2.5 backdrop-blur-sm transition-all duration-300"
          >
            <span
              className="text-[12px] sm:text-[13px] font-medium select-none"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-white">{menuOpen ? "close" : "menu"}</span>
              <span className="text-[#4ade80]">()</span>
            </span>
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                menuOpen
                  ? "bg-[#4ade80] rotate-90"
                  : "bg-white/10 group-hover:bg-[#4ade80]/20"
              }`}
            >
              {menuOpen ? (
                <FiX className="text-black text-[14px]" />
              ) : (
                <FiMenu className="text-white text-[14px]" />
              )}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
