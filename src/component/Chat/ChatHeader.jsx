import React from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  X,
} from "lucide-react";

const serviceLabels = {
  LANDING_PAGE: "Landing Page",
  BUSINESS_WEBSITE: "Business Website",
  WEB_APPLICATION: "Web Application",
  CUSTOM: "Custom Project",
};

function getServiceLabel(service) {
  return serviceLabels[service] || "Project";
}

function getConnectionState(status) {
  switch (status) {
    case "connected":
      return {
        label: "Online",
        className: "bg-[#4ade80]",
      };

    case "connecting":
      return {
        label: "Connecting",
        className: "bg-yellow-400",
      };

    case "disconnected":
      return {
        label: "Reconnecting",
        className: "bg-yellow-400",
      };

    case "error":
      return {
        label: "Connection error",
        className: "bg-red-400",
      };

    default:
      return {
        label: "Offline",
        className: "bg-white/30",
      };
  }
}

export default function ChatHeader({
  service = "CUSTOM",
  conversation = null,
  connectionStatus = "connecting",
  onBack,
  onClose,
}) {
  const connection =
    getConnectionState(connectionStatus);

  const title =
    conversation?.title ||
    getServiceLabel(
      conversation?.service || service
    );

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#090909] px-4 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile back */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to conversations"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/55 transition hover:bg-white/[0.07] hover:text-white md:hidden"
        >
          <ArrowLeft size={17} />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#4ade80]/20 bg-[#4ade80]/[0.08] text-xs font-bold text-[#4ade80]">
          B
        </div>

        {/* Conversation details */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-white">
              BYTECODEE
            </h2>

            <span
              className={`h-1.5 w-1.5 rounded-full ${connection.className}`}
            />
          </div>

          <div className="mt-0.5 flex min-w-0 items-center gap-2">
            <p className="truncate text-[10px] text-white/30">
              {title}
            </p>

            <span className="text-white/10">
              •
            </span>

            <p className="shrink-0 text-[10px] text-white/25">
              {connection.label}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Conversation options"
          className="hidden h-9 w-9 items-center justify-center rounded-xl text-white/30 transition hover:bg-white/[0.05] hover:text-white/70 sm:flex"
        >
          <MoreHorizontal size={18} />
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/35 transition hover:bg-white/[0.07] hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </header>
  );
}
