import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "src/**/*.test.{ts,tsx}",
      "apps/**/*.test.{ts,tsx}",
      "packages/**/*.test.{ts,tsx}",
    ],
    passWithNoTests: true,
  },
});
