import React, {
  useEffect,
  useRef,
} from "react";
import { MessageCircle } from "lucide-react";

import MessageBubble from "./MessageBubble";
import {
  formatMessageDate,
  isSameDay,
} from "./chat.utils";

export default function MessageList({
  messages = [],
  typing = false,
}) {
  const containerRef =
    useRef(null);

  const bottomRef =
    useRef(null);

  const shouldAutoScrollRef =
    useRef(true);

  /*
   * Detect whether the user is already near
   * the bottom before a new message arrives.
   */
  const handleScroll = () => {
    const element =
      containerRef.current;

    if (!element) return;

    const distanceFromBottom =
      element.scrollHeight -
      element.scrollTop -
      element.clientHeight;

    shouldAutoScrollRef.current =
      distanceFromBottom < 120;
  };

  /*
   * Scroll when messages change.
   */
  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length, typing]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto overscroll-contain px-4 py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 sm:px-6"
    >
      {messages.length === 0 ? (
        <EmptyConversation />
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-1">
          {messages.map(
            (message, index) => {
              const previousMessage =
                messages[index - 1];

              const showDate =
                !previousMessage ||
                !isSameDay(
                  previousMessage.createdAt,
                  message.createdAt
                );

              return (
                <React.Fragment
                  key={message.id}
                >
                  {showDate && (
                    <DateSeparator
                      date={message.createdAt}
                    />
                  )}

                  <MessageBubble
                    message={message}
                  />
                </React.Fragment>
              );
            }
          )}

          {typing && (
            <TypingIndicator />
          )}

          <div
            ref={bottomRef}
            className="h-px"
          />
        </div>
      )}
    </div>
  );
}

function DateSeparator({
  date,
}) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-white/[0.05]" />

      <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.14em] text-white/20">
        {formatMessageDate(date)}
      </span>

      <div className="h-px flex-1 bg-white/[0.05]" />
    </div>
  );
}

function EmptyConversation() {
  return (
    <div className="flex h-full min-h-[300px] items-center justify-center">
      <div className="flex max-w-xs flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4ade80]/10 text-[#4ade80]">
          <MessageCircle size={21} />
        </div>

        <h3 className="mt-4 text-sm font-medium text-white">
          Start the conversation
        </h3>

        <p className="mt-2 text-xs leading-5 text-white/30">
          Send a message and let’s talk about
          your project.
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="mt-2 flex items-end gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-[9px] font-semibold text-[#4ade80]">
        B
      </div>

      <div className="rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.035] px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}