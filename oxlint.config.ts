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
  rules: {
    "import/no-unassigned-import": "off",
    "oxc/no-async-endpoint-handlers": "off",
    "oxc/no-this-in-exported-function": "off",
    "typescript/no-useless-empty-export": "off",
    "unicorn/require-module-specifiers": "off",
  },
  env: {
    builtin: true
  },
  ignorePatterns: [
    ".cloudflare/**"
  ]
} satisfies OxlintConfig);