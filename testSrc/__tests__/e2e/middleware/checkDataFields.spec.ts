import { EventName } from "~/types";

import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";
import { eventsWithoutDisconnect } from "@/websocket/events";

await utils.asyncDescribe(
	utils.createTestMessage.unitFailDescribe("checkDataFields", "middleware"),
	async () => {
		const { socket } = await randomMaker.user();

		const eventsWithInputFields = eventsWithoutDisconnect.filter(
			(i) => Object.keys(i.inputFields).length
		);

		const eventsWithInputFieldsExceptAuth = eventsWithInputFields.filter(
			(i) =>
				!(["signIn", "verify", "createNewUser"] as EventName[]).includes(i.name)
		);

		return () => {
			for (const event of eventsWithInputFieldsExceptAuth) {
				const title = utils.createTestMessage.unitFailTest(
					event.name,
					"middleware",
					"INPUT_FIELDS_MISSING"
				);

				it(title, async () => {
					await requesterMaker(socket, event as any)
						.setError("INPUT_FIELDS_MISSING")
						.setOptions({ shouldFilterRequestData: false })
						.emitFull();
				});
			}

			for (const event of eventsWithoutDisconnect) {
				const title = utils.createTestMessage.unitFailTest(
					event.name,
					"middleware",
					"INPUT_FIELDS_OVERLOAD"
				);

				it(title, async () => {
					await requesterMaker(socket, event as any)
						.setError("INPUT_FIELDS_OVERLOAD")
						.setOptions({ shouldFilterRequestData: false })
						.emitFull({
							...utils.generateDynamicData(event.inputFields),
							[randomMaker.string(10)]: randomMaker.string(10),
						});
				});
			}
		};
	}
);
