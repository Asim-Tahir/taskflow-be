import express from "express";

import { loggerMiddleware, notFoundErrorMiddleware, errorMiddleware } from "#middlewares";
import { apiRouter } from "#routers";
import { PUBLIC_DIR_PATH } from "#constants";

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use(express.static(PUBLIC_DIR_PATH));

app.use("/api/v1", apiRouter);

app.use(notFoundErrorMiddleware);
app.use(errorMiddleware);

export default app;
