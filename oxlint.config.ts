import { defineConfig, type OxlintConfig } from "oxlint";

export default defineConfig({
  plugins: [
    "import",
    "node",
    "oxc",
    "typescript",
    "unicorn"
  ],
  options: {
    typeAware: true,
    typeCheck: true,
    reportUnusedDisableDirectives: "warn",
  },
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "warn",
  },
  rules: {},
  env: {
    builtin: true
  }
} satisfies OxlintConfig);