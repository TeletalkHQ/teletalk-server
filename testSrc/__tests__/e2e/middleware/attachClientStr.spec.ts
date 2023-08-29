import { clientManager } from "~/classes/ClientIdManager";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

const filteredEvents = events.filter(
	(i) => !["getStuff", "ping"].includes(i.name)
);

describe(utils.createTestMessage.unitFailDescribe("attachClientStr"), () => {
	for (const event of filteredEvents) {
		const title = utils.createTestMessage.unitFailTest(
			event.name,
			"CLIENT_COOKIE_REQUIRED"
		);

		it(title, async () => {
			const ci = clientInitializer();
			ci.setClient(await clientManager.signClient(""))
				.initClient()
				.connect();
			const socket = ci.getClient();

			await requesterMaker(socket, event as any).sendFullFeaturedRequest(
				{},
				"CLIENT_COOKIE_REQUIRED"
			);
		});
	}
});
