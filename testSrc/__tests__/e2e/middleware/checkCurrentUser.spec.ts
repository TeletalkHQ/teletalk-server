import { clientStore } from "~/classes/ClientStore";
import { models } from "~/models";
import { eventsWithAuth } from "~/websocket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

const filteredEvents = eventsWithAuth.filter(
	(i) => i.name !== "verify" && i.name !== "createNewUser"
);

describe(utils.createTestMessage.unitFailDescribe("checkCurrentUser"), () => {
	for (const event of filteredEvents) {
		it(
			utils.createTestMessage.unitFailTest(
				event.name,
				"CURRENT_USER_NOT_EXIST"
			),
			async () => {
				const wrongUserId = randomMaker.string(models.native.userId.maxLength);

				const { socket } = await randomMaker.user();

				const client = (await clientStore.find(socket.clientId))!;
				await clientStore.update(socket.clientId, {
					...client,
					userId: wrongUserId,
				});

				const data = utils.generateDynamicData(event.inputFields);
				await utils.requesterCollection[event.name](
					socket
				).sendFullFeaturedRequest(data as any, "CURRENT_USER_NOT_EXIST");
			}
		);
	}
});
