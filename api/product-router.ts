import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products, categories } from "@db/schema";
import { eq, and, gte, lte, desc, asc, sql } from "drizzle-orm";

export const productRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        categorySlug: z.string().optional(),
        search: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        sortBy: z.enum(["featured", "price-asc", "price-desc", "newest", "bestselling"]).default("featured"),
        page: z.number().default(1),
        limit: z.number().default(24),
        isNewArrival: z.boolean().optional(),
        isBestseller: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input || {
        categorySlug: undefined,
        search: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: "featured" as const,
        page: 1,
        limit: 24,
        isNewArrival: undefined,
        isBestseller: undefined,
        isFeatured: undefined,
      };

      let orderBy;
      switch (params.sortBy) {
        case "price-asc":
          orderBy = asc(products.price);
          break;
        case "price-desc":
          orderBy = desc(products.price);
          break;
        case "newest":
          orderBy = desc(products.createdAt);
          break;
        case "bestselling":
          orderBy = desc(products.reviewCount);
          break;
        default:
          orderBy = desc(products.isFeatured);
      }

      const conditions = [eq(products.isActive, true)];

      if (params.categorySlug) {
        const category = await db.select().from(categories).where(eq(categories.slug, params.categorySlug)).limit(1);
        if (category[0]) {
          conditions.push(eq(products.categoryId, category[0].id));
        }
      }

      if (params.search) {
        conditions.push(
          sql`${products.name} LIKE ${`%${params.search}%`} OR ${products.description} LIKE ${`%${params.search}%`} OR ${products.tags} LIKE ${`%${params.search}%`}`
        );
      }

      if (params.minPrice !== undefined) {
        conditions.push(gte(products.price, params.minPrice.toString()));
      }

      if (params.maxPrice !== undefined) {
        conditions.push(lte(products.price, params.maxPrice.toString()));
      }

      if (params.isNewArrival) {
        conditions.push(eq(products.isNewArrival, true));
      }

      if (params.isBestseller) {
        conditions.push(eq(products.isBestseller, true));
      }

      if (params.isFeatured) {
        conditions.push(eq(products.isFeatured, true));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      const items = await db
        .select()
        .from(products)
        .where(whereClause)
        .orderBy(orderBy)
        .limit(params.limit)
        .offset((params.page - 1) * params.limit);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(whereClause);

      return {
        items,
        total: countResult[0]?.count || 0,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil((countResult[0]?.count || 0) / params.limit),
      };
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(products)
        .where(and(eq(products.slug, input.slug), eq(products.isActive, true)))
        .limit(1);
      return result[0] || null;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(products)
        .where(and(eq(products.id, input.id), eq(products.isActive, true)))
        .limit(1);
      return result[0] || null;
    }),

  categories: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(categories).where(eq(categories.isActive, true)).orderBy(asc(categories.sortOrder));
  }),

  getCategory: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(categories)
        .where(and(eq(categories.slug, input.slug), eq(categories.isActive, true)))
        .limit(1);
      return result[0] || null;
    }),
});
