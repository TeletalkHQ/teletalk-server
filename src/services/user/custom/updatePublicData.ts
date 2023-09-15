import { UserId } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { UserPublicData } from "~/types/datatypes";
import { HydratedUser } from "~/types/model";

export const updatePublicData = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			updateProperties: Partial<UserPublicData>;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		await data.currentUser.updateOne(data.updateProperties);
	})
	.build();
