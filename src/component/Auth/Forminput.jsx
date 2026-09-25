import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
} from "react-icons/fi";

function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : type;

  return (
    <div className="mb-5">

      {/* Label */}
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-[10px]
          uppercase
          tracking-[2px]
          text-[#9aa59e]
        "
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="relative">

        {/* Left icon */}
        <div
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#6f7972]
          "
        >
          {isPassword ? (
            <FiLock size={17} />
          ) : (
            <FiMail size={17} />
          )}
        </div>

        {/* Input */}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={name}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-white/[0.12]
            bg-white/[0.035]
            pl-11
            pr-12
            text-sm
            text-[#f4f7f4]
            outline-none
            transition-all
            duration-300

            placeholder:text-[#5f6962]

            hover:border-white/[0.18]

            focus:border-[#4ade80]/60
            focus:bg-[#4ade80]/[0.04]
            focus:ring-2
            focus:ring-[#4ade80]/10
          "
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#6f7972]
              transition-colors
              hover:text-[#4ade80]
            "
          >
            {showPassword ? (
              <FiEyeOff size={17} />
            ) : (
              <FiEye size={17} />
            )}
          </button>
        )}

      </div>

    </div>
  );
}

export default FormInput;