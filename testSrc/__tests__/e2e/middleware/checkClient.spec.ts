import chai from "chai";

import { errorStore } from "~/classes/ErrorStore";
import { eventsWithAuth, eventsWithoutAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

describe("checkClient middleware test", () => {
	for (const event of eventsWithoutAuth) {
		it(`should not get error: CLIENT_NOT_FOUND - ${event.name}`, async () => {
			const socket = (await clientInitializer().createComplete()).getClient();
			const response = (
				await requesterMaker(socket, event as any).sendRequest()
			).getResponse();

			const { reason: expectedReason } = errorStore.find("CLIENT_NOT_FOUND");
			const error = response.errors?.find((i) => i.reason === expectedReason);
			chai.expect(!!error?.reason).to.be.equal(false);
		});
	}

	for (const event of eventsWithAuth) {
		const title = utils.createE2EFailTestMessage(
			"CLIENT_NOT_FOUND",
			event.name
		);

		it(title, async () => {
			const socket = (await clientInitializer().createComplete()).getClient();
			await requesterMaker(socket, event as any)
				.setOptions({ shouldFilterRequestData: false })
				.setError("CLIENT_NOT_FOUND")
				.sendFullFeaturedRequest();
		});
	}
});
