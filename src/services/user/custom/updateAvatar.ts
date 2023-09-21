import { AvatarSrc, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types";

export const updateAvatar = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			avatarSrc: AvatarSrc;
		},
		void,
		{ currentUser: HydratedUser }
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody((data) => {
		data.currentUser.avatarSrc = data.avatarSrc;
		data.currentUser.save();
	})
	.build();
