import { extractor } from "~/classes/Extractor";
import { ContactItemWithCellphone } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
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

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("addContactWithCellphone", "event"),
	async () => {
		const currentUserCellphone = randomMaker.unusedCellphone();

		const { requester } = await utils.setupRequester(
			utils.requesterCollection.addContactWithCellphone,
			currentUserCellphone
		);

		return () => {
			const { userId, ...data } = randomMaker.unusedContact();

			const selfStuffData: ContactItemWithCellphone = {
				...currentUserCellphone,
				...randomMaker.fullName(),
			};

			e2eFailTestInitializerHelper(requester)
				.input(data)
				.countryCode(data)
				.countryName(data)
				.phoneNumber(data)
				.firstName(data)
				.lastName(data)
				.selfStuff(selfStuffData);
		};
	}
);
