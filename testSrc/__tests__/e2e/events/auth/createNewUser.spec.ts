import { authHelper } from "@/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("createNewUser"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"createNewUser",
			"should create new user"
		),
		async () => {
			const cellphone = randomMaker.unusedCellphone();
			const fullName = randomMaker.fullName();

			const helper = authHelper(cellphone, fullName);

			await helper.createComplete();
		}
	);
});

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("createNewUser"),
	async () => {
		const cellphone = randomMaker.unusedCellphone();
		const helper = authHelper(cellphone);
		await helper.signIn();
		await helper.verify();
		const requester = utils.requesterCollection.createNewUser(
			helper.getClientSocket()
		);

		return () => {
			const fullName = randomMaker.fullName();
			e2eFailTestInitializerHelper(requester)
				.input(fullName)
				.firstName(fullName)
				.lastName(fullName);
		};
	}
);
