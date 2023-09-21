import { UserData, UserId } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const findByUserId = serviceBuilder
	.create<
		{
			currentUserId: UserId;
		},
		UserData,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody((data) => {
		return extractor.userData(data.currentUser);
	})
	.build();
