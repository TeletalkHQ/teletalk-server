import { extractor } from "~/classes/Extractor";

import { authHelper } from "@/classes/AuthHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("signIn", "event"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"signIn",
			"event",
			"should sign as new user"
		),
		async () => {
			const cellphone = randomMaker.unusedCellphone();
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);

	it(
		utils.createTestMessage.e2eSuccessTest(
			"signIn",
			"event",
			"should sign as existed user"
		),
		async () => {
			const { user } = await randomMaker.e2eUser();
			const cellphone = extractor.cellphone(user);
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);
});
