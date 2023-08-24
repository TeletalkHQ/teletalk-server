import { randomMaker } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";

import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const inputOverloadE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data
) => {
	const message = utils.createFailTestMessage(
		errorStore.find("INPUT_FIELDS_OVERLOAD"),
		configuredRequester.getEventName()
	);

	it(message, async () => {
		const copyData = { ...data };
		const randomKey = randomMaker.string(8);
		const randomValue = randomMaker.string(8);
		(copyData as any)[randomKey] = randomValue;
		await configuredRequester.sendFullFeaturedRequest(
			copyData,
			errorStore.find("INPUT_FIELDS_OVERLOAD"),
			{
				shouldFilterRequestData: false,
			}
		);
	});
};
