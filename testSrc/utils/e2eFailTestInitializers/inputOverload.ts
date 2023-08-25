import { randomMaker } from "utility-store";

import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const inputOverloadE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data
) => {
	const message = utils.createE2EFailTestMessage(
		"INPUT_FIELDS_OVERLOAD",
		configuredRequester.getEventName()
	);

	it(message, async () => {
		const copyData = { ...data };
		const randomKey = randomMaker.string(8);
		const randomValue = randomMaker.string(8);
		(copyData as any)[randomKey] = randomValue;
		await configuredRequester.sendFullFeaturedRequest(
			copyData,
			"INPUT_FIELDS_OVERLOAD",
			{
				shouldFilterRequestData: false,
			}
		);
	});
};
