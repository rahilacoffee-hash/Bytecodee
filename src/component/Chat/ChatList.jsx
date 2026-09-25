import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  MessageCircle,
  RefreshCw,
  Search,
  Sparkles,
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

function getInitials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) return "B";

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getLastMessage(conversation) {
  const message =
    conversation?.lastMessage ||
    conversation?.messages?.[
      conversation.messages.length - 1
    ];

  if (!message?.content) {
    return "No messages yet";
  }

  return message.content;
}

function formatTime(date) {
  if (!date) return "";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  const now = new Date();

  const sameDay =
    value.getDate() === now.getDate() &&
    value.getMonth() === now.getMonth() &&
    value.getFullYear() === now.getFullYear();

  if (sameDay) {
    return value.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return value.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  });
}

export default function ChatList({
  conversations = [],
  selectedConversationId,
  onSelectConversation,
  loading = false,
  error = "",
  onRetry,
}) {
  const [query, setQuery] = useState("");
  const filteredConversations = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return conversations;
    return conversations.filter((conversation) => [conversation?.client?.name, conversation?.client?.email, getServiceLabel(conversation?.service), getLastMessage(conversation)].filter(Boolean).join(" ").toLowerCase().includes(term));
  }, [conversations, query]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#090909]">
      {/* Header */}
      <div className="shrink-0 border-b border-white/[0.07] px-5 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#4ade80]">
              BYTECODEE
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
              Conversations
            </h2>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/45">
            <MessageCircle size={17} />
          </div>
        </div>

        {/* Search UI */}
        <div className="mt-5 flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3">
          <Search
            size={14}
            className="shrink-0 text-white/25"
          />

          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search conversations" placeholder="Search conversations" className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20" />
        </div>
      </div>

      {/* List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-2 p-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex animate-pulse items-center gap-3 rounded-2xl p-3"
              >
                <div className="h-11 w-11 rounded-full bg-white/[0.06]" />

                <div className="min-w-0 flex-1">
                  <div className="h-3 w-28 rounded bg-white/[0.06]" />
                  <div className="mt-2 h-2.5 w-40 rounded bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        ) : error && conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-400/10 text-red-400">
              <AlertCircle size={19} />
            </div>

            <p className="mt-4 text-xs leading-5 text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={onRetry}
              className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60 transition hover:bg-white/[0.08] hover:text-white"
            >
              <RefreshCw size={12} />
              Try again
            </button>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/25">
              <Sparkles size={19} />
            </div>

            <h3 className="mt-4 text-sm font-medium text-white/75">
              No conversations yet
            </h3>

            <p className="mt-2 text-xs leading-5 text-white/30">
              Start a project to create your first
              conversation.
            </p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6 text-center"><p className="text-xs text-white/35">No conversations match “{query}”.</p></div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => {
              const selected =
                conversation.id ===
                selectedConversationId;

              const unread =
                Number(conversation.unreadCount) || 0;

              const lastMessage =
                getLastMessage(conversation);

              const timestamp =
                conversation.updatedAt ||
                conversation.createdAt;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() =>
                    onSelectConversation(
                      conversation.id
                    )
                  }
                  className={`group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                    selected
                      ? "bg-[#4ade80]/[0.08]"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      selected
                        ? "border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80]"
                        : "border-white/10 bg-white/[0.04] text-white/45"
                    }`}
                  >
                    {getInitials(
                      conversation?.client?.name ||
                        "BYTECODEE"
                    )}

                    {unread > 0 && (
                      <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[#4ade80] px-1 text-[9px] font-bold text-black">
                        {unread > 9 ? "9+" : unread}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`truncate text-[13px] font-medium ${
                          selected
                            ? "text-white"
                            : "text-white/80"
                        }`}
                      >
                        {getServiceLabel(
                          conversation.service
                        )}
                      </p>

                      <span
                        className={`shrink-0 text-[10px] ${
                          unread > 0
                            ? "text-[#4ade80]"
                            : "text-white/20"
                        }`}
                      >
                        {formatTime(timestamp)}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p
                        className={`truncate text-[11px] ${
                          unread > 0
                            ? "font-medium text-white/55"
                            : "text-white/30"
                        }`}
                      >
                        {lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/[0.07] px-5 py-4">
        <p className="text-center text-[9px] uppercase tracking-[0.14em] text-white/15">
          Private client communication
        </p>
      </div>
    </div>
  );
}
