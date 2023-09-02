import { UserId } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
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
		UserPublicData,
		{ currentUser: HydratedUser }
	>()
	.setMiddlewares([serviceMiddlewares.findCurrentUser])
	.setBody(async (data) => {
		const oldPublicData = extractor.userPublicData(data.currentUser);

		await data.currentUser.updateOne(data.updateProperties);

		return extractor.userPublicData({
			...oldPublicData,
			...data.updateProperties,
		});
	})
	.build();
