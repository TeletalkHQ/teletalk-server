import { nativeModelBuilder } from "~/classes/NativeModelBuilder";
import { CreatedAt, Id } from "~/types";

export const commonModels = {
	createdAt: nativeModelBuilder
		.create<CreatedAt>()
		.type("number")
		.required(true)
		.empty(false)
		.build(),
	id: nativeModelBuilder
		.create<Id>()
		.type("string")
		.required(true)
		.empty(false)
		.minLength(30)
		.maxLength(35)
		.trim(true)
		.unique(true)
		.build(),
};

export const commonModels2 = {
	createdAt: {
		empty: false,
		required: true,
		type: "number",
	},
	get id() {
		return {
			type: "string",
			required: true,
			empty: false,
			minLength: 30,
			maxLength: 35,
			trim: true,
			unique: true,
		} as const;
	},
	get userId() {
		return this.id;
	},
} as const;
