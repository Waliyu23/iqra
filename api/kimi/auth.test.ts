import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../queries/users", () => ({
  findUserByUnionId: vi.fn(),
  upsertUser: vi.fn(),
}));

vi.mock("./platform", () => ({
  users: {
    getProfile: vi.fn(),
  },
}));

vi.mock("./session", () => ({
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
    await expect(import("./auth")).resolves.toBeDefined();
  });
});
