import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../queries/users.js", () => ({
  findUserByUnionId: vi.fn(),
  upsertUser: vi.fn(),
}));

vi.mock("./platform.js", () => ({
  users: {
    getProfile: vi.fn(),
  },
}));

vi.mock("./session.js", () => ({
  signSessionToken: vi.fn(),
  verifySessionToken: vi.fn(),
}));

afterEach(() => {
  vi.resetModules();
  delete process.env.KIMI_AUTH_URL;
  delete process.env.KIMI_OPEN_URL;
  delete process.env.APP_ID;
  delete process.env.APP_SECRET;
  delete process.env.DATABASE_URL;
});

describe("kimi auth bootstrap", () => {
  it("does not throw when Kimi env vars are missing", async () => {
    await expect(import("../server/kimi/auth.js")).resolves.toBeDefined();
  });
});
