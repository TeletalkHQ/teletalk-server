import { Trier } from "simple-trier";
import { randomMaker } from "utility-store";

import { configs } from "~/classes/Configs";

await configs.setup();

export const testServerInitializer = async () => {
	await configs.setup();

	const { runner } = await import("~/index");

	configs.setPort(randomMaker.numberWithRange(8000, 50000));

	logger.offAll();
	logger.on("debug");

	Trier.changeGlobalConfigs({
		callerName: "unknownCaller",
		canPrintError: false,
	});

	await runner();
};
