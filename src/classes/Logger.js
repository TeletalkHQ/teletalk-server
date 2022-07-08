const chalk = require("chalk");

//TODO Add some functionality from client logger

const isArray = (value) => Array.isArray(value);

const colors = {
  black: "black",
  blue: "blue",
  cyan: "cyan",
  green: "green",
  greenBright: "greenBright",
  red: "red",
  redBright: "redBright",
  white: "white",
  yellow: "yellow",
};

const bgColors = {
  bgBlack: "bgBlack",
  bgBlackBright: "bgBlackBright",
  bgBlue: "bgBlue",
  bgBlueBright: "bgBlueBright",
  bgCyan: "bgCyan",
  bgCyanBright: "bgCyanBright",
  bgGreen: "bgGreen",
  bgGreenBright: "bgGreenBright",
  bgMagenta: "bgMagenta",
  bgMagentaBright: "bgMagentaBright",
  bgRed: "bgRed",
  bgRedBright: "bgRedBright",
  bgWhite: "bgWhite",
  bgWhiteBright: "bgWhiteBright",
  bgYellow: "bgYellow",
  bgYellowBright: "bgYellowBright",
};

const defaultTextAndColorOption = { text: "", textColor: colors.white };

let _level = undefined;

//TODO Change LoggerBuilder function to class
function LoggerBuilder(level) {
  this.levels = ["error", "warn", "info", "debug"];
  this.logs = [];

  this.chalk = chalk;
  this.colors = colors;
  this.bgColors = bgColors;

  this.setLevel = (lvl) => {
    _level = lvl;
  };

  if (!_level) {
    this.setLevel(level || "debug");
  }

  this.removeLevel = () => {
    this.setLevel();
  };

  /**
   * @param level {string}
   * @returns {boolean}
   */
  this.canSend = (level) => {
    return this.levels.indexOf(_level) >= this.levels.indexOf(level);
  };

  const chalkMaker = (key, values) => {
    values.forEach((value) => {
      this.logs.push(chalk[key](value));
    });
    return this;
  };

  this.clear = (condition) => {
    if (condition) this.logs = [];
    console.clear();
    return this;
  };

  const chalkMakerWithBG = (bgColor, data, textColor) => {
    const color = textColor || data.textColor || colors.white;

    if (typeof data === "string") {
      this.logs.push(chalk[bgColor](chalk[color](data)));
    }

    if (typeof data === "object" && !isArray(data?.values)) {
      this.logs.push(chalk[bgColor](chalk[color](data.text)));
    }

    if (typeof data === "object" && isArray(data?.values)) {
      data.text.forEach((value) => {
        this.logs.push(chalk[bgColor](chalk[color](value)));
      });
    }

    if (isArray(data)) {
      data.forEach((value) => {
        this.logs.push(chalk[bgColor](chalk[color](value)));
      });
    }

    return this;
  };

  this.log = (...text) => {
    this.stdOut(text, "log");
  };

  this.error = (...text) => {
    this.stdOut(text, "error");
  };

  this.warn = (...text) => {
    this.stdOut(text, "warn");
  };

  this.stdOut = (text, logType = "log") => {
    if (!_level) {
      return;
    }

    if (this.canSend(level)) {
      const textToLog = text.filter((item) =>
        item instanceof LoggerBuilder ? false : true
      );
      console[logType](...this.logs, ...textToLog);
      this.logs = [];
      return text.toString();
    }
  };

  //* Colors =>
  this.black = (...text) => chalkMaker(colors.black, text);
  this.blackBright = (...text) => chalkMaker(colors.blackBright, text);
  this.blue = (...text) => chalkMaker(colors.blue, text);
  this.blueBright = (...text) => chalkMaker(colors.blueBright, text);
  this.cyan = (...text) => chalkMaker(colors.cyan, text);
  this.cyanBright = (...text) => chalkMaker(colors.cyanBright, text);
  this.green = (...text) => chalkMaker(colors.green, text);
  this.greenBright = (...text) => chalkMaker(colors.greenBright, text);
  this.magenta = (...text) => chalkMaker(colors.magenta, text);
  this.magentaBright = (...text) => chalkMaker(colors.magentaBright, text);
  this.red = (...text) => chalkMaker(colors.red, text);
  this.redBright = (...text) => chalkMaker(colors.redBright, text);
  this.white = (...text) => chalkMaker(colors.white, text);
  this.whiteBright = (...text) => chalkMaker(colors.whiteBright, text);
  this.yellow = (...text) => chalkMaker(colors.yellow, text);
  this.yellowBright = (...text) => chalkMaker(colors.yellowBright, text);

  //* BG Colors =>
  this.bgBlack = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgBlack, data, textColor);

  this.bgBlackBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgBlackBright, data, textColor);

  this.bgBlue = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgBlue, data, textColor);

  this.bgBlueBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgBlueBright, data, textColor);

  this.bgCyan = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgCyan, data, textColor);

  this.bgCyanBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgCyanBright, data, textColor);

  this.bgGreen = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgGreen, data, textColor);

  this.bgGreenBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgGreenBright, data, textColor);

  this.bgMagenta = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgMagenta, data, textColor);

  this.bgMagentaBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgMagentaBright, data, textColor);

  this.bgRed = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgRed, data, textColor);

  this.bgRedBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgRedBright, data, textColor);

  this.bgWhite = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgWhite, data, textColor);

  this.bgWhiteBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgWhiteBright, data, textColor);

  this.bgYellow = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgYellowBright, data, textColor);

  this.bgYellowBright = (data = defaultTextAndColorOption, textColor) =>
    chalkMakerWithBG(bgColors.bgYellow, data, textColor);
}

const logger = new LoggerBuilder();

module.exports = { Logger: LoggerBuilder, logger };
