import { useEffect, useRef, useState } from "react";

import {
  FiArrowRight,
} from "react-icons/fi";


import AuthLayout from "./AuthLayout";




function LoginPage() {

   let [otp, setOtp] = useState(["", "", "", "", "", ""]);

     let [error, setError] = useState("");
       let inputRefs = useRef([]);

  const [loading, setLoading] = useState(false);

   useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      console.log({
        email,
        password,
      });

      // Your authentication logic here

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  function handleChange(value, index) {
    if (!/^\d*$/.test(value)) return;
    let newOtp = [...otp];                                                                                                                                                                                                                                                                                                                                       
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

    const handleKeyDown = (element, index, e) => {
    // Move back on backspace                                                                                                                                                                                                                                                                   
    if (e.key === "Backspace" && !element.value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };                                                                                                                                                                                                                                                                                        

   function handlePaste(e) {
    e.preventDefault();
    let pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    let newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }


  return (

    <AuthLayout>

      {/* =========================================
          FLOATING LOGIN CARD
      ========================================= */}
      <div
        className="
          rounded-[28px]
          border
          border-white/[0.12]
          bg-[#0a0f0b]/90
          p-7
          shadow-2xl
          backdrop-blur-2xl

          sm:p-9
          md:p-10
        "
      >

        {/* =======================================
            HEADER
        ======================================= */}
        <div className="mb-9">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">

            <span className="h-px w-7 bg-[#4ade80]" />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[3px]
                text-[#4ade80]
              "
            >
              Member Access
            </span>

          </div>


          {/* Title */}
          <h2
            className="
              text-4xl
              font-semibold
              tracking-tight
              text-[#f4f7f4]
            "
          >
            Verify Your Email
          </h2>


          {/* Subtitle */}
          <p
            className="
              mt-3
              text-sm
              leading-6
              text-[#9aa59e]
            "
          >
            We sent a 6-digit OTP to{" "}
          </p>

        </div>


        {/* =======================================
            LOGIN FORM
        ======================================= */}
        <form onSubmit={handleSubmit}>

          


          {/* OTP Inputs */}
          <div className="flex items-center justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-9 h-10 sm:w-9 sm:h-10 text-center text-xl font-bold rounded-xl border border-white/[0.12]outline-none transition-all duration-200 ${
                  digit ? " bg-[#4ade80] text-black-600" : "border-gray-200 text-gray-700 focus:border-[#4ade80]/60"
                }`}
              />
            ))}
          </div>


         


          {/* =====================================
              SIGN IN BUTTON
          ===================================== */}
          <button
            type="submit"
            disabled={loading}
            className="
              group
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#4ade80]
              text-sm
              font-semibold
              text-[#050605]

              transition-all
              duration-300

              hover:bg-[#86efac]

              hover:shadow-[0_0_35px_rgba(74,222,128,0.20)]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {loading
              ? "Verifying..."
              : "Verify OTP"
            }

            {!loading && (
              <FiArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            )}

          </button>

        </form>


       


      


       

       

      </div>

    </AuthLayout>
  );
}


/* ============================================
   SOCIAL BUTTON
============================================ */

function SocialButton({ children }) {

  return (

    <button
      type="button"
      className="
        flex
        h-11
        items-center
        justify-center
        rounded-xl

        border
        border-white/[0.10]

        bg-white/[0.02]

        text-[#9aa59e]

        transition-all
        duration-300

        hover:border-[#4ade80]/40
        hover:bg-[#4ade80]/[0.05]
        hover:text-[#4ade80]
      "
    >
      {children}
    </button>

  );

}


export default LoginPage;