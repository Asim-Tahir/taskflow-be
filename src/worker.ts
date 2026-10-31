import { styleText } from "node:util";

import { httpServerHandler } from "cloudflare:node";

import { PORT, HOST } from "#env";

import "#lib/express";
import "#lib/zod";

import app from "#src/app";

app.listen(PORT, HOST, () => {
  console.log(`${styleText(["green", "bold", "italic"], "Taskflow")} server is running on ${styleText(["gray", "underline"], `http://${HOST}:${PORT}`)}`);
  console.log(`${styleText(["greenBright", "bold", "italic"], "Swagger UI")} is running on ${styleText(["gray", "underline"], `http://${HOST}:${PORT}/swagger/`)}\n`);
});

export default httpServerHandler(PORT);
