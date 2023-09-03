import { extractor } from "~/classes/Extractor";
import { ContactItemWithCellphone } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe(
		"addContactWithCellphone",
		"event"
	),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"addContactWithCellphone",
				"event",
				"should add users to contacts"
			),
			async () => {
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const sendingData: ContactItemWithCellphone = {
					...extractor.cellphone(targetUser),
					...randomMaker.fullName(),
				};

				const {
					data: { newContact },
				} = await utils.requesterCollection
					.addContactWithCellphone(socket)
					.sendFullFeaturedRequest(sendingData);

				assertionInitializerHelper().oneContact({
					testValue: newContact,
					equalValue: { ...sendingData, userId: targetUser.userId },
				});
			}
		);
	}
);
