import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMyConversations } from "../../Services/conversation.api";

const serviceLabels = {
  LANDING_PAGE: "Landing Page",
  BUSINESS_WEBSITE: "Business Website",
  WEB_APPLICATION: "Web Application",
  CUSTOM: "Custom Project",
};

function getPreview(conversation) {
  const message =
    conversation?.lastMessage ||
    conversation?.messages?.[conversation.messages.length - 1];

  return message?.content || "Continue where you left off";
}

export default function HomeConversationBubble() {
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    let active = true;

    getMyConversations()
      .then((response) => {
        const conversations =
          response?.data?.conversations || response?.conversations || [];

        if (active && conversations.length > 0) {
          setConversation(conversations[0]);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  if (!conversation?.id) return null;

  const service = conversation.service || "CUSTOM";

  return (
    <button
      type="button"
      onClick={() =>
        navigate(
          `/client-chat?service=${encodeURIComponent(service)}&conversationId=${encodeURIComponent(conversation.id)}`,
        )
      }
      className="fixed bottom-5 right-5 z-[1001] flex  items-center gap-3 rounded-full border border-[#b8e6bd] bg-black p-3 text-left shadow-[0_14px_36px_rgba(18,140,126,0.24)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(18,140,126,0.3)]"
      aria-label="Continue previous conversation"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#128c7e]">
        <MessageCircle size={21} />
      </span>

      
    </button>
  );
}
