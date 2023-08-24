/* eslint-disable @typescript-eslint/no-var-requires */
const { DefaultReporter, utils } = require("@jest/reporters");
const { LoggerChalker } = require("logger-chalker");
// const chalk = require("chalk");

const logger = new LoggerChalker();

const TITLE_BULLET = logger.colorizer.bold("\u25cf ");

const getBufferedLog = (buffer, _config, globalConfig) => {
	const TITLE_INDENT = globalConfig.verbose ? "  " : "    ";
	const CONSOLE_INDENT = TITLE_INDENT + "  ";
	const logEntries = buffer.reduce((output, { type, message }) => {
		message = message
			.split(/\n/)
			.map((line) => CONSOLE_INDENT + line)
			.join("\n");
		if (type === "warn") {
			message = logger.colorizer.yellow(message);
		} else if (type === "error") {
			message = logger.colorizer.red(message);
		}
		return output + message.trimRight() + "\n";
	}, "");
	return logEntries.trimRight() + "\n";
};

class AwesomeReporter extends DefaultReporter {
	constructor() {
		super(arguments);
	}
	printTestFileHeader(_testPath, config, result) {
		this.log(utils.getResultHeader(result, this._globalConfig, config));

		if (result.console) {
			this.log(
				"  " +
					TITLE_BULLET +
					"Console\n\n" +
					getBufferedLog(result.console, config, this._globalConfig)
			);
		}
	}
}

module.exports = AwesomeReporter;

// This prevents jest from adding verbose headers to the logs when the --verbose is set
if (global.console.constructor.name === "CustomConsole") {
	// you can also override the global.console with another CustomConsole of yours, like https://stackoverflow.com/a/57443150
	global.console = require("console");
}
