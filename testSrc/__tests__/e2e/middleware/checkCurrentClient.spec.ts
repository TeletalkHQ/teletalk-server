import { authClientStore } from "~/classes/AuthClientStore";
import { clientManager } from "~/classes/ClientIdManager";
import { StoredClient } from "~/types";

import { clientInitializer } from "@/classes/ClientInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";
import { eventsWithAuth } from "@/websocket/events";

const filteredEvents = eventsWithAuth.filter(
	(i) => i.name !== "verify" && i.name !== "createNewUser"
);

describe(
	utils.createTestMessage.unitFailDescribe("checkCurrentClient", "middleware"),
	() => {
		for (const event of filteredEvents) {
			const message = utils.createTestMessage.unitFailTest(
				event.name,
				"middleware",
				"CURRENT_CLIENT_NOT_EXIST"
			);

			it(message, async () => {
				const { socket } = await randomMaker.user();
				const newAuthClient = await clientManager.signClient();
				const {
					payload: { clientId: newClientId },
				} = await clientManager.verifyClient(newAuthClient);
				const ci = clientInitializer();
				ci.setClient(newAuthClient).makeClientCookie().initClient().connect();
				const client = (await authClientStore.find(
					socket.clientId
				)) as StoredClient;
				await authClientStore.add(newClientId, client);
				// const data = utils.generateDynamicData(event.inputFields);
				//FIXME: Something bad happening and i don't know what it is
				// await utils.requesterCollection[event.name](
				//   ci.getClient()
				// ).sendFullFeaturedRequest(
				//   data as any,
				//   errorStore.find("CURRENT_CLIENT_NOT_EXIST")
				// );
			});
		}
	}
);
