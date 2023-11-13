import { Trier } from "simple-trier";
import { randomMaker } from "utility-store";

import { appConfigs } from "~/classes/AppConfigs";

await appConfigs.setup();

export const testServerInitializer = async () => {
	await appConfigs.setup();

	const { runner } = await import("~/index");

	appConfigs.setPort(randomMaker.numberWithRange(8000, 50000));

	logger.offAll();
	logger.on("debug");

	Trier.changeGlobalConfigs({
		callerName: "unknownCaller",
		canPrintError: false,
	});

	await runner();
};
