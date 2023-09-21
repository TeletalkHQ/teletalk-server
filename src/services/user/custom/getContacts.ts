import { Contacts, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const getContacts = serviceBuilder
	.create<
		{
			currentUserId: UserId;
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
		return {
			contacts: data.currentUser.contacts,
		};
	})
	.build();
