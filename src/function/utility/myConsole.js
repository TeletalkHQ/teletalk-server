const chalk = require("chalk");

const colors = {
	red: "red",
	green: "green",
	blue: "blue",
	yellow: "yellow",
	cyan: "cyan",
	white: "white",
	black: "black",
	redBright: "redBright",
};

function ConsoleBuilder() {
	this.logs = [];

	this.chalk = chalk;

	const chalkMaker = (key, values) => {
		values.forEach((value) => {
			this.logs.push(chalk[key](value));
		});
		return this;
	};

	this.colors = colors;

	this.clear = () => {
		console.clear();
		return this;
	};

	const chalkMakerWithBG = (bgColor, data, textColor) => {
		const defaultColor = colors.white;

		if (typeof data === "string") {
			this.logs.push(chalk[bgColor](chalk[defaultColor](data)));
		}

		if (typeof data === "object" && !Array.isArray(data?.values)) {
			this.logs.push(
				chalk[bgColor](chalk[data.textColor || textColor || defaultColor](data.text)),
			);
		}

		if (typeof data === "object" && Array.isArray(data?.values)) {
			data.text.forEach((value) => {
				this.logs.push(
					chalk[bgColor](chalk[data.textColor || textColor || defaultColor](value)),
				);
			});
		}

		if (Array.isArray(data)) {
			data.forEach((value) => {
				this.logs.push(chalk[bgColor](chalk[textColor || defaultColor](value)));
			});
		}

		//
		//
		//
		return this;
	};

	this.log = (...text) => {
		console.log(...this.logs, ...text);
		this.logs = [];
		return this;
	};

	//* Colors =>
	this.black = (...text) => chalkMaker("black", text);
	this.blackBright = (...text) => chalkMaker("blackBright", text);
	this.blue = (...text) => chalkMaker("blue", text);
	this.blueBright = (...text) => chalkMaker("blueBright", text);
	this.cyan = (...text) => chalkMaker("cyan", text);
	this.cyanBright = (...text) => chalkMaker("cyanBright", text);
	this.green = (...text) => chalkMaker("green", text);
	this.greenBright = (...text) => chalkMaker("greenBright", text);
	this.magenta = (...text) => chalkMaker("magenta", text);
	this.magentaBright = (...text) => chalkMaker("magentaBright", text);
	this.red = (...text) => chalkMaker("red", text);
	this.redBright = (...text) => chalkMaker("redBright", text);
	this.white = (...text) => chalkMaker("white", text);
	this.whiteBright = (...text) => chalkMaker("whiteBright", text);
	this.yellow = (...text) => chalkMaker("yellow", text);
	this.yellowBright = (...text) => chalkMaker("yellowBright", text);

	//* Background Colors => //TODO Clean me! => colors
	this.bgBlack = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgBlack", data, textColor);

	this.bgBlackBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgBlackBright", data, textColor);

	this.bgBlue = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgBlue", data, textColor);

	this.bgBlueBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgBlueBright", data, textColor);

	this.bgCyan = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgCyan", data, textColor);

	this.bgCyanBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgCyanBright", data, textColor);

	this.bgGreen = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgGreen", data, textColor);

	this.bgGreenBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgGreenBright", data, textColor);

	this.bgMagenta = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgMagenta", data, textColor);

	this.bgMagentaBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgMagentaBright", data, textColor);

	this.bgRed = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgRed", data, textColor);

	this.bgRedBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgRedBright", data, textColor);

	this.bgWhite = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgWhite", data, textColor);

	this.bgWhiteBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgWhiteBright", data, textColor);

	this.bgYellow = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgYellowBright", data, textColor);

	this.bgYellowBright = (data = { text: "", textColor: colors.white }, textColor) =>
		chalkMakerWithBG("bgYellow", data, textColor);
}

const myConsole = new ConsoleBuilder();

module.exports = { myConsole };
