import { randomMaker } from "utility-store";

import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const inputOverloadE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data
) => {
	const message = utils.createTestMessage.e2eFailTest(
		configuredRequester.getEventName(),
		"INPUT_FIELDS_OVERLOAD"
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
