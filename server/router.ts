import { authRouter } from "../api/auth-router.js";
import { productRouter } from "../api/product-router.js";
import { cartRouter } from "../api/cart-router.js";
import { createRouter, publicQuery } from "./middleware.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
