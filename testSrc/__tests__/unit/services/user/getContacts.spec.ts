import { ContactItem } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.getContacts.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"getContacts",
			"should add new blacklist item with target user id"
		),
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

				await services.addContactWithCellphone({
					addingContact: item,
					currentUserId: currentUser.userId,
				});

				addingContacts.push(item);

				const contactsFromService = await services.getContacts({
					userId: currentUser.userId,
				});

				assertionInitializerHelper().contacts({
					testValue: contactsFromService,
					equalValue: addingContacts,
				});
			}
		}
	);
});

describe(`${services.getContacts.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest(
			"getContacts",
			"CURRENT_USER_NOT_EXIST"
		),
		async () => {
			await utils.expectToFail_async(async () => {
				await services.getContacts({
					userId: randomMaker.userId(),
				});
			}, "CURRENT_USER_NOT_EXIST");
		}
	);
});
