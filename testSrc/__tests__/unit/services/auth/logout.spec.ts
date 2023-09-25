import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("logout", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"logout",
				"service",
				"should logout and remove the specific session"
			),
			async () => {
				const { sessionId, user: currentUser } =
					await randomMaker.serviceUser();

				const length = 10;

				const sessions = await randomMaker.sessions(length, currentUser.userId);

				sessions.push({
					sessionId,
				});

				for (const item of [...sessions]) {
					await services.user.logout({
						currentSessionId: item.sessionId,
					});

					sessions.shift();

					const user = await services.user.findByUserId({
						targetUserId: currentUser.userId,
					});

					assertion().sessions({
						testValue: user.sessions,
						equalValue: sessions,
					});
				}
			}
		);
	}
);

// await utils.generateServiceFailTest("logout", "CURRENT_USER_NOT_EXIST", {
// 	currentSessionId: randomMaker.sessionId(),
// });
