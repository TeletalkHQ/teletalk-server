import { Sender } from "~/types/datatypes";

import { AssertionInitializer } from "@/types";

import { senderIdAssertionInitializer } from "./senderId";

export const senderAssertionInitializer: AssertionInitializer<Sender> = (
	{ equalValue, testValue },
	options
) => {
	senderIdAssertionInitializer(
		{
			testValue: testValue.senderId,
			equalValue: equalValue?.senderId,
		},
		options
	);
};
