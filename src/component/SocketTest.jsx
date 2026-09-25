import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

const CONVERSATION_ID =
  "cmu8pkyc80001rdi0d4212yal";

export default function SocketTest() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      path: "/socket.io/",
      timeout: 10000,
    });

    setSocket(newSocket);

    const handleConnect = () => {
      console.log(
        "🔌 Socket connected:",
        newSocket.id
      );

      setStatus("Connected");
    };

    const handleConnectError = (error) => {
      console.error(
        "❌ Socket connection error:",
        error
      );

      setStatus(
        `Connection failed: ${error.message}`
      );
    };

    const handleManagerError = (error) => {
      console.error(
        "❌ Socket manager error:",
        error
      );
    };

    const handleDisconnect = (reason) => {
      console.log(
        "🔌 Socket disconnected:",
        reason
      );

      setStatus("Disconnected");
      setJoined(false);
    };

    const handleNewMessage = (message) => {
      console.log(
        "💬 New message:",
        message
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "message",
          data: message,
        },
      ]);
    };

    const handleConversationUpdated = (
      conversation
    ) => {
      console.log(
        "🔄 Conversation updated:",
        conversation
      );
    };

    const handleNotification = (
      notification
    ) => {
      console.log(
        "🔔 Notification:",
        notification
      );
    };

    const handleConversationJoined = (
      data
    ) => {
      console.log(
        "✅ Joined conversation:",
        data
      );

      setJoined(true);
    };

    const handleSocketError = (error) => {
      console.error(
        "❌ Socket error:",
        error
      );
    };

    newSocket.on(
      "connect",
      handleConnect
    );

    newSocket.on(
      "connect_error",
      handleConnectError
    );

    newSocket.io.on(
      "error",
      handleManagerError
    );

    newSocket.on(
      "disconnect",
      handleDisconnect
    );

    newSocket.on(
      "message:new",
      handleNewMessage
    );

    newSocket.on(
      "conversation:updated",
      handleConversationUpdated
    );

    newSocket.on(
      "notification:new",
      handleNotification
    );

    newSocket.on(
      "conversation:joined",
      handleConversationJoined
    );

    newSocket.on(
      "socket:error",
      handleSocketError
    );

    return () => {
      newSocket.off(
        "connect",
        handleConnect
      );

      newSocket.off(
        "connect_error",
        handleConnectError
      );

      newSocket.io.off(
        "error",
        handleManagerError
      );

      newSocket.off(
        "disconnect",
        handleDisconnect
      );

      newSocket.off(
        "message:new",
        handleNewMessage
      );

      newSocket.off(
        "conversation:updated",
        handleConversationUpdated
      );

      newSocket.off(
        "notification:new",
        handleNotification
      );

      newSocket.off(
        "conversation:joined",
        handleConversationJoined
      );

      newSocket.off(
        "socket:error",
        handleSocketError
      );

      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const joinConversation = () => {
      console.log(
        "💬 Joining conversation:",
        CONVERSATION_ID
      );

      socket.emit(
        "conversation:join",
        CONVERSATION_ID
      );
    };

    if (socket.connected) {
      joinConversation();
    }

    socket.on(
      "connect",
      joinConversation
    );

    return () => {
      socket.off(
        "connect",
        joinConversation
      );

      if (socket.connected) {
        socket.emit(
          "conversation:leave",
          CONVERSATION_ID
        );
      }

      setJoined(false);
    };
  }, [socket]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#050816",
        color: "#fff",
        fontFamily:
          "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>
          BYTECODEE Socket Test
        </h1>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            borderRadius: "12px",
            background: "#111827",
          }}
        >
          <p>
            Status:{" "}
            <strong>{status}</strong>
          </p>

          <p>
            Conversation:{" "}
            <strong>
              {CONVERSATION_ID}
            </strong>
          </p>

          <p>
            Conversation room:{" "}
            <strong>
              {joined
                ? "Joined ✅"
                : "Not joined"}
            </strong>
          </p>
        </div>

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <h2>
            Incoming Messages
          </h2>

          {messages.length === 0 ? (
            <div
              style={{
                marginTop: "1rem",
                padding: "1.5rem",
                borderRadius: "12px",
                background: "#111827",
              }}
            >
              <p>
                No messages received yet.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {messages.map(
                (item, index) => (
                  <pre
                    key={`${item.data.id || "message"}-${index}`}
                    style={{
                      padding: "1rem",
                      borderRadius:
                        "12px",
                      background:
                        "#111827",
                      overflowX: "auto",
                      whiteSpace:
                        "pre-wrap",
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {JSON.stringify(
                      item.data,
                      null,
                      2
                    )}
                  </pre>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}