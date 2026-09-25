import { useParams, useNavigate } from "react-router-dom";
import ClientChat from "../component/Chat/ClientChat";

export default function ClientChatPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  return <div className="h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white">
    <ClientChat conversationId={conversationId} onClose={() => navigate("/")} />
  </div>;
}