import { motion } from "framer-motion";

function AuthLayout({ children }) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050605]">

      {/* =========================================
          FULL SCREEN HERO IMAGE
      ========================================= */}
      <img
        src="/image.png"
        alt="Bytecode workspace"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Left cinematic gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#050605]/80
          via-transparent
          to-[#050605]/70
        "
      />

      {/* Bottom gradient */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[45%]
          bg-gradient-to-t
          from-[#050605]
          to-transparent
        "
      />

      {/* =========================================
          BYTECODE LOGO
      ========================================= */}
      <div
        className="
          absolute
          left-7
          top-7
          z-20

          sm:left-10
          sm:top-9

          lg:left-12
          lg:top-10
        "
      >
        <motion.img
          src="/logo.png"
          alt="Bytecode"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            h-auto
            w-[150px]
            object-contain

            sm:w-[170px]
            lg:w-[190px]
          "
        />
      </div>

      {/* =========================================
          HERO TEXT
      ========================================= */}
      <div
        className="
          absolute
          bottom-8
          left-7
          z-10
          max-w-xl

          sm:bottom-12
          sm:left-10

          lg:bottom-16
          lg:left-12
        "
      >
        <p
          className="
            mb-3
            text-[10px]
            uppercase
            tracking-[4px]
            text-[#9aa59e]

            sm:text-xs
          "
        >
          Digital workspace
        </p>

        <h1
          className="
            text-4xl
            font-semibold
            leading-[0.95]
            tracking-tight
            text-white

            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Build something

          <span className="block text-[#4ade80]">
            extraordinary.
          </span>
        </h1>

        <p
          className="
            mt-5
            max-w-md
            text-sm
            leading-6
            text-[#9aa59e]

            sm:text-base
          "
        >
          Everything you need to create, manage and scale
          your digital experience in one beautiful workspace.
        </p>
      </div>

      {/* =========================================
          FLOATING LOGIN CONTENT
      ========================================= */}
      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          right-5
          top-1/2
          z-20
          w-[calc(100%-40px)]
          max-w-[470px]
          -translate-y-1/2

          sm:right-8
          sm:w-[440px]

          lg:right-10
          xl:right-16
          2xl:right-24
        "
      >

        {/* Green glow */}
        <div
          className="
            absolute
            -inset-6
            -z-10
            rounded-[40px]
            bg-[#4ade80]/10
            blur-3xl
          "
        />

        {/* Login page gets rendered here */}
        {children}

      </motion.div>

    </main>
  );
}

export default AuthLayout;