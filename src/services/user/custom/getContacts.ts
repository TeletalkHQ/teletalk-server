import { Contacts } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/model";

export const getContacts = serviceBuilder
	.create<
		{
			currentUserId: UserId;
		},
		Contacts,
		{ currentUser: HydratedUser }
	>()
	.setMiddlewares([serviceMiddlewares.findCurrentUser])
	.setBody(async (data) => {
		return data.currentUser.contacts;
	})
	.build();
