import { ContactItem } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("getContacts", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest("getContacts", "service"),
			async () => {
				const { sessionId } = await randomMaker.serviceUser();

				const addingContacts: ContactItem[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					const item: ContactItem = {
						...extractor.cellphone(targetUser),
						...randomMaker.fullName(),
						userId: targetUser.userId,
					};

					await services.user.addContactWithCellphone({
						addingContact: item,
						currentSessionId: sessionId,
						targetUserCellphone: extractor.cellphone(item),
					});

					addingContacts.push(item);

					const { contacts: contactsFromService } =
						await services.user.getContacts({
							currentSessionId: sessionId,
						});

					assertion().contacts({
						testValue: contactsFromService,
						equalValue: addingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("getContacts", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomMaker.sessionId(),
});
