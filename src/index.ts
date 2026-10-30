import { styleText } from "node:util";

import { loadDotEnv } from "#utils";

await loadDotEnv();

import { PORT } from "#env";

import "#lib/express";
import "#lib/zod";

import app from "#src/app";

app.listen(PORT, () => {
  console.log(
    `${styleText(["green", "bold", "italic"], "Taskflow")} server is running on ${styleText(["gray", "underline"], `http://localhost:${PORT}`)}`,
  );
  console.log(
    `${styleText(["greenBright", "bold", "italic"], "Swagger UI")} is running on ${styleText(["gray", "underline"], `http://localhost:${PORT}/swagger/`)}\n`,
  );
});
