import { styleText } from "node:util";

import pkg from "#pkg" with { type: "json" };

const logger = {
  get prefix(): string {
    return pkg.name;
  },

  get styledPrefix(): string {
    return styleText(["greenBright", "bold", "italic"], this.prefix);
  },

  /**
   * The **`logger.log()`** method outputs a message to the console.
   */
  log(...messages: Array<unknown>) {
    console.log(this.styledPrefix, ...messages);
  },

  /**
   * The **`logger.info()`** method outputs a message to the console at the "info" log level. The message is only displayed to the user if the console is configured to display info output. In most cases, the log level is configured within the console UI. The message may receive special formatting, such as a small "i" icon next to it.
   */
  info(...messages: Array<unknown>) {
    console.info(this.styledPrefix, styleText(["bgBlue", "white"], " INFO "), ...messages);
  },

  /**
   * The **`logger.warn()`** method outputs a warning message to the console at the "warning" log level. The message is only displayed to the user if the console is configured to display warning output. In most cases, the log level is configured within the console UI. The message may receive special formatting, such as yellow colors and a warning icon.
   */
  warn(...messages: Array<unknown>) {
    console.warn(this.styledPrefix, styleText(["bgYellowBright", "black"], " WARN "), ...messages);
  },

  /**
   * The **`logger.error()`** method outputs a message to the console at the "error" log level. The message is only displayed to the user if the console is configured to display error output. In most cases, the log level is configured within the console UI. The message may be formatted as an error, with red colors and call stack information.
   */
  error(...messages: Array<unknown>) {
    console.error(this.styledPrefix, styleText(["bgRedBright", "white"], " ERROR "), ...messages);
  },

  /**
   * The **`logger.debug()`** method outputs a message to the console at the "debug" log level. The message is only displayed to the user if the console is configured to display debug output. In most cases, the log level is configured within the console UI. This log level might correspond to the Debug or Verbose log level.
   */
  debug(...messages: Array<unknown>) {
    console.debug(this.styledPrefix, styleText(["bgGreenBright", "black"], " DEBUG "), ...messages);
  },

  /**
   * The **`logger.trace()`** method outputs a stack trace to the console.
   */
  trace(...messages: Array<unknown>) {
    console.trace(this.prefix, styleText(["bgRed", "white"], " TRACE "), ...messages);
  },
};

export default logger;