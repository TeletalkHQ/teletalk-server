import { randomMaker } from "utility-store";

import { models } from "~/models";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";
import { eventsWithoutDisconnect } from "@/websocket/events";

const filteredEvents = eventsWithoutDisconnect.filter(
	(i) => !["getStuff", "ping"].includes(i.name)
);

describe(
	utils.createTestMessage.unitFailDescribe("verifyClient", "middleware"),
	() => {
		for (const event of filteredEvents) {
			const title = utils.createTestMessage.unitFailTest(
				event.name,
				"middleware",
				"CLIENT_INVALID"
			);
			it(title, async () => {
				const ci = clientInitializer();
				ci.setClient(randomMaker.string(models.native.clientId.maxLength));
				ci.makeClientCookie();
				ci.initClient();
				ci.connect();

				await requesterMaker(ci.getClient(), event as any).emitFull(
					{},
					"CLIENT_INVALID"
				);
			});
		}
	}
);
