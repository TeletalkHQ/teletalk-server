import chai from "chai";

import { eventsWithoutAuthAndDisconnect } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";
import { eventsWithAuth } from "@/websocket/events";

describe(
	utils.createTestMessage.unitFailDescribe("checkClient", "middleware"),
	() => {
		for (const event of eventsWithoutAuthAndDisconnect) {
			it(
				utils.createTestMessage.unitSuccessTest(
					"checkClient",
					"middleware",
					"should not get error: CLIENT_NOT_FOUND"
				),
				async () => {
					const socket = (
						await clientInitializer().createComplete()
					).getClient();
					const response = (
						await requesterMaker(socket, event as any).sendRequest()
					).getResponse();

					const error = response.errors?.find(
						(i) => i.reason === "CLIENT_NOT_FOUND"
					);
					chai.expect(!!error?.reason).to.be.equal(false);
				}
			);
		}

		for (const event of eventsWithAuth) {
			const title = utils.createTestMessage.unitFailTest(
				event.name,
				"middleware",
				"CLIENT_NOT_FOUND"
			);

			it(title, async () => {
				const socket = (await clientInitializer().createComplete()).getClient();
				await requesterMaker(socket, event as any)
					.setOptions({ shouldFilterRequestData: false })
					.setError("CLIENT_NOT_FOUND")
					.sendFullFeaturedRequest();
			});
		}
	}
);
