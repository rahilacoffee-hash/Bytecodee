import{o as e,v as t}from"./icons-DEys5JSc.js";import{a as n}from"./motion-PqCq2WR6.js";var r=n();function i({isNight:n,onToggle:i,className:a=``}){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(`button`,{onClick:i,type:`button`,className:`
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
            `,children:[(0,r.jsx)(`div`,{className:`
              absolute
              inset-0
              rounded-full
              ${n?`bg-[#16834a]/10`:`bg-yellow-400/10`}
              `}),(0,r.jsx)(`div`,{className:`
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
              ${n?`translate-x-7 bg-[#16834a]`:`translate-x-0 bg-white`}
              `,children:n?(0,r.jsx)(t,{className:`text-white text-sm`}):(0,r.jsx)(e,{className:`text-yellow-500 text-sm`})})]})})}export{i as t};