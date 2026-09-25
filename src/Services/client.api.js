import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| Client Profile
|--------------------------------------------------------------------------
*/

/**
 * Get the authenticated client's profile.
 *
 * GET /api/v1/clients/me
 */
export async function getClientProfile() {
  const response = await api.get(
    "/clients/me"
  );

  return response.data;
}

/**
 * Update the authenticated client's profile.
 *
 * PATCH /api/v1/clients/me
 */
export async function updateClientProfile(data) {
  const response = await api.patch(
    "/clients/me",
    data
  );

  return response.data;
}