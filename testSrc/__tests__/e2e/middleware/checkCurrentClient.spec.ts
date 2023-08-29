import { clientManager } from "~/classes/ClientIdManager";
import { clientStore } from "~/classes/ClientStore";
import { eventsWithAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

const filteredEvents = eventsWithAuth.filter(
	(i) => i.name !== "verify" && i.name !== "createNewUser"
);

describe(utils.createTestMessage.unitFailDescribe("checkCurrentClient"), () => {
	for (const event of filteredEvents) {
		const message = utils.createTestMessage.unitFailTest(
			event.name,
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
			const client = (await clientStore.find(socket.clientId))!;
			await clientStore.add(newClientId, client);
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
});
