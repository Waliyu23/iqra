import { useEffect, useMemo, useState } from "react";
import type { Category, Product } from "@/data/products";

type CatalogPayload = {
  products: Product[];
  categories: Category[];
};

const fallbackCatalog: CatalogPayload = {
  products: [],
  categories: [],
};

function getProductsEndpoint() {
  return "/api/catalog/products";
}

function getCategoriesEndpoint() {
  return "/api/catalog/categories";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveLocalCategory(product: any) {
  return {
    id: Number(product.categoryId ?? product.category_id ?? 0),
    name: String(product.categoryName ?? product.category_name ?? ""),
    slug: String(product.categorySlug ?? product.category_slug ?? ""),
  };
}

function normalizeProduct(value: any): Product {
  const category = resolveLocalCategory(value);
  return {
    id: Number(value.id),
    name: String(value.name ?? ""),
    slug: String(value.slug ?? ""),
    description: String(value.description ?? ""),
    shortDescription: String(value.shortDescription ?? value.short_description ?? ""),
    price: String(value.price ?? "0"),
    compareAtPrice: value.compareAtPrice ?? value.compare_at_price ?? null,
    categoryId: Number(value.categoryId ?? value.category_id ?? category?.id ?? 0),
    categoryName: String(value.categoryName ?? value.category_name ?? category?.name ?? ""),
    categorySlug: String(value.categorySlug ?? value.category_slug ?? category?.slug ?? ""),
    image: String(value.image ?? ""),
    sku: String(value.sku ?? ""),
    stockQuantity: Number(value.stockQuantity ?? value.stock_quantity ?? 0),
    isActive: Boolean(value.isActive ?? value.is_active ?? true),
    isFeatured: Boolean(value.isFeatured ?? value.is_featured ?? false),
    isBestseller: Boolean(value.isBestseller ?? value.is_bestseller ?? false),
    isNewArrival: Boolean(value.isNewArrival ?? value.is_new_arrival ?? false),
    rating: String(value.rating ?? "0"),
    reviewCount: Number(value.reviewCount ?? value.review_count ?? 0),
    tags: String(value.tags ?? ""),
  };
}

function buildCatalogPayload(rawProducts: Product[], rawCategories: Category[]) {
  const categoryMap = new Map<string, Category>();

  rawCategories.forEach((category) => {
    categoryMap.set(category.slug, category);
  });

  rawProducts.forEach((product) => {
    const resolvedCategory =
      (product.categorySlug && categoryMap.get(product.categorySlug)) ||
      Array.from(categoryMap.values()).find((category) => category.id === product.categoryId) ||
      Array.from(categoryMap.values()).find((category) => category.name.toLowerCase() === product.categoryName.toLowerCase());

    const resolvedSlug = product.categorySlug || resolvedCategory?.slug || slugify(product.categoryName);
    if (!resolvedSlug || categoryMap.has(resolvedSlug)) return;

    categoryMap.set(resolvedSlug, {
      id: product.categoryId || resolvedCategory?.id || categoryMap.size + 1,
      name: product.categoryName || resolvedCategory?.name || "",
      slug: resolvedSlug,
      description: resolvedCategory?.description || "",
      image: resolvedCategory?.image || "",
      sortOrder: resolvedCategory?.sortOrder || product.categoryId || categoryMap.size + 1,
    });
  });

  const categories = Array.from(categoryMap.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  const categoriesBySlug = new Map(categories.map((category) => [category.slug, category]));
  const products = rawProducts.map((product) => {
    const resolvedCategory =
      (product.categorySlug && categoriesBySlug.get(product.categorySlug)) ||
      categories.find((category) => category.id === product.categoryId) ||
      categories.find((category) => category.name.toLowerCase() === product.categoryName.toLowerCase());

    return {
      ...product,
      categoryId: resolvedCategory?.id ?? product.categoryId,
      categoryName: resolvedCategory?.name ?? product.categoryName,
      categorySlug: resolvedCategory?.slug ?? product.categorySlug ?? slugify(product.categoryName),
    };
  });

  return {
    products,
    categories,
  };
}

let cachedCatalog: CatalogPayload = fallbackCatalog;
let loadPromise: Promise<CatalogPayload> | null = null;
const listeners = new Set<() => void>();

export function getCatalogSnapshot() {
  return cachedCatalog;
}

export function subscribeCatalog(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitCatalogUpdate() {
  listeners.forEach((listener) => listener());
}

export async function loadCatalog(force = false) {
  if (!force && loadPromise) return loadPromise;

  loadPromise = Promise.all([
    fetch(getProductsEndpoint()),
    fetch(getCategoriesEndpoint()),
  ])
    .then(async ([productsResponse, categoriesResponse]) => {
      if (!productsResponse.ok) throw new Error(`Catalog request failed with ${productsResponse.status}`);

      const productData = await productsResponse.json();
      const categoryData = categoriesResponse.ok ? await categoriesResponse.json() : [];

      const normalizedProducts = Array.isArray(productData) ? productData.map(normalizeProduct) : [];
      const normalizedCategories = Array.isArray(categoryData)
        ? categoryData.map((value) => ({
            id: Number(value.id),
            name: String(value.name ?? ""),
            slug: String(value.slug ?? ""),
            description: String(value.description ?? ""),
            image: String(value.image ?? ""),
            sortOrder: Number(value.sortOrder ?? value.sort_order ?? 0),
          }))
        : [];

      const categoryBySlug = new Map(normalizedCategories.map((category) => [category.slug, category]));
      const mergedProducts = normalizedProducts.map((product) => {
    const category = product.categorySlug ? categoryBySlug.get(product.categorySlug) : undefined;
    if (!category) return product;
    return {
      ...product,
      categoryId: product.categoryId || category.id,
      categoryName: product.categoryName || category.name,
      categorySlug: product.categorySlug || category.slug,
    };
  });

      cachedCatalog = {
        products: mergedProducts.filter((product) => product.isActive),
        categories: normalizedCategories.length > 0 ? normalizedCategories : buildCatalogPayload(mergedProducts, []).categories,
      };
      emitCatalogUpdate();
      return cachedCatalog;
    })
    .catch(() => {
      cachedCatalog = fallbackCatalog;
      emitCatalogUpdate();
      return cachedCatalog;
    });

  return loadPromise;
}

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogPayload>(cachedCatalog);

  useEffect(() => {
    loadCatalog().then((next) => {
      setCatalog(next);
    });
    return subscribeCatalog(() => setCatalog(getCatalogSnapshot()));
  }, []);

  return useMemo(() => catalog, [catalog]);
}

export function useProductBySlug(slug: string) {
  const catalog = useCatalog();
  return catalog.products.find((product) => product.slug === slug);
}

export function useProductsByCategory(categorySlug: string) {
  const catalog = useCatalog();
  const category = catalog.categories.find((item) => item.slug === categorySlug);
  if (!category) return [];
  return catalog.products.filter((product) => product.categoryId === category.id);
}
