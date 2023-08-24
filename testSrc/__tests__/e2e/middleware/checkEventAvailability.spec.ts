import chai from "chai";

import { errorStore } from "~/classes/ErrorStore";
import { SocketEvent } from "~/types";
import { events as mainEvents } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { ClientSocket } from "@/types";
import { utils } from "@/utils";
import { events } from "@/websocket/events";

const createRequester = (socket: ClientSocket, event: SocketEvent) =>
	requesterMaker(socket, event);

await utils.asyncDescribe(
	"checkEventAvailability middleware fail test",
	async () => {
		const clientSocket = (
			await clientInitializer().createComplete()
		).getClient();

		return () => {
			const message = utils.createFailTestMessage(
				errorStore.find("EVENT_NOT_FOUND"),
				events.unknownEvent.name
			);

			it(message, async () => {
				await createRequester(clientSocket, events.unknownEvent)
					.setError(errorStore.find("EVENT_NOT_FOUND"))
					.sendFullFeaturedRequest();
			});

			for (const event of mainEvents) {
				const message = utils.createFailTestMessage(
					errorStore.find("EVENT_NOT_FOUND"),
					event.name
				);

				it(message, async () => {
					const requester = createRequester(clientSocket, event);
					await requester.sendRequest();

					const { errors: responseErrors } = requester.getResponse();

					const { reason: expectedReason } = errorStore.find("EVENT_NOT_FOUND");

					const error = responseErrors?.find(
						(i) => i.reason === expectedReason
					);

					chai.expect(!!error?.reason).to.be.equal(false);
				});
			}
		};
	}
);
