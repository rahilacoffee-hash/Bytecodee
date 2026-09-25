import{a as e}from"./rolldown-runtime-Cyuzqnbw.js";import{K as t}from"./icons-DEys5JSc.js";import{O as n,f as r,i,l as a,n as o,p as s,t as c,u as l,x as u}from"./react-aRLeHykK.js";import{a as d}from"./motion-PqCq2WR6.js";import{i as f}from"./admin.api-Dka4Wgpi.js";import{t as p}from"./AuthLayout-Ci-SWv0m.js";var m=e(t(),1),h=d();function g({label:e,type:t=`text`,name:n,value:i,onChange:o,placeholder:c,required:u=!0}){let[d,f]=(0,m.useState)(!1),p=t===`password`;return(0,h.jsxs)(`div`,{className:`mb-5`,children:[(0,h.jsx)(`label`,{htmlFor:n,className:`
          mb-2
          block
          text-[10px]
          uppercase
          tracking-[2px]
          text-[#9aa59e]
        `,children:e}),(0,h.jsxs)(`div`,{className:`relative`,children:[(0,h.jsx)(`div`,{className:`
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#6f7972]
          `,children:p?(0,h.jsx)(r,{size:17}):(0,h.jsx)(s,{size:17})}),(0,h.jsx)(`input`,{id:n,name:n,type:p&&d?`text`:t,value:i,onChange:o,placeholder:c,required:u,autoComplete:n,className:`
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
          `}),p&&(0,h.jsx)(`button`,{type:`button`,onClick:()=>f(e=>!e),className:`
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#6f7972]
              transition-colors
              hover:text-[#4ade80]
            `,children:d?(0,h.jsx)(l,{size:17}):(0,h.jsx)(a,{size:17})})]})]})}function _(){let e=n(),[t,r]=(0,m.useState)(``),[a,s]=(0,m.useState)(``),[l,d]=(0,m.useState)(``),[_,y]=(0,m.useState)(!1);return(0,h.jsx)(p,{children:(0,h.jsxs)(`div`,{className:`
          rounded-[28px]
          border
          border-white/[0.12]
          bg-[#0a0f0b]/90
          p-7
          shadow-2xl
          backdrop-blur-2xl

          sm:p-9
          md:p-10
        `,children:[(0,h.jsxs)(`div`,{className:`mb-9`,children:[(0,h.jsxs)(`div`,{className:`mb-5 flex items-center gap-3`,children:[(0,h.jsx)(`span`,{className:`h-px w-7 bg-[#4ade80]`}),(0,h.jsx)(`span`,{className:`
                text-[10px]
                uppercase
                tracking-[3px]
                text-[#4ade80]
              `,children:`Member Access`})]}),(0,h.jsx)(`h2`,{className:`
              text-4xl
              font-semibold
              tracking-tight
              text-[#f4f7f4]
            `,children:`Welcome back`}),(0,h.jsx)(`p`,{className:`
              mt-3
              text-sm
              leading-6
              text-[#9aa59e]
            `,children:`Sign in to continue to your Bytecode workspace.`})]}),(0,h.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),y(!0);try{await f({email:a.trim(),password:l}),e(`/admin`,{replace:!0})}catch(e){r(e?.response?.data?.message||`Unable to sign in.`)}finally{y(!1)}},children:[(0,h.jsx)(g,{label:`Email address`,type:`email`,name:`email`,value:a,onChange:e=>s(e.target.value),placeholder:`you@example.com`}),(0,h.jsx)(g,{label:`Password`,type:`password`,name:`password`,value:l,onChange:e=>d(e.target.value),placeholder:`Enter your password`}),(0,h.jsx)(`div`,{className:`mb-7 flex justify-end`,children:(0,h.jsx)(u,{to:`/forgot-password`,className:`
                text-xs
                text-[#9aa59e]
                transition-colors
                hover:text-[#4ade80]
              `,children:`Forgot password?`})}),(0,h.jsxs)(`button`,{type:`submit`,disabled:_,className:`
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
            `,children:[_?`Signing in...`:`Sign in`,!_&&(0,h.jsx)(i,{size:17,className:`
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                `})]})]}),(0,h.jsxs)(`div`,{className:`my-8 flex items-center gap-4`,children:[(0,h.jsx)(`div`,{className:`
              h-px
              flex-1
              bg-white/[0.10]
            `}),(0,h.jsx)(`span`,{className:`
              whitespace-nowrap
              text-[9px]
              uppercase
              tracking-[2px]
              text-[#6f7972]
            `,children:`Or continue with`}),(0,h.jsx)(`div`,{className:`
              h-px
              flex-1
              bg-white/[0.10]
            `})]}),(0,h.jsxs)(`div`,{className:`grid grid-cols-3 gap-3`,children:[(0,h.jsx)(v,{children:(0,h.jsx)(`span`,{className:`font-semibold`,children:`G`})}),(0,h.jsx)(v,{children:(0,h.jsx)(c,{size:15})}),(0,h.jsx)(v,{children:(0,h.jsx)(o,{size:15})})]}),(0,h.jsxs)(`p`,{className:`
            mt-7
            text-center
            text-[9px]
            leading-5
            text-[#6f7972]
          `,children:[`By continuing, you agree to our`,` `,(0,h.jsx)(u,{to:`/terms`,className:`
              text-[#4ade80]
              hover:underline
            `,children:`Terms of Service`}),` `,`and`,` `,(0,h.jsx)(u,{to:`/privacy`,className:`
              text-[#4ade80]
              hover:underline
            `,children:`Privacy Policy`}),`.`]}),(0,h.jsx)(`div`,{className:`
            mt-7
            border-t
            border-white/[0.08]
            pt-6
          `,children:(0,h.jsxs)(`p`,{className:`
              text-center
              text-sm
              text-[#9aa59e]
            `,children:[`Don't have an account?`,` `,(0,h.jsx)(u,{to:`/register`,className:`
                font-medium
                text-[#4ade80]
                hover:underline
              `,children:`Create account`})]})})]})})}function v({children:e}){return(0,h.jsx)(`button`,{type:`button`,className:`
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
      `,children:e})}export{_ as default};