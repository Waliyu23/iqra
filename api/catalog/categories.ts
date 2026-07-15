import { catalogEnv } from "./env.js";

export default async function handler(_req: unknown, res: any) {
  try {
    const response = await fetch(
      `${catalogEnv.wordpressApiUrl.replace(/\/$/, "")}${catalogEnv.wordpressCategoriesEndpoint}`
    );

    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to load categories" });
      return;
    }

    res.status(200).json(await response.json());
  } catch (error) {
    res.status(500).json({
      error: "Failed to load categories",
    });
  }
}
