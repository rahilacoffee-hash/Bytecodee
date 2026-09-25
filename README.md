# BYTECODEE Client

React 19 and Vite frontend for the BYTECODEE portfolio, client chat, and admin workspace. The API is maintained in the separate `backend` project.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local Development

````sh

Create a local `.env` file:

```dotenv
VITE_API_URL=http://localhost:5001/api/v1
VITE_SOCKET_URL=http://localhost:5001
````

Start the Vite development server:

```sh
npm run dev
```

The app is available at `http://localhost:5173` by default.

## Commands

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the local Vite server             |
| `npm run build`   | Create the production bundle in `dist/` |
| `npm run preview` | Serve the production bundle locally     |
| `npm run lint`    | Run ESLint                              |

## Environment Variables

Set these in Vercel for each deployment environment. They are embedded at build time, so redeploy after changing them.

| Variable          | Value                                                                          |
| ----------------- | ------------------------------------------------------------------------------ |
| `VITE_API_URL`    | Backend API origin plus `/api/v1`, for example `https://<backend-host>/api/v1` |
| `VITE_SOCKET_URL` | Backend origin without the API path, for example `https://<backend-host>`      |

The client sends session cookies with API and Socket.IO requests. Configure the backend `CLIENT_URL` to the exact deployed frontend origin.

## Deployment

Deploy this directory as the Vercel project root. Use `npm run build` as the build command and `dist` as the output directory. The included `vercel.json` routes SPA paths to `index.html`.

For backend installation, required environment variables, and database migrations, see the backend project's README.

Do not commit `.env` files or put backend secrets in `VITE_` variables.
