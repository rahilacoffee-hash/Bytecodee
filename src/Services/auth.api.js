import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| Client Authentication
|--------------------------------------------------------------------------
*/

/**
 * Register a new client and create a client session.
 *
 * POST /api/v1/auth/client/register
 */
export async function registerClient({
  name,
  email,
  phone,
  companyName,
}) {
  const response = await api.post(
    "/auth/client/register",
    {
      name,
      email,
      phone,
      companyName,
    }
  );

  return response.data;
}

/**
 * Get the currently authenticated client.
 *
 * GET /api/v1/auth/client/me
 */
export async function getCurrentClient() {
  const response = await api.get(
    "/auth/client/me"
  );

  return response.data;
}

/**
 * Log out the current client.
 *
 * POST /api/v1/auth/client/logout
 */
export async function logoutClient() {
  const response = await api.post(
    "/auth/client/logout"
  );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Client Account Recovery
|--------------------------------------------------------------------------
*/

/**
 * Request a recovery OTP.
 *
 * POST /api/v1/auth/client/recovery/request
 */
export async function requestClientRecovery(email) {
  const response = await api.post(
    "/auth/client/recovery/request",
    {
      email,
    }
  );

  return response.data;
}

/**
 * Verify recovery OTP.
 *
 * POST /api/v1/auth/client/recovery/verify
 */
export async function verifyClientRecovery({
  email,
  otp,
}) {
  const response = await api.post(
    "/auth/client/recovery/verify",
    {
      email,
      otp,
    }
  );

  return response.data;
}