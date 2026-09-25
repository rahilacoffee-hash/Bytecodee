import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| Client Quotes
|--------------------------------------------------------------------------
*/

/**
 * Get all quotes belonging to the authenticated client.
 *
 * GET /api/v1/quotes/me
 */
export async function getMyQuotes() {
  const response = await api.get(
    "/quotes/me"
  );

  return response.data;
}

/**
 * Get a specific quote.
 *
 * GET /api/v1/quotes/:quoteId
 */
export async function getQuote(quoteId) {
  const response = await api.get(
    `/quotes/${quoteId}`
  );

  return response.data;
}
export async function decideQuote(quoteId, status) { const response = await api.patch(`/quotes/${quoteId}/decision`, { status }); return response.data; }
