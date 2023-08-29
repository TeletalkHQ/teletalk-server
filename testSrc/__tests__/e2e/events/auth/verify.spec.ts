import chai from "chai";

import { models } from "~/models";

import { authHelper } from "@/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("verify"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"verify",
			"should sign and verify as new user"
		),
		async () => {
			const cellphone = randomMaker.unusedCellphone();
			const fullName = randomMaker.fullName();

			const helper = authHelper(cellphone, fullName);
			await helper.signIn();
			await helper.verify();
			chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(true);
		}
	);

	it(
		utils.createTestMessage.e2eSuccessTest(
			"verify",
			"should verify as existing user"
		),
		async () => {
			const cellphone = randomMaker.unusedCellphone();
			const fullName = randomMaker.fullName();
			await authHelper(cellphone, fullName).createComplete();

			const helper = authHelper(cellphone, fullName);
			await helper.signIn();
			await helper.verify();
			chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(false);
		}
	);
});

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("verify"),
	async () => {
		const cellphone = randomMaker.unusedCellphone();
		const helper = authHelper(cellphone);
		await helper.signIn();

		return () => {
			const requester = utils.requesterCollection.verify(
				helper.getClientSocket()
			);

			const data = {
				verificationCode: randomMaker.string(
					models.native.verificationCode.length
				),
			};

			e2eFailTestInitializerHelper(requester)
				.input(data)
				.verificationCode(data);
		};
	}
);
