import { DBUserData, UserId } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const findByUserId = serviceBuilder
	.create<
		{
			targetUserId: UserId;
		},
		DBUserData,
		{
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findTargetUser)
	.setBody((data) => {
		return extractor.dbUserData(data.targetUser);
	})
	.build();
