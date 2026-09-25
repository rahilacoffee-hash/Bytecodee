import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| Client Messages
|--------------------------------------------------------------------------
*/

/**
 * Send a message to a conversation.
 *
 * POST /api/v1/messages/:conversationId
 */
export async function sendMessage(
  conversationId,
  content
) {
  const response = await api.post(
    `/messages/${conversationId}`,
    {
      content,
    }
  );

  return response.data;
}

/**
 * Get messages belonging to a conversation.
 *
 * GET /api/v1/messages/:conversationId
 */
export async function getMessages(
  conversationId
) {
  const response = await api.get(
    `/messages/${conversationId}`
  );

  return response.data;
}

/**
 * Mark client-visible messages as read.
 *
 * PATCH /api/v1/messages/:conversationId/read
 */
export async function markMessagesRead(
  conversationId
) {
  const response = await api.patch(
    `/messages/${conversationId}/read`
  );

  return response.data;
}