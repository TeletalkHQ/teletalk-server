import { UserData } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { UserId } from "~/types/datatypes";
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
	.setMiddlewares([serviceMiddlewares.findCurrentUser])
	.setBody((data) => {
		return extractor.userData(data.currentUser);
	})
	.build();
