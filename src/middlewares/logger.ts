import { styleText } from "node:util";

import type { RequestHandler } from "express";

import { logger } from "#utils";

/**
 * Log request method and original URL
 */
const loggerMiddleware: RequestHandler = (req, res, next) => {
  const reqMethod = req.method;
  const reqOriginalUrl = req.originalUrl;
  const reqTimestamp = new Date().toISOString();
  const reqIp = req.ip || req.socket.remoteAddress || "::1";

  const styledReqTimestamp = styleText("gray", reqTimestamp);
  const styledReqIp = styleText(["dim", "underline"], reqIp);
  const styledReqOriginalUrl = styleText("cyan", reqOriginalUrl);

  let styledReqMethod = "";

  switch (reqMethod) {
    case "GET":
      styledReqMethod = styleText(["bgGreen", "black"], ` ${reqMethod} `);
      break;

    case "POST":
      styledReqMethod = styleText(["bgBlue", "black"], ` ${reqMethod} `);
      break;

    case "PUT":
      styledReqMethod = styleText(["bgYellow", "black"], ` ${reqMethod} `);
      break;

    case "PATCH":
      styledReqMethod = styleText(["bgYellowBright", "black"], ` ${reqMethod} `);
      break;

    case "DELETE":
      styledReqMethod = styleText(["bgRedBright", "white"], ` ${reqMethod} `);
      break;

    case "QUERY":
      styledReqMethod = styleText(["bgMagenta", "whiteBright"], ` ${reqMethod} `);
      break;

    default:
      styledReqMethod = styleText(["bgGray", "whiteBright"], ` ${reqMethod} `);
      break;
  }

  logger.log(
    `[${styledReqTimestamp}] ${styledReqMethod} ${styledReqOriginalUrl} from ${styledReqIp}`,
  );

  res.on("finish", () => {
    const resStatusCode = String(res.statusCode);
    const resStatusMessage = res.statusMessage || "OK";
    const resTimestamp = new Date().toISOString();

    const styledResTimestamp = styleText("gray", resTimestamp);

    let styledStatusCode = "";
    let styledStatusMessage = "";

    const regex1XX = /^1\d\d$/i;
    const regex2XX = /^2\d\d$/i;
    const regex3XX = /^3\d\d$/i;
    const regex4XX = /^4\d\d$/i;
    const regex5XX = /^5\d\d$/i;

    if (regex1XX.test(resStatusCode)) {
      styledStatusCode = styleText(["bgBlue", "black"], ` ${resStatusCode} `);
      styledStatusMessage = styleText("blue", resStatusMessage);
    } else if (regex2XX.test(resStatusCode)) {
      styledStatusCode = styleText(["bgGreen", "black"], ` ${resStatusCode} `);
      styledStatusMessage = styleText("green", resStatusMessage);
    } else if (regex3XX.test(resStatusCode)) {
      styledStatusCode = styleText(["bgYellow", "black"], ` ${resStatusCode} `);
      styledStatusMessage = styleText("yellow", resStatusMessage);
    } else if (regex4XX.test(resStatusCode)) {
      styledStatusCode = styleText(["bgRedBright", "white"], ` ${resStatusCode} `);
      styledStatusMessage = styleText("redBright", resStatusMessage);
    } else if (regex5XX.test(resStatusCode)) {
      styledStatusCode = styleText(["red", "white"], ` ${resStatusCode} `);
      styledStatusMessage = styleText("red", resStatusMessage);
    }

    logger.log(`[${styledResTimestamp}] ${styledStatusCode} ${styledStatusMessage}\n`);
  });

  next();
};

export default loggerMiddleware;
