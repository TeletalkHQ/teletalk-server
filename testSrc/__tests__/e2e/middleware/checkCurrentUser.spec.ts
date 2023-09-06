import { authClientStore } from "~/classes/AuthClientStore";
import { models } from "~/models";
import { StoredClient } from "~/types";

import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";
import { eventsWithAuth } from "@/websocket/events";

const filteredEvents = eventsWithAuth.filter(
	(i) => i.name !== "verify" && i.name !== "createNewUser"
);

describe(
	utils.createTestMessage.unitFailDescribe("checkCurrentUser", "middleware"),
	() => {
		for (const event of filteredEvents) {
			it(
				utils.createTestMessage.unitFailTest(
					event.name,
					"middleware",
					"CURRENT_USER_NOT_EXIST"
				),
				async () => {
					const wrongUserId = randomMaker.string(
						models.native.userId.maxLength
					);

					const { socket } = await randomMaker.user();

					const client = (await authClientStore.find(
						socket.clientId
					)) as StoredClient;
					await authClientStore.update(socket.clientId, {
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
	}
);
