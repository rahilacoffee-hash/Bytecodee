import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| Conversations
|--------------------------------------------------------------------------
*/

/**
 * Create a new client conversation.
 *
 * POST /api/v1/conversations
 */
export async function createConversation({
  service,
  source = "PORTFOLIO_PRICING",
}) {
  const response = await api.post(
    "/conversations",
    {
      service,
      source,
    }
  );

  return response.data;
}

/**
 * Get all conversations belonging
 * to the currently authenticated client.
 *
 * GET /api/v1/conversations/me
 */
export async function getMyConversations() {
  const response = await api.get(
    "/conversations/me"
  );

  return response.data;
}

/**
 * Get a specific conversation.
 *
 * GET /api/v1/conversations/:conversationId
 */
export async function getConversation(
  conversationId
) {
  const response = await api.get(
    `/conversations/${conversationId}`
  );

  return response.data;
}

/**
 * Update a client conversation.
 *
 * PATCH /api/v1/conversations/:conversationId
 */
export async function updateConversation(
  conversationId,
  data
) {
  const response = await api.patch(
    `/conversations/${conversationId}`,
    data
  );

  return response.data;
}