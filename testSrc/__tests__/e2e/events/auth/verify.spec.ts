import chai from "chai";

import { authHelper } from "@/classes/AuthHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("verify", "event"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"verify",
			"event",
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
			"event",
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
