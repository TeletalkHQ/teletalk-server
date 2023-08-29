import { errorThrower, extractor } from "utility-store";
import {
	ContactItem,
	FullName,
	UserData,
	UserId,
} from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";
import { HydratedUser } from "~/types/model";

import { findOneUser } from "./findOneUser";

export const updateContact: UserService<
	{
		currentUserId: UserId;
		editValues: FullName;
		targetUserId: UserId;
	},
	void
> = async (data) => {
	const currentUser = (await findCurrentUser(data.currentUserId))!;

	const { index, contact: oldContact } = findContact(
		currentUser.contacts,
		data.targetUserId
	);

	errorThrower(index < 0, {
		...errorStore.find("CONTACT_ITEM_NOT_EXIST"),
		editValues: data.editValues,
	});

	const updatedContact: ContactItem = {
		...extractor.cellphone(oldContact),
		...data.editValues,
		userId: data.targetUserId,
	};

	await saveContact(currentUser, updatedContact, index);
};

const findCurrentUser = async (currentUserId: string) => {
	const result = await findOneUser({
		userId: currentUserId,
	});
	if (!result) throw errorStore.find("CURRENT_USER_NOT_EXIST");
	return result;
};

const findContact = (contacts: UserData["contacts"], targetUserId: string) => {
	const index = contacts.findIndex((c) => c.userId === targetUserId);

	return {
		contact: contacts[index],
		index,
	};
};

const saveContact = async (
	currentUser: HydratedUser,
	updatedContact: ContactItem,
	index: number
) => {
	currentUser.contacts.splice(index, 1, updatedContact);
	await currentUser.save();
};
