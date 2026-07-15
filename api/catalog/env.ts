function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const catalogEnv = {
  wordpressApiUrl: required("WORDPRESS_API_URL"),
  wordpressProductsEndpoint: process.env.WORDPRESS_PRODUCTS_ENDPOINT ?? "/wp-json/iqra/v1/products",
  wordpressCategoriesEndpoint: process.env.WORDPRESS_CATEGORIES_ENDPOINT ?? "/wp-json/iqra/v1/categories",
};
