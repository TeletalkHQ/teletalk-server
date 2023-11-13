import { Contacts, SessionId } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { models } from "~/models";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const getContacts = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
		},
		{
			contacts: Contacts;
		},
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		const finalContacts = data.currentUser.contacts
			.filter((item) => item.isCellphoneAccessible === false)
			.map((item) => ({
				firstName: item.firstName,
				lastName: item.lastName,
				userId: item.userId,
				countryCode: "",
				countryName: "",
				phoneNumber: "",
			}));

		const contactsWithAccessToCellphone = data.currentUser.contacts.filter(
			(item) => item.isCellphoneAccessible
		);

		(
			await models.database.User.find({
				userId: {
					$in: contactsWithAccessToCellphone.map((item) => item.userId),
				},
			})
		).forEach((i) => {
			const foundContact = contactsWithAccessToCellphone.find(
				(j) => j.userId === i.userId
			)!;

			finalContacts.push({
				...extractor.cellphone(i),
				userId: i.userId,
				firstName: foundContact.firstName,
				lastName: foundContact.lastName,
			});
		});

		return {
			contacts: finalContacts as Contacts,
		};
	})
	.build();
