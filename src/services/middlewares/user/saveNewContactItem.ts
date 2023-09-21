import { ContactItem } from "teletalk-type-store";

import { ServiceMiddleware } from "~/types";
import { HydratedUser } from "~/types/model";

export const saveNewContactItem: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		newContact: ContactItem;
	},
	void
> = async (data) => {
	data.currentUser.contacts.push(data.newContact);
	await data.currentUser.save();
};
