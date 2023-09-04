import { Cellphone } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const isUserExist = serviceBuilder
	.create<
		{
			cellphone: Cellphone;
		},
		boolean
	>()
	.setBody(async (data) => {
		return !!(await coreServices.find(data.cellphone));
	})
	.build();
