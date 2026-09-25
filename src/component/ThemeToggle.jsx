import { Moon, Sun } from "lucide-react";

function ThemeToggle({ isNight, onToggle, className = "" }) {
  const toggleStyle = isNight
    ? {
        borderColor: "rgba(255, 255, 255, 0.15)",
        color: "#ffffff",
        background: "rgba(255, 255, 255, 0.05)",
      }
    : {
        borderColor: "rgba(17, 17, 17, 0.15)",
        color: "#111111",
        background: "rgba(255, 255, 255, 0.7)",
      };

  return (
    <>
 

     <button
            onClick={onToggle}
            type="button"
            className="
            relative
            w-16
            h-9
            rounded-full
            bg-black/5
            transition-all
            duration-300
            flex
            items-center
            px-1
            overflow-hidden
            "
          >
            {/* GLOW */}

            <div
              className={`
              absolute
              inset-0
              rounded-full
              ${
                isNight
                  ? "bg-[#16834a]/10"
                  : "bg-yellow-400/10"
              }
              `}
            />

            {/* SLIDER */}

            <div
              className={`
              absolute
              top-1
              w-7
              h-7
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
              z-10
              transition-all
              duration-300
              ${
                isNight
                  ? "translate-x-7 bg-[#16834a]"
                  : "translate-x-0 bg-white"
              }
              `}
            >
              {isNight ? (
                <Moon className="text-white text-sm" />
              ) : (
                <Sun className="text-yellow-500 text-sm" />
              )}
            </div>
          </button>
          </>
  );
}

export default ThemeToggle;
