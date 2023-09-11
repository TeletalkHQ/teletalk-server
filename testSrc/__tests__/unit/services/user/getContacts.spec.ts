import { ContactItem } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("getContacts", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest("getContacts", "service"),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const addingContacts: ContactItem[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.batchUsers(length));

				for (const { user: targetUser } of users) {
					const item: ContactItem = {
						...extractor.cellphone(targetUser),
						...randomMaker.fullName(),
						userId: targetUser.userId,
					};

					await services.user.addContactWithCellphone({
						addingContact: item,
						currentUserId: currentUser.userId,
						targetUserCellphone: extractor.cellphone(item),
					});

					addingContacts.push(item);

					const { contacts: contactsFromService } =
						await services.user.getContacts({
							currentUserId: currentUser.userId,
						});

					assertionInitializerHelper().contacts({
						testValue: contactsFromService,
						equalValue: addingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("getContacts", "CURRENT_USER_NOT_EXIST", {
	currentUserId: randomMaker.userId(),
});
