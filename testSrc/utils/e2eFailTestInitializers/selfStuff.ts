import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data
) => {
	it(
		utils.createTestMessage.e2eFailTest(
			configuredRequester.getEventName(),
			"event",
			"SELF_STUFF"
		),
		async () => {
			await configuredRequester.sendFullFeaturedRequest(data, "SELF_STUFF");
		}
	);
};
