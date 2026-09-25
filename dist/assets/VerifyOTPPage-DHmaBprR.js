import{a as e}from"./rolldown-runtime-Cyuzqnbw.js";import{K as t}from"./icons-DEys5JSc.js";import{i as n}from"./react-aRLeHykK.js";import{a as r}from"./motion-PqCq2WR6.js";import{t as i}from"./AuthLayout-Ci-SWv0m.js";var a=e(t(),1),o=r();function s(){let[e,t]=(0,a.useState)([``,``,``,``,``,``]),[r,s]=(0,a.useState)(``),c=(0,a.useRef)([]),[l,u]=(0,a.useState)(!1);(0,a.useEffect)(()=>{c.current[0]?.focus()},[]);let d=async e=>{e.preventDefault(),u(!0);try{console.log({email,password})}catch(e){console.error(e)}finally{u(!1)}};function f(n,r){if(!/^\d*$/.test(n))return;let i=[...e];i[r]=n.slice(-1),t(i),s(``),n&&r<5&&c.current[r+1]?.focus()}let p=(e,t,n)=>{n.key===`Backspace`&&!e.value&&t>0&&document.getElementById(`otp-input-${t-1}`).focus()};function m(n){n.preventDefault();let r=n.clipboardData.getData(`text`).replace(/\D/g,``).slice(0,6),i=[...e];r.split(``).forEach((e,t)=>{i[t]=e}),t(i),c.current[Math.min(r.length,5)]?.focus()}return(0,o.jsx)(i,{children:(0,o.jsxs)(`div`,{className:`
          rounded-[28px]
          border
          border-white/[0.12]
          bg-[#0a0f0b]/90
          p-7
          shadow-2xl
          backdrop-blur-2xl

          sm:p-9
          md:p-10
        `,children:[(0,o.jsxs)(`div`,{className:`mb-9`,children:[(0,o.jsxs)(`div`,{className:`mb-5 flex items-center gap-3`,children:[(0,o.jsx)(`span`,{className:`h-px w-7 bg-[#4ade80]`}),(0,o.jsx)(`span`,{className:`
                text-[10px]
                uppercase
                tracking-[3px]
                text-[#4ade80]
              `,children:`Member Access`})]}),(0,o.jsx)(`h2`,{className:`
              text-4xl
              font-semibold
              tracking-tight
              text-[#f4f7f4]
            `,children:`Verify Your Email`}),(0,o.jsxs)(`p`,{className:`
              mt-3
              text-sm
              leading-6
              text-[#9aa59e]
            `,children:[`We sent a 6-digit OTP to`,` `]})]}),(0,o.jsxs)(`form`,{onSubmit:d,children:[(0,o.jsx)(`div`,{className:`flex items-center justify-center gap-3 mb-8`,onPaste:m,children:e.map((e,t)=>(0,o.jsx)(`input`,{type:`text`,inputMode:`numeric`,maxLength:1,value:e,onChange:e=>f(e.target.value,t),onKeyDown:e=>p(e,t),className:`w-9 h-10 sm:w-9 sm:h-10 text-center text-xl font-bold rounded-xl border border-white/[0.12]outline-none transition-all duration-200 ${e?` bg-[#4ade80] text-black-600`:`border-gray-200 text-gray-700 focus:border-[#4ade80]/60`}`},t))}),(0,o.jsxs)(`button`,{type:`submit`,disabled:l,className:`
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
            `,children:[l?`Verifying...`:`Verify OTP`,!l&&(0,o.jsx)(n,{size:17,className:`
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                `})]})]})]})})}export{s as default};