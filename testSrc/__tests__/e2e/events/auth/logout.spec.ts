import { authHelper } from "@/classes/AuthHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("logout", "event"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"logout",
			"event",
			"should logout user"
		),
		async () => {
			const cellphone = randomMaker.unusedCellphone();
			const fullName = randomMaker.fullName();
			const ah = authHelper(cellphone, fullName);

			await ah.createComplete();

			await utils.requesterCollection.logout(ah.getClientSocket()).emitFull();
		}
	);
});
