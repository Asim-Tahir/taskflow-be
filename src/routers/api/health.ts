import { Router } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import type { ResponseBody } from "#types";

const healthRouter = Router();

healthRouter.get<ParamsDictionary, ResponseBody<null>>("/", (_req, res) => {
  res.status(200).json({
    success: true,
    data: null
  });
});

export default healthRouter;
