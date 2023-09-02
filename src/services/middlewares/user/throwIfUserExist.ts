import { Cellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { coreServices } from "~/services/user/core";
import { UserId } from "~/types/datatypes";

export const throwIfUserExist = async (
	data: Cellphone | { userId: UserId }
) => {
	const user = await coreServices.find(data);
	if (user) errorStore.find("USER_EXIST");
};
