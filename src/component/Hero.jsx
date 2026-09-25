import { HOME_PAGE_DEFAULTS } from "../data/homepageContent";

export default function Hero({ content = HOME_PAGE_DEFAULTS.hero }) {
  return (
    <section className="relative min-h-screen mt-10 text-white flex flex-col px-10 md:px-14 pt-8 pb-12 font-['Space_Grotesk',sans-serif] overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-start pt-14">
        <p className="text-[17px] font-medium flex items-center gap-2 mb-2">
          {content.eyebrow}
        </p>

        <h1 className="text-[clamp(72px,13vw,176px)] font-bold leading-[0.88] tracking-tighter uppercase text-[#4ade80] mb-10 break-words">
          {content.title}
        </h1>

        <p className="text-[11px] font-medium tracking-[0.18em] uppercase mt-2">
          {content.scrollLabel}
        </p>
      </div>

      {/* VERTICAL LINE */}
      <div className="absolute z-10 right-14 top-1/4 w-px h-28 bg-white" />

      {/* VERTICAL TOOLS LABEL */}
      <div
        className="absolute z-10 right-10 top-1/2 -translate-y-1/2 text-[11px] font-medium tracking-[0.18em] uppercase"
        style={{
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
        }}
      >
        {content.toolsLabel}
      </div>

      {/* BOTTOM ROW */}
      <div className="relative z-10 flex items-end justify-between mt-auto pt-12">
        {/* Contact */}
        <div className="flex  max-w-sm gap-1">
          <p className="text-[14px]  font-bold leading-relaxed text-gray-400/90">
            {content.description}
          </p>
           
        </div>

      
      </div>
    </section>
  );
}
