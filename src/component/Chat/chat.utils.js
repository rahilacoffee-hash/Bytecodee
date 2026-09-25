export function formatMessageTime(date) {
  if (!date) return "";

  const messageDate = new Date(date);

  if (Number.isNaN(messageDate.getTime())) {
    return "";
  }

  return messageDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatMessageDate(date) {
  if (!date) return "";

  const messageDate = new Date(date);

  if (Number.isNaN(messageDate.getTime())) {
    return "";
  }

  const now = new Date();

  const isToday =
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return "Today";
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isYesterday =
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() ===
      yesterday.getFullYear();

  if (isYesterday) {
    return "Yesterday";
  }

  return messageDate.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year:
      messageDate.getFullYear() !==
      now.getFullYear()
        ? "numeric"
        : undefined,
  });
}

export function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) return false;

  const a = new Date(dateA);
  const b = new Date(dateB);

  if (
    Number.isNaN(a.getTime()) ||
    Number.isNaN(b.getTime())
  ) {
    return false;
  }

  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function getMessageSenderLabel(
  senderType
) {
  if (senderType === "CLIENT") {
    return "You";
  }

  if (senderType === "ADMIN") {
    return "BYTECODEE";
  }

  return "";
}

export function isClientMessage(message) {
  return message?.senderType === "CLIENT";
}

export function isAdminMessage(message) {
  return message?.senderType === "ADMIN";
}

export function normalizeMessage(message) {
  if (!message) return null;

  return {
    id: message.id,
    conversationId: message.conversationId,
    senderType: message.senderType,
    content: message.content,
    createdAt: message.createdAt,
    readAt: message.readAt ?? null,
  };
}

export function mergeMessages(
  currentMessages = [],
  incomingMessages = []
) {
  const messageMap = new Map();

  [...currentMessages, ...incomingMessages].forEach(
    (message) => {
      if (!message?.id) return;

      messageMap.set(message.id, message);
    }
  );

  return Array.from(messageMap.values()).sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  );
}