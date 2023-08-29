import { randomMaker } from "utility-store";

import { models } from "~/models";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

const filteredEvents = events.filter(
	(i) => !["getStuff", "ping"].includes(i.name)
);

describe(utils.createTestMessage.unitFailDescribe("verifyClient"), () => {
	for (const event of filteredEvents) {
		const title = utils.createTestMessage.unitFailTest(
			event.name,
			"CLIENT_INVALID"
		);
		it(title, async () => {
			const ci = clientInitializer();
			ci.setClient(randomMaker.string(models.native.clientId.maxLength));
			ci.makeClientCookie();
			ci.initClient();
			ci.connect();

			await requesterMaker(
				ci.getClient(),
				event as any
			).sendFullFeaturedRequest({}, "CLIENT_INVALID");
		});
	}
});
