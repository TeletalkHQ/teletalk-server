import { models } from "~/models";
import { Field } from "~/types";
import { events } from "~/websocket/events";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

await utils.asyncDescribe(
	utils.createTestMessage.unitFailDescribe("dynamicValidator", "middleware"),
	async () => {
		const { socket } = await randomMaker.user();

		const eventsWithInputFields = events.filter(
			(i) => Object.keys(i.inputFields).length
		);

		return () => {
			for (const event of eventsWithInputFields) {
				const data = utils.generateDynamicData(event.inputFields) as {
					[key in Field]: any;
				};

				const requester = requesterMaker(socket, event as any).setOptions({
					shouldFilterRequestData: false,
				});

				for (const fieldName in data) {
					const f = fieldName as Field;
					e2eFailTestInitializer(
						requester,
						data,
						models.native[f],
						f
					).automate();
				}
			}
		};
	}
);
