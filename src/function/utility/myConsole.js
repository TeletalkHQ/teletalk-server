const chalk = require("chalk");

function ConsoleBuilder() {
	this.logs = [];

	this.chalk = chalk;

	this.clear = () => {
		console.clear();
		return this;
	};

	const chalkMaker = (key, value) => {
		this.logs.push(chalk[key](value));
		return this;
	};

	const chalkMakerWithBG = (key, value, color) => {
		this.logs.push(chalk[key](chalk[color](value)));
		return this;
	};

	//* Colors =>
	this.black = (text) => chalkMaker("black", text);
	this.blackBright = (text) => chalkMaker("blackBright", text);
	this.blue = (text) => chalkMaker("blue", text);
	this.blueBright = (text) => chalkMaker("blueBright", text);
	this.cyan = (text) => chalkMaker("cyan", text);
	this.cyanBright = (text) => chalkMaker("cyanBright", text);
	this.green = (text) => chalkMaker("green", text);
	this.greenBright = (text) => chalkMaker("greenBright", text);
	this.magenta = (text) => chalkMaker("magenta", text);
	this.magentaBright = (text) => chalkMaker("magentaBright", text);
	this.red = (text) => chalkMaker("red", text);
	this.redBright = (text) => chalkMaker("redBright", text);
	this.white = (text) => chalkMaker("white", text);
	this.whiteBright = (text) => chalkMaker("whiteBright", text);
	this.yellow = (text) => chalkMaker("yellow", text);
	this.yellowBright = (text) => chalkMaker("yellowBright", text);

	//* Background Colors =>
	this.bgBlack = (text) => chalkMaker("bgBlack", text);
	this.bgBlackBright = (text) => chalkMaker("bgBlackBright", text);
	this.bgBlue = (text) => chalkMaker("bgBlue", text);
	this.bgBlueBright = (text) => chalkMaker("bgBlueBright", text);
	this.bgCyan = (text) => chalkMaker("bgCyan", text);
	this.bgCyanBright = (text) => chalkMaker("bgCyanBright", text);
	this.bgGreen = (text) => chalkMaker("bgGreen", text);
	this.bgGreenBright = (text) => chalkMaker("bgGreenBright", text);
	this.bgMagenta = (text) => chalkMaker("bgMagenta", text);
	this.bgMagentaBright = (text) => chalkMaker("bgMagentaBright", text);
	this.bgRed = (text) => chalkMaker("bgRed", text);
	this.bgRedBright = (text) => chalkMaker("bgRedBright", text);
	this.bgWhite = (text) => chalkMaker("bgWhite", text);
	this.bgWhiteBright = (text) => chalkMaker("bgWhiteBright", text);
	this.bgYellow = (text, color = "white") => chalkMakerWithBG("bgYellowBright", text, color);
	this.bgYellowBright = (text) => chalkMaker("bgYellow", text);

	this.log = (text = "") => {
		console.log(...this.logs, text);
		this.logs = [];
	};
}

const myConsole = new ConsoleBuilder();

module.exports = { myConsole };
