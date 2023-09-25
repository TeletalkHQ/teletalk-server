import { PartialEmptyCellphone, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const isUserExist = serviceBuilder
	.create<
		{
			cellphone: PartialEmptyCellphone;
		},
		{
			isUserExist: boolean;
			userId?: UserId;
		}
	>()
	.setBody(async (data) => {
		const user = await coreServices.find(data.cellphone);

		return {
			isUserExist: !!user,
			userId: user?.userId,
		};
	})
	.build();
