import { UserData } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.createNewUser.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"createNewUser",
			"should successfully create new user"
		),
		async () => {
			const userData: UserData = {
				...userUtils.getDefaultUserData(),
				...randomMaker.unusedContact(),
			};

			await services.createNewUser({ userData });

			const foundUser = (await services.findOneUser({
				userId: userData.userId,
			}))!;

			assertionInitializerHelper().userData({
				testValue: foundUser,
				equalValue: userData,
			});
		}
	);
});

describe(`${services.createNewUser.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest("createNewUser", "CURRENT_USER_EXIST"),
		async () => {
			await utils.expectToFail_async(async () => {
				const userData = {
					...userUtils.getDefaultUserData(),
					...randomMaker.unusedContact(),
				};

				await services.createNewUser({
					userData,
				});

				await services.createNewUser({
					userData,
				});
			}, "CURRENT_USER_EXIST");
		}
	);
});
