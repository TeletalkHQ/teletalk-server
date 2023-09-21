import { PartialEmptyCellphone, UserData } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { HydratedUser } from "~/types/model";

import { coreServices } from "../core";

export const findByCellphone = serviceBuilder
	.create<
		{
			cellphone: PartialEmptyCellphone;
		},
		UserData,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBody(async (data) => {
		const userData = await coreServices.find(data.cellphone);
		if (!userData) throw errorStore.find("CURRENT_USER_NOT_EXIST");
		return extractor.userData(userData);
	})
	.build();
