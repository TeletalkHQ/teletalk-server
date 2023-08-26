import { Contacts } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";

import { findOneUser } from "./findOneUser";

export const getContacts: UserService<
	{
		userId: string;
	},
	Contacts
> = async (data) => {
	const currentUser = await findOneUser({
		userId: data.userId,
	});
	if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	return currentUser.contacts;
};
