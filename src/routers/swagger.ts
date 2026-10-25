import express, { Router } from "express";
import { getAbsoluteFSPath } from "swagger-ui-dist";

const swaggerRouter = Router();

swaggerRouter.use("/", express.static(getAbsoluteFSPath()));

export default swaggerRouter;
