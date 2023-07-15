// import { LoggerChalker } from "logger-chalker";
// const jestConsole = console;
// beforeEach(async () => {
//   global.console = await import("console");
// });
// const logger = new LoggerChalker();
// logger.overrideConsole();
// afterEach(() => {
//   global.console = jestConsole;
// });
import JestConsole from "@jest/console";
import console from "console";

global.console = console;

global.console = new JestConsole.CustomConsole(
  process.stdout,
  process.stderr,
  (type, message) => {
    const TITLE_INDENT = "    ";
    const CONSOLE_INDENT = TITLE_INDENT + "  ";
    return message
      .split(/\n/)
      .map((line) => CONSOLE_INDENT + line)
      .join("\n");
  }
);
