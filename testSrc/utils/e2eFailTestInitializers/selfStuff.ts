import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data
) => {
	it(
		utils.createE2EFailTestMessage(
			"SELF_STUFF",
			configuredRequester.getEventName()
		),
		async () => {
			await configuredRequester.sendFullFeaturedRequest(data, "SELF_STUFF");
		}
	);
};
