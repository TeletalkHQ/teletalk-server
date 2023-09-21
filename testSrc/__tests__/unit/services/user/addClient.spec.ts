import { Clients, UserData } from "teletalk-type-store";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("addClient", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"addClient",
				"service",
				"should add new client"
			),
			async () => {
				const { user: currentUser, socket } = await randomMaker.user();

				const length = 10;

				const addingClients: Clients = [
					{
						clientId: socket.clientId,
					},
				];

				for (let i = 0; i < length; i++) {
					const randomClientId = randomMaker.clientId();

					await services.user.addClient({
						currentUserId: currentUser.userId,
						clientId: randomClientId,
					});

					addingClients.push({
						clientId: randomClientId,
					});

					const { clients } = (await services.user.findByUserId({
						currentUserId: currentUser.userId,
					})) as UserData;

					assertion().clients({
						testValue: clients,
						equalValue: addingClients,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("addClient", "CURRENT_USER_NOT_EXIST", {
	currentUserId: randomMaker.userId(),
	clientId: randomMaker.userId(),
});
