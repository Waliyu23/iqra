import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { cartItems, products } from "../db/schema.js";
import { eq, and, sql } from "drizzle-orm";

export const cartRouter = createRouter({
  get: publicQuery
    .input(z.object({ sessionId: z.string() }).optional())
    .query(async ({ input, ctx }) => {
      const db = getDb();
      const userId = ctx.user?.id;
      const sessionId = input?.sessionId;

      let items;
      if (userId) {
        items = await db.select().from(cartItems).where(eq(cartItems.userId, userId));
      } else if (sessionId) {
        items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
      } else {
        return { items: [], total: 0 };
      }

      const enrichedItems = await Promise.all(
        items.map(async (item) => {
          const product = await db
            .select()
            .from(products)
            .where(eq(products.id, item.productId))
            .limit(1);
          return {
            ...item,
            product: product[0] || null,
          };
        })
      );

      const total = enrichedItems.reduce((sum, item) => {
        const price = parseFloat(item.product?.price || "0");
        return sum + price * item.quantity;
      }, 0);

      return { items: enrichedItems, total };
    }),

  add: publicQuery
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().default(1),
        sessionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const userId = ctx.user?.id;

      const existing = userId
        ? await db
            .select()
            .from(cartItems)
            .where(
              and(eq(cartItems.userId, userId), eq(cartItems.productId, input.productId))
            )
            .limit(1)
        : await db
            .select()
            .from(cartItems)
            .where(
              and(
                eq(cartItems.sessionId, input.sessionId),
                eq(cartItems.productId, input.productId)
              )
            )
            .limit(1);

      if (existing[0]) {
        await db
          .update(cartItems)
          .set({ quantity: existing[0].quantity + input.quantity })
          .where(eq(cartItems.id, existing[0].id));
        return { success: true, action: "updated" };
      }

      await db.insert(cartItems).values({
        userId: userId || undefined,
        sessionId: userId ? undefined : input.sessionId,
        productId: input.productId,
        quantity: input.quantity,
      });

      return { success: true, action: "added" };
    }),

  update: publicQuery
    .input(
      z.object({
        itemId: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      if (input.quantity <= 0) {
        await db.delete(cartItems).where(eq(cartItems.id, input.itemId));
        return { success: true, action: "removed" };
      }
      await db
        .update(cartItems)
        .set({ quantity: input.quantity })
        .where(eq(cartItems.id, input.itemId));
      return { success: true, action: "updated" };
    }),

  remove: publicQuery
    .input(z.object({ itemId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(cartItems).where(eq(cartItems.id, input.itemId));
      return { success: true };
    }),

  clear: publicQuery
    .input(z.object({ sessionId: z.string() }).optional())
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const userId = ctx.user?.id;

      if (userId) {
        await db.delete(cartItems).where(eq(cartItems.userId, userId));
      } else if (input?.sessionId) {
        await db.delete(cartItems).where(eq(cartItems.sessionId, input.sessionId));
      }

      return { success: true };
    }),

  count: publicQuery
    .input(z.object({ sessionId: z.string() }).optional())
    .query(async ({ input, ctx }) => {
      const db = getDb();
      const userId = ctx.user?.id;

      let result;
      if (userId) {
        result = await db
          .select({ count: sql<number>`COALESCE(SUM(quantity), 0)` })
          .from(cartItems)
          .where(eq(cartItems.userId, userId));
      } else if (input?.sessionId) {
        result = await db
          .select({ count: sql<number>`COALESCE(SUM(quantity), 0)` })
          .from(cartItems)
          .where(eq(cartItems.sessionId, input.sessionId));
      } else {
        return { count: 0 };
      }

      return { count: result[0]?.count || 0 };
    }),
});
