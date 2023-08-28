import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.logout.name} success tests`, () => {
	it("should successfully logout and remove the specific client for it", async () => {
		const { user: currentUser, socket } = await randomMaker.user();

		const length = 10;

		const sockets = await randomMaker.sockets(
			length,
			extractor.cellphone(currentUser)
		);

		const randomizedClients = sockets.map((item) => ({
			clientId: item.socket.clientId,
		}));
		randomizedClients.push({
			clientId: socket.clientId,
		});

		for (const item of [...randomizedClients]) {
			await services.logout({
				clientId: item.clientId,
				userId: currentUser.userId,
			});

			randomizedClients.shift();

			const { clients } = (await services.findOneUser({
				userId: currentUser.userId,
			}))!;

			assertionInitializerHelper().clients({
				testValue: randomizedClients,
				equalValue: clients,
			});
		}
	});
});

describe(`${services.logout.name} fail tests`, () => {
	it(utils.createUnitFailTestMessage("CURRENT_USER_NOT_EXIST"), async () => {
		await utils.expectToFail_async(async () => {
			await services.logout({
				userId: randomMaker.userId(),
				clientId: randomMaker.clientId(),
			});
		}, "CURRENT_USER_NOT_EXIST");
	});
});
