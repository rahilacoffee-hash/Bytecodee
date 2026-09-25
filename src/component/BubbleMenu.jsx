import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function BubbleMenu({ isOpen, onClose, items = [], menuBg = '#fff', menuContentColor = '#111' }) {
  let [showOverlay, setShowOverlay] = useState(false);
  let bubblesRef = useRef([]);
  let labelRefs = useRef([]);

  useEffect(() => {
    let bubbles = bubblesRef.current.filter(Boolean);
    let labels = labelRefs.current.filter(Boolean);

    if (isOpen) {
      setShowOverlay(true);
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: 'power3.in' });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => setShowOverlay(false),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showOverlay) return;
    let bubbles = bubblesRef.current.filter(Boolean);
    let labels = labelRefs.current.filter(Boolean);

    gsap.killTweensOf([...bubbles, ...labels]);
    gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(labels, { y: 24, autoAlpha: 0 });

    bubbles.forEach((bubble, i) => {
      let delay = i * 0.12 + gsap.utils.random(-0.05, 0.05);
      let tl = gsap.timeline({ delay });
      tl.to(bubble, { scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
      if (labels[i]) {
        tl.to(labels[i], { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, '-=0.45');
      }
    });
  }, [showOverlay]);

  if (!showOverlay) return null;

  return (
    <>
      <style>{`
        .pill-link {
          transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
        }
        @media (min-width: 900px) {
          .pill-link { transform: rotate(var(--item-rot)); }
          .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
        }
        @media (max-width: 899px) {
          .pill-link:hover {
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-auto overflow-y-auto py-8 sm:py-0">
        <ul className="list-none mt-16 sm:mt-20 mb-0 mx-0 px-4 sm:px-6 w-full max-w-[1400px] flex flex-wrap gap-y-3 sm:gap-y-2 md:gap-y-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-center items-stretch box-border flex-[0_0_100%] min-[600px]:flex-[0_0_calc(100%/2)] min-[900px]:flex-[0_0_calc(100%/3)] px-0 min-[600px]:px-1.5"
            >
              <a
                href={item.href}
                aria-label={item.ariaLabel || item.label}
                onClick={onClose}
                className="pill-link w-full min-h-[104px] min-[600px]:min-h-[132px] min-[900px]:min-h-[160px] rounded-[999px] no-underline shadow-[0_4px_14px_rgba(0,0,0,0.10)] flex items-center justify-center overflow-hidden text-center"
                style={{
                  '--item-rot': `${item.rotation ?? 0}deg`,
                  '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                  '--hover-color': item.hoverStyles?.textColor || menuContentColor,
                  background: menuBg,
                  color: menuContentColor,
                  padding: 'clamp(1.25rem, 3vw, 8rem) clamp(1.25rem, 4vw, 2.5rem)',
                  fontSize: 'clamp(1.25rem, 5vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 0,
                }}
                ref={el => { if (el) bubblesRef.current[idx] = el; }}
              >
                <span
                  className="inline-block whitespace-nowrap"
                  style={{ willChange: 'transform, opacity', height: '1.2em', lineHeight: 1.2 }}
                  ref={el => { if (el) labelRefs.current[idx] = el; }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}