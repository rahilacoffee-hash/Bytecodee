import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Bell, Loader2, RefreshCw } from "lucide-react";

import {
  getMessages,
  sendMessage,
  markMessagesRead,
} from "../../Services/message.api";

import { getMyConversations } from "../../Services/conversation.api";

import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

import { mergeMessages, normalizeMessage } from "./chat.utils";
import { getMyQuotes, decideQuote } from "../../Services/quote.api";
import { getMyProjects } from "../../Services/project.api";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

const serviceLabels = {
  LANDING_PAGE: "Landing Page",
  BUSINESS_WEBSITE: "Business Website",
  WEB_APPLICATION: "Web Application",
  CUSTOM: "Custom Project",
};

export default function ClientChat({
  conversationId: initialConversationId = null,
  service = "CUSTOM",
  onClose,
}) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(
    initialConversationId,
  );

  const [loadingConversations, setLoadingConversations] = useState(true);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [sending, setSending] = useState(false);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quoteAction, setQuoteAction] = useState("");

  const [mobileView, setMobileView] = useState(
    initialConversationId ? "chat" : "list",
  );

  const typingTimeoutRef = useRef(null);

  const selectedConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === selectedConversationId,
      ) || null,
    [conversations, selectedConversationId],
  );

  const loadConversations = useCallback(async () => {
    setLoadingConversations(true);
    setError("");

    try {
      const response = await getMyConversations();

      const loaded =
        response?.data?.conversations || response?.conversations || [];

      setConversations(loaded);

      if (
        initialConversationId &&
        loaded.some((conversation) => conversation.id === initialConversationId)
      ) {
        setSelectedConversationId(initialConversationId);
      }
    } catch (requestError) {
      console.error("Unable to load conversations:", requestError);

      setError(
        requestError?.response?.data?.message ||
          "Unable to load your conversations.",
      );
    } finally {
      setLoadingConversations(false);
    }
  }, [initialConversationId, selectedConversationId]);

  const loadQuotes = useCallback(async () => {
    try { const response = await getMyQuotes(); setQuotes(response?.data?.quotes || response?.quotes || []); } catch { /* Quotes remain available on the next retry. */ }
  }, []);

  const loadProjects = useCallback(async () => {
    try { const response = await getMyProjects(); setProjects(response?.data?.projects || response?.projects || []); } catch { /* Projects remain available on the next retry. */ }
  }, []);

  const respondToQuote = async (quoteId, status) => {
    setQuoteAction(quoteId);
    try { await decideQuote(quoteId, status); await loadQuotes(); } catch (requestError) { setError(requestError?.response?.data?.message || "Unable to update this quote."); } finally { setQuoteAction(""); }
  };

  useEffect(() => {
    loadConversations();
    loadQuotes();
    loadProjects();
  }, [loadConversations]);

  const loadMessages = useCallback(async () => {
    if (!selectedConversationId) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);
    setError("");
    setTyping(false);

    try {
      const response = await getMessages(selectedConversationId);

      const loadedMessages =
        response?.data?.messages || response?.messages || [];

      const normalizedMessages = loadedMessages
        .map(normalizeMessage)
        .filter(Boolean);

      setMessages(normalizedMessages);

      try {
        await markMessagesRead(selectedConversationId);
      } catch (readError) {
        console.warn("Unable to mark messages as read:", readError);
      }

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === selectedConversationId
            ? {
                ...conversation,
                unreadCount: 0,
              }
            : conversation,
        ),
      );
    } catch (requestError) {
      console.error("Unable to load messages:", requestError);

      setError(
        requestError?.response?.data?.message ||
          "Unable to load your messages.",
      );
    } finally {
      setLoadingMessages(false);
    }
  }, [selectedConversationId, loadQuotes]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (!selectedConversationId) {
      setMobileView("list");
    }
  }, [selectedConversationId]);

  useEffect(() => {
    if (!selectedConversationId) return;

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      path: "/socket.io/",
      timeout: 10000,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    setSocket(newSocket);
    setConnectionStatus("connecting");

    const handleConnect = () => {
      setConnectionStatus("connected");

      newSocket.emit("conversation:join", selectedConversationId);
    };

    const handleConnectError = (socketError) => {
      console.error("Chat socket connection error:", socketError);

      setConnectionStatus("error");
    };

    const handleDisconnect = () => {
      setConnectionStatus("disconnected");
    };

    const handleNewMessage = (message) => {
      if (!message?.conversationId || !message?.id) {
        return;
      }

      const normalized = normalizeMessage(message);

      if (!normalized) return;

      if (message.conversationId === selectedConversationId) {
        setMessages((previous) => mergeMessages(previous, [normalized]));

        if (message.senderType === "ADMIN") {
          markMessagesRead(selectedConversationId).catch(() => {});
          if (document.hidden) {
            setNotificationMessage(message.content);
            if ("Notification" in window && Notification.permission === "granted") new Notification("Bytecode", { body: message.content, tag: message.id });
          }
        }
      }

      setConversations((previous) => {
        const exists = previous.some(
          (conversation) => conversation.id === message.conversationId,
        );

        if (!exists) {
          return previous;
        }

        return previous
          .map((conversation) =>
            conversation.id === message.conversationId
              ? {
                  ...conversation,
                  updatedAt: message.createdAt || new Date().toISOString(),
                  lastMessage: message,
                  unreadCount:
                    message.conversationId === selectedConversationId
                      ? 0
                      : (conversation.unreadCount || 0) +
                        (message.senderType === "ADMIN" ? 1 : 0),
                }
              : conversation,
          )
          .sort(
            (a, b) =>
              new Date(b.updatedAt || 0).getTime() -
              new Date(a.updatedAt || 0).getTime(),
          );
      });
    };

    const handleConversationUpdated = (conversation) => {
      if (!conversation?.id) return;

      setConversations((previous) => {
        const exists = previous.some((item) => item.id === conversation.id);

        if (!exists) {
          return previous;
        }

        return previous
          .map((item) =>
            item.id === conversation.id
              ? {
                  ...item,
                  ...conversation,
                }
              : item,
          )
          .sort(
            (a, b) =>
              new Date(b.updatedAt || 0).getTime() -
              new Date(a.updatedAt || 0).getTime(),
          );
      });
    };

    const handleTypingStart = (data) => {
      if (data?.conversationId !== selectedConversationId) {
        return;
      }

      if (data?.senderType !== "ADMIN") return;

      setTyping(true);
    };

    const handleTypingStop = (data) => {
      if (data?.conversationId !== selectedConversationId) {
        return;
      }

      if (data?.senderType !== "ADMIN") return;

      setTyping(false);
    };

    const handleSocketError = (socketError) => {
      console.error("Socket error:", socketError);
    };

    newSocket.on("connect", handleConnect);
    newSocket.on("connect_error", handleConnectError);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("message:new", handleNewMessage);
    newSocket.on("conversation:updated", handleConversationUpdated);
    newSocket.on("typing:start", handleTypingStart);
    newSocket.on("typing:stop", handleTypingStop);
    const handleQuoteNotification = (notice) => { if (notice?.type === "QUOTE_SENT") { loadQuotes(); setNotificationMessage("You received a new quote."); } if (notice?.type === "PROJECT_CREATED" || notice?.type === "PROJECT_STARTED") { loadProjects(); setNotificationMessage(notice.message || "Your project has been updated."); } };
    newSocket.on("socket:error", handleSocketError);
    newSocket.on("notification:new", handleQuoteNotification);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (newSocket.connected) {
        newSocket.emit("conversation:leave", selectedConversationId);
      }

      newSocket.off("connect", handleConnect);
      newSocket.off("connect_error", handleConnectError);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("message:new", handleNewMessage);
      newSocket.off("conversation:updated", handleConversationUpdated);
      newSocket.off("typing:start", handleTypingStart);
      newSocket.off("typing:stop", handleTypingStop);
      newSocket.off("socket:error", handleSocketError);
      newSocket.off("notification:new", handleQuoteNotification);

      newSocket.disconnect();
      setSocket(null);
    };
  }, [selectedConversationId]);

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
    setMobileView("chat");
    setError("");
  };

  const handleBackToList = () => {
    setMobileView("list");
    setTyping(false);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (socket?.connected && selectedConversationId) {
      socket.emit("conversation:leave", selectedConversationId);
    }
  };

  const handleSendMessage = async (content) => {
    if (!selectedConversationId) return;

    const cleanContent = content.trim();

    if (!cleanContent || sending) return;

    setSending(true);
    setError("");

    try {
      const response = await sendMessage(selectedConversationId, cleanContent);

      const createdMessage = response?.data?.message || response?.message;

      if (createdMessage) {
        const normalized = normalizeMessage(createdMessage);

        if (normalized) {
          setMessages((previous) => mergeMessages(previous, [normalized]));

          setConversations((previous) =>
            previous
              .map((conversation) =>
                conversation.id === selectedConversationId
                  ? {
                      ...conversation,
                      updatedAt: createdMessage.createdAt,
                      lastMessage: createdMessage,
                    }
                  : conversation,
              )
              .sort(
                (a, b) =>
                  new Date(b.updatedAt || 0).getTime() -
                  new Date(a.updatedAt || 0).getTime(),
              ),
          );
        }
      }

      if (socket?.connected) {
        socket.emit("typing:stop", selectedConversationId);
      }
    } catch (requestError) {
      console.error("Unable to send message:", requestError);

      setError(
        requestError?.response?.data?.message || "Unable to send your message.",
      );

      throw requestError;
    } finally {
      setSending(false);
    }
  };

  const handleTypingStart = () => {
    if (!socket?.connected || !selectedConversationId) {
      return;
    }

    socket.emit("typing:start", selectedConversationId);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing:stop", selectedConversationId);
    }, 2000);
  };

  const handleRetry = () => {
    if (selectedConversationId) {
      loadMessages();
    }

    loadConversations();

    if (socket && !socket.connected) {
      socket.connect();
    }
  };

  const hasSelectedConversation = Boolean(selectedConversationId);
  const enableNotifications = async () => { if ("Notification" in window) await Notification.requestPermission(); };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="chat-dark relative flex h-full min-h-0 w-full overflow-hidden bg-[#0a0a0a] text-white shadow-2xl md:border md:border-white/10 md:shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
    >
      {notificationMessage && <button type="button" onClick={() => setNotificationMessage(null)} className="absolute right-4 top-4 z-30 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-xl border border-[#4ade80]/30 bg-[#102016] px-3 py-2 text-left text-xs text-white shadow-xl"><Bell size={14} className="shrink-0 text-[#4ade80]" /><span className="truncate">New reply: {notificationMessage}</span></button>}
      {/* Desktop conversation list */}
      <aside className="hidden h-full w-[340px] shrink-0 border-r border-white/10 bg-[#0a0a0a] md:flex md:flex-col lg:w-[380px]">
        <ChatList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loadingConversations}
          error={error}
          onRetry={handleRetry}
        />
      </aside>

      {/* Mobile list */}
      <div
        className={`h-full w-full md:hidden ${
          mobileView === "list" ? "block" : "hidden"
        }`}
      >
        <ChatList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loadingConversations}
          error={error}
          onRetry={handleRetry}
        />
      </div>

      {/* Chat screen */}
      <section
        className={`min-w-0 flex-1 ${
          mobileView === "chat" ? "flex" : "hidden md:flex"
        } flex-col bg-[#0a0a0a]`}
      >
        {hasSelectedConversation ? (
          <>
            <ChatHeader
              service={selectedConversation?.service || service}
              conversation={selectedConversation}
              connectionStatus={connectionStatus}
              onBack={handleBackToList}
              onClose={onClose}
            />

            {"Notification" in window && Notification.permission === "default" && <button type="button" onClick={enableNotifications} className="mx-4 mt-3 self-start rounded-lg border border-[#4ade80]/30 bg-[#4ade80]/10 px-3 py-1.5 text-[11px] font-medium text-[#4ade80] transition hover:bg-[#4ade80]/20">Turn on reply notifications</button>}

            {quotes.filter(quote => quote.status === "SENT").map(quote => <div key={quote.id} className="mx-4 mt-3 rounded-xl border border-[#4ade80]/30 bg-[#4ade80]/10 p-3 text-sm text-white sm:mx-6"><p className="font-semibold text-[#4ade80]">New quote · ₦{Number(quote.amount).toLocaleString()}</p><p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-white/70">{quote.description}</p>{quote.expiresAt&&<p className="mt-2 text-[11px] text-white/45">Valid until {new Date(quote.expiresAt).toLocaleDateString()}</p>}<div className="mt-3 flex gap-2"><button disabled={quoteAction===quote.id} onClick={()=>respondToQuote(quote.id,"ACCEPTED")} className="rounded-lg bg-[#4ade80] px-3 py-2 text-xs font-semibold text-black disabled:opacity-50">Accept</button><button disabled={quoteAction===quote.id} onClick={()=>respondToQuote(quote.id,"REJECTED")} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 disabled:opacity-50">Reject</button></div></div>)}

            <div className="relative min-h-0 flex-1">
              {loadingMessages ? (
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2
                      size={22}
                      className="animate-spin text-[#4ade80]"
                    />
                    <p className="text-xs text-white/40">
                      Loading conversation...
                    </p>
                  </div>
                </div>
              ) : error && messages.length === 0 ? (
                <div className="flex h-full items-center justify-center p-6">
                  <div className="flex max-w-sm flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                      <AlertCircle size={22} />
                    </div>

                    <h3 className="mt-4 text-sm font-medium text-white">
                      Something went wrong
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/45">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/60 transition hover:bg-white/[0.08] hover:text-white"
                    >
                      <RefreshCw size={13} />
                      Try again
                    </button>
                  </div>
                </div>
              ) : (
                <MessageList messages={messages} typing={typing} />
              )}

              <AnimatePresence>
                {error && messages.length > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-red-400/20 bg-[#151515]/95 px-3 py-2 text-xs text-red-400 shadow-xl backdrop-blur"
                  >
                    <AlertCircle size={13} />
                    <span>{error}</span>
                    <button
                      type="button"
                      onClick={() => setError("")}
                      className="ml-1 text-white/40 hover:text-white"
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ChatInput
              onSend={handleSendMessage}
              onTyping={handleTypingStart}
              disabled={loadingMessages || sending}
              sending={sending}
            />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/[0.08] text-[#4ade80]">
              <span className="text-xl font-bold">B</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Your conversations
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-white/40">
              Select a conversation from the list to continue chatting with
              BYTECODE.
            </p>
          </div>
        )}
      </section>
    </motion.div>
  );
}
