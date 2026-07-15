import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../server/router.js";
import { createContext } from "../server/context.js";
import { env } from "../server/lib/env.js";
import { createOAuthCallbackHandler } from "../server/kimi/auth.js";
import { Paths } from "../contracts/constants.js";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.get(Paths.oauthCallback, createOAuthCallbackHandler());
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});

app.get("/api/catalog/products", async (c) => {
  const response = await fetch(`${env.wordpressApiUrl.replace(/\/$/, "")}${env.wordpressProductsEndpoint}`);
  if (!response.ok) {
    return c.json({ error: "Failed to load products" }, response.status);
  }

  return c.json(await response.json());
});

app.get("/api/catalog/categories", async (c) => {
  const response = await fetch(`${env.wordpressApiUrl.replace(/\/$/, "")}${env.wordpressCategoriesEndpoint}`);
  if (!response.ok) {
    return c.json({ error: "Failed to load categories" }, response.status);
  }

  return c.json(await response.json());
});

app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("../server/lib/vite.js");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
