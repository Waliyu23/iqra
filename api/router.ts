import { authRouter } from "./auth-router";
import { productRouter } from "./product-router";
import { cartRouter } from "./cart-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
