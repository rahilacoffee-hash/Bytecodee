import { useState } from "react";

import {
  FiArrowRight,
} from "react-icons/fi";

import {
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import FormInput from "./Forminput";
import { adminLogin } from "../../Services/admin.api";




function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await adminLogin({ email: email.trim(), password });
      navigate("/admin", { replace: true })

    } catch (error) {

      setError(error?.response?.data?.message || "Unable to sign in.");

    } finally {

      setLoading(false);

    }

  };


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
            Welcome back
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
            Sign in to continue to your Bytecode workspace.
          </p>

        </div>


        {/* =======================================
            LOGIN FORM
        ======================================= */}
        <form onSubmit={handleSubmit}>

          <FormInput
            label="Email address"
            type="email"
            name="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
          />


          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
          />


          {/* Forgot password */}
          <div className="mb-7 flex justify-end">

            <Link
              to="/forgot-password"
              className="
                text-xs
                text-[#9aa59e]
                transition-colors
                hover:text-[#4ade80]
              "
            >
              Forgot password?
            </Link>

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
              ? "Signing in..."
              : "Sign in"
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


        {/* =======================================
            DIVIDER
        ======================================= */}
        <div className="my-8 flex items-center gap-4">

          <div
            className="
              h-px
              flex-1
              bg-white/[0.10]
            "
          />

          <span
            className="
              whitespace-nowrap
              text-[9px]
              uppercase
              tracking-[2px]
              text-[#6f7972]
            "
          >
            Or continue with
          </span>

          <div
            className="
              h-px
              flex-1
              bg-white/[0.10]
            "
          />

        </div>


        {/* =======================================
            SOCIAL LOGIN
        ======================================= */}
        <div className="grid grid-cols-3 gap-3">

          <SocialButton>
            <span className="font-semibold">
              G
            </span>
          </SocialButton>


          <SocialButton>
            <FaGithub size={15} />
          </SocialButton>


          <SocialButton>
            <FaXTwitter size={15} />
          </SocialButton>

        </div>


        {/* =======================================
            TERMS
        ======================================= */}
        <p
          className="
            mt-7
            text-center
            text-[9px]
            leading-5
            text-[#6f7972]
          "
        >
          By continuing, you agree to our{" "}

          <Link
            to="/terms"
            className="
              text-[#4ade80]
              hover:underline
            "
          >
            Terms of Service
          </Link>

          {" "}and{" "}

          <Link
            to="/privacy"
            className="
              text-[#4ade80]
              hover:underline
            "
          >
            Privacy Policy
          </Link>

          .
        </p>


        {/* =======================================
            REGISTER
        ======================================= */}
        <div
          className="
            mt-7
            border-t
            border-white/[0.08]
            pt-6
          "
        >

          <p
            className="
              text-center
              text-sm
              text-[#9aa59e]
            "
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                font-medium
                text-[#4ade80]
                hover:underline
              "
            >
              Create account
            </Link>

          </p>

        </div>

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