import { SessionId, UserData } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types";

export const findBySessionId = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
		},
		{
			user: UserData;
		},
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody((data) => {
		return {
			user: extractor.userData(data.currentUser),
		};
	})
	.build();
