import { clientManager } from "~/classes/ClientIdManager";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";
import { eventsWithoutDisconnect } from "@/websocket/events";

const filteredEvents = eventsWithoutDisconnect.filter(
	(i) => !["getStuff", "ping"].includes(i.name)
);

describe(
	utils.createTestMessage.unitFailDescribe("attachClientStr", "middleware"),
	() => {
		for (const event of filteredEvents) {
			const title = utils.createTestMessage.unitFailTest(
				event.name,
				"middleware",
				"CLIENT_COOKIE_REQUIRED"
			);

			it(title, async () => {
				const ci = clientInitializer();
				ci.setClient(await clientManager.signClient(""))
					.initClient()
					.connect();
				const socket = ci.getClient();

				await requesterMaker(socket, event as any).emitFull(
					{},
					"CLIENT_COOKIE_REQUIRED"
				);
			});
		}
	}
);
