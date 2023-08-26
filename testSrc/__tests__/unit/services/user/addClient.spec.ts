import { Clients, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.addClient.name} success tests`, () => {
	it("should add new client", async () => {
		const { user: currentUser, socket } = await randomMaker.user();

		const length = 10;

		const addingClients: Clients = [
			{
				clientId: socket.clientId,
			},
		];

		for (let i = 0; i < length; i++) {
			const randomClientId = randomMaker.clientId();

			await services.addClient({
				userId: currentUser.userId,
				clientId: randomClientId,
			});

			addingClients.push({
				clientId: randomClientId,
			});

			const { clients } = (await services.findOneUser({
				userId: currentUser.userId,
			})) as UserData;

			assertionInitializerHelper().clients({
				testValue: clients,
				equalValue: addingClients,
			});
		}
	});
});

describe(`${services.addClient.name} fail tests`, () => {
	it(utils.createUnitFailTestMessage("CURRENT_USER_NOT_EXIST"), async () => {
		await utils.expectToFail_async(async () => {
			await services.addClient({
				userId: randomMaker.userId(),
				clientId: randomMaker.userId(),
			});
		}, "CURRENT_USER_NOT_EXIST");
	});
});
