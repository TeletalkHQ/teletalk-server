import { Cellphone } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const isUserExist = serviceBuilder
	.create<
		{
			cellphone: Cellphone;
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
