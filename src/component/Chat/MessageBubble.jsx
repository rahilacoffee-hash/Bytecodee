import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  CheckCheck,
} from "lucide-react";

import {
  formatMessageTime,
  isClientMessage,
} from "./chat.utils";

export default function MessageBubble({
  message,
}) {
  const isClient =
    isClientMessage(message);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`flex w-full ${
        isClient
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[85%] items-end gap-2 sm:max-w-[72%] ${
          isClient
            ? "flex-row-reverse"
            : "flex-row"
        }`}
      >
        {/* Admin avatar */}
        {!isClient && (
          <div className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4ade80]/10 text-[9px] font-bold text-[#4ade80] ring-1 ring-[#4ade80]/10">
            B
          </div>
        )}

        <div
          className={`group relative rounded-2xl px-4 py-3 ${
            isClient
              ? "rounded-br-md bg-[#4ade80] text-black"
              : "rounded-bl-md border border-white/[0.07] bg-white/[0.035] text-white"
          }`}
        >
          {!isClient && (
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#4ade80]/60">
              BYTECODEE
            </p>
          )}

          <p
            className={`whitespace-pre-wrap break-words text-[13px] leading-5 ${
              isClient
                ? "text-black/85"
                : "text-white/75"
            }`}
          >
            {message.content}
          </p>

          <div
            className={`mt-1.5 flex items-center justify-end gap-1.5 ${
              isClient
                ? "text-black/40"
                : "text-white/20"
            }`}
          >
            <span className="text-[9px]">
              {formatMessageTime(
                message.createdAt
              )}
            </span>

            {isClient && (
              <ReadStatus
                readAt={message.readAt}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReadStatus({
  readAt,
}) {
  if (readAt) {
    return (
      <CheckCheck
        size={12}
        strokeWidth={2.5}
        className="text-black/60"
      />
    );
  }

  return (
    <Check
      size={12}
      strokeWidth={2.5}
      className="text-black/40"
    />
  );
}