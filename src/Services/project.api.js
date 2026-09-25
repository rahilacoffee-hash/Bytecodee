import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| Client Projects
|--------------------------------------------------------------------------
*/

/**
 * Get all projects belonging to the authenticated client.
 *
 * GET /api/v1/projects/me
 */
export async function getMyProjects() {
  const response = await api.get(
    "/projects/me"
  );

  return response.data;
}

/**
 * Get a specific project.
 *
 * GET /api/v1/projects/:projectId
 */
export async function getProject(projectId) {
  const response = await api.get(
    `/projects/${projectId}`
  );

  return response.data;
}