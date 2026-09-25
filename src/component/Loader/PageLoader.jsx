import { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const resources = performance.getEntriesByType("resource");

      let loaded = 0;
      const total = resources.length || 1;

      resources.forEach(() => {
        loaded++;
      });

      setProgress(Math.round((loaded / total) * 100));
    };

    const interval = setInterval(updateProgress, 50);

    window.addEventListener("load", () => {
      setProgress(100);

      setTimeout(() => {
        onComplete?.();
      }, 300);
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020617] flex items-center justify-center">
      <div className="w-[500px]">
        <h1 className="text-white text-center text-3xl font-bold mb-8">
          Loading Experience
        </h1>

        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="text-center text-violet-400 mt-4">
          {progress}%
        </div>
      </div>
    </div>
  );
}