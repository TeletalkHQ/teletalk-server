import { UserData } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

import { coreServices } from "../core";

export const createNewUser = serviceBuilder
	.create<
		{
			userData: UserData;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setMiddlewares([serviceMiddlewares.throwIfUserExist])
	.setBody(async (data) => {
		await coreServices.create({
			userData: data.userData,
		});
	})
	.build();
