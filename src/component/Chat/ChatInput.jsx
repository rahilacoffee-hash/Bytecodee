import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUp,
  Loader2,
  Paperclip,
} from "lucide-react";

export default function ChatInput({
  onSend,
  onTyping,
  disabled = false,
  sending = false,
}) {
  const [value, setValue] =
    useState("");

  const textareaRef =
    useRef(null);

  /*
   * Keep the textarea height comfortable.
   */
  const resizeTextarea = () => {
    const textarea =
      textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      140
    )}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);

    if (
      event.target.value.trim()
    ) {
      onTyping?.();
    }
  };

  const handleSubmit = async () => {
    const content = value.trim();

    if (!content) return;
    if (disabled) return;
    if (sending) return;

    try {
      await onSend(content);

      setValue("");

      requestAnimationFrame(() => {
        resizeTextarea();
        textareaRef.current?.focus();
      });
    } catch {
      /*
       * Keep the message in the input if
       * sending failed so the user doesn't
       * lose what they typed.
       */
    }
  };

  const handleKeyDown = (event) => {
    /*
     * Enter sends.
     *
     * Shift + Enter creates a new line.
     */
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSubmit();
    }
  };

  const canSend =
    value.trim().length > 0 &&
    !disabled &&
    !sending;

  return (
    <div className="shrink-0 border-t border-white/[0.08] bg-[#090909]/95 p-3 backdrop-blur-xl sm:p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-2 transition focus-within:border-white/15">
        {/* Attachment placeholder */}

        <button
          type="button"
          disabled
          className="mb-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/15 sm:flex"
          title="Attachments coming soon"
        >
          <Paperclip size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          maxLength={5000}
          placeholder={
            disabled
              ? "Connecting..."
              : "Type your message..."
          }
          className="max-h-[140px] min-h-[38px] flex-1 resize-none bg-transparent px-2 py-2 text-[13px] leading-5 text-white outline-none placeholder:text-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Send */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSend}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4ade80] text-black transition hover:bg-[#65e98f] disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-white/20"
          aria-label="Send message"
        >
          {sending ? (
            <Loader2
              size={15}
              className="animate-spin"
            />
          ) : (
            <ArrowUp
              size={16}
              strokeWidth={2.5}
            />
          )}
        </button>
      </div>

      <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between px-1">
        <p className="text-[9px] text-white/15">
          Press Enter to send · Shift + Enter
          for a new line
        </p>

        <p className="text-[9px] text-white/15">
          {value.length}/5000
        </p>
      </div>
    </div>
  );
}