import { UserData } from "teletalk-type-store";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("createNewUser", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"createNewUser",
				"service",
				"should successfully create new user"
			),
			async () => {
				const userData: UserData = {
					...userUtils.getDefaultUserData(),
					...randomMaker.unusedContact(),
				};

				await services.user.createNewUser({ userData });

				const foundUser = await services.user.findByUserId({
					currentUserId: userData.userId,
				});

				assertion().userData({
					testValue: foundUser,
					equalValue: userData,
				});
			}
		);
	}
);

await utils.generateServiceFailTest(
	"createNewUser",
	"CURRENT_USER_EXIST",
	async () => {
		const userData: UserData = {
			...userUtils.getDefaultUserData(),
			...randomMaker.unusedContact(),
		};

		await services.user.createNewUser({
			userData,
		});

		return {
			userData,
		};
	}
);
