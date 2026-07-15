import { env } from "../../server/lib/env.js";

export default async function handler(_req: unknown, res: any) {
  try {
    const response = await fetch(
      `${env.wordpressApiUrl.replace(/\/$/, "")}${env.wordpressProductsEndpoint}`
    );

    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to load products" });
      return;
    }

    res.status(200).json(await response.json());
  } catch (error) {
    res.status(500).json({
      error: "Failed to load products",
    });
  }
}
