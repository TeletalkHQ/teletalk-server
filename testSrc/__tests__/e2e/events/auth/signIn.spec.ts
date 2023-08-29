import { extractor } from "~/classes/Extractor";

import { authHelper } from "@/classes/AuthHelper";
import { clientInitializer } from "@/classes/ClientInitializer";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("signIn"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest("signIn", "should sign as new user"),
		async () => {
			const cellphone = randomMaker.unusedCellphone();
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);

	it(
		utils.createTestMessage.e2eSuccessTest(
			"signIn",
			"should sign as existed user"
		),
		async () => {
			const { user } = await randomMaker.user();
			const cellphone = extractor.cellphone(user);
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);
});

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("signIn"),
	async () => {
		const signInCellphone = randomMaker.unusedCellphone();
		const clientSocket = (
			await clientInitializer().createComplete()
		).getClient();
		const requester = utils.requesterCollection.signIn(clientSocket);

		return () => {
			e2eFailTestInitializerHelper(requester)
				.input(signInCellphone)
				.countryCode(signInCellphone)
				.countryName(signInCellphone)
				.phoneNumber(signInCellphone);
		};
	}
);
