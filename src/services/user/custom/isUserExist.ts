import { PartialEmptyCellphone } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const isUserExist = serviceBuilder
	.create<
		{
			cellphone: PartialEmptyCellphone;
		},
		{
			isUserExist: boolean;
		}
	>()
	.setBody(async (data) => {
		return {
			isUserExist: !!(await coreServices.find(data.cellphone)),
		};
	})
	.build();
