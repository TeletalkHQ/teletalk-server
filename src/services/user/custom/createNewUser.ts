import { DBUserData } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

import { coreServices } from "../core";

export const createNewUser = serviceBuilder
	.create<
		DBUserData,
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.throwIfUserExist)
	.setBody(async (data) => {
		await coreServices.create({
			userData: data,
		});
	})
	.build();
