import { errorThrower } from "utility-store";
import { UserData } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { UserService } from "~/types";

export const createNewUser: UserService<
	{
		userData: UserData;
	},
	void
> = async (data) => {
	await checkExistenceOfCurrentUser(data.userData.userId);
	await models.database.User.create(data.userData);
};

const checkExistenceOfCurrentUser = async (userId: UserData["userId"]) => {
	const currentUser = await models.database.User.findOne({
		userId,
	});
	errorThrower(currentUser, errorStore.find("CURRENT_USER_EXIST"));
};
