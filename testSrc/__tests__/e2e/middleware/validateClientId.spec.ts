import { randomMaker } from "utility-store";

import { clientManager } from "~/classes/ClientIdManager";
import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { NativeError, SocketEvent } from "~/types";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

const filteredEvents = events.filter(
	(i) => !["getStuff", "ping"].includes(i.name)
);

describe("validateClientId fail tests", () => {
	const caller = async (
		event: SocketEvent,
		error: NativeError,
		clientStr: unknown
	) => {
		const ci = clientInitializer();
		ci.setClient(clientStr).makeClientCookie().initClient().connect();

		await requesterMaker(ci.getClient(), event).sendFullFeaturedRequest(
			{},
			error
		);
	};

	for (const event of filteredEvents) {
		const title = utils.createFailTestMessage(
			errorStore.find("CLIENT_ID_MAX_LENGTH_ERROR"),
			event.name
		);
		it(title, async () => {
			await caller(
				event,
				errorStore.find("CLIENT_ID_MAX_LENGTH_ERROR"),
				await clientManager.signClient(
					randomMaker.string(models.native.clientId.maxLength + 1)
				)
			);
		});
	}

	for (const event of filteredEvents) {
		const title = utils.createFailTestMessage(
			errorStore.find("CLIENT_ID_MIN_LENGTH_ERROR"),
			event.name
		);
		it(title, async () => {
			await caller(
				event,
				errorStore.find("CLIENT_ID_MIN_LENGTH_ERROR"),
				await clientManager.signClient(
					randomMaker.string(models.native.clientId.minLength - 1)
				)
			);
		});
	}
});
