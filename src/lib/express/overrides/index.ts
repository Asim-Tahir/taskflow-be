import app from "#src/app";

import { paginate } from "./request/index.ts";
import { errors } from "./response/index.ts";

// #region Request
app.request.paginate = paginate;
// #endregion

// #region Response
app.response.errors = errors;
// #endregion
