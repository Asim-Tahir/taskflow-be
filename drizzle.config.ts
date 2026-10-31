import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dbCredentials: {
    url: "./src/db/taskflow.db",
  },
  verbose: true,
})