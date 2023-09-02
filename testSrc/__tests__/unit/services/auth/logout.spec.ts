import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("logout", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"logout",
				"service",
				"should logout and remove the specific client"
			),
			async () => {
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
					await services.user.logout({
						clientId: item.clientId,
						currentUserId: currentUser.userId,
					});

					randomizedClients.shift();

					const { clients } = await services.user.findByUserId({
						currentUserId: currentUser.userId,
					});

					assertionInitializerHelper().clients({
						testValue: randomizedClients,
						equalValue: clients,
					});
				}
			}
		);
	}
);

describe(utils.createTestMessage.unitFailDescribe("logout", "service"), () => {
	it(
		utils.createTestMessage.unitFailTest(
			"logout",
			"service",
			"CURRENT_USER_NOT_EXIST"
		),
		async () => {
			await utils.expectToFail_async(async () => {
				await services.user.logout({
					currentUserId: randomMaker.userId(),
					clientId: randomMaker.clientId(),
				});
			}, "CURRENT_USER_NOT_EXIST");
		}
	);
});
