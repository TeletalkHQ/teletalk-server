import { ContactItem, Contacts, FullName, UserId } from "teletalk-type-store";
import { errorThrower, extractor } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const updateContact = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			editValues: FullName;
			targetUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		const { index, contact: oldContact } = findContact(
			data.currentUser.contacts,
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

		await saveContact(data.currentUser, updatedContact, index);
	})
	.build();

const findContact = (contacts: Contacts, targetUserId: string) => {
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
