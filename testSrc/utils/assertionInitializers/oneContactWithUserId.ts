import { FullNameWithUserId } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";

import { fullNameAssertionInitializer } from "./fullName";
import { userIdAssertionInitializer } from "./userId";

export const oneContactWithUserIdAssertionInitializer: AssertionInitializer<
	FullNameWithUserId
> = ({ equalValue, testValue }, options) => {
	fullNameAssertionInitializer(
		{
			equalValue,
			testValue,
		},
		options
	);

	userIdAssertionInitializer(
		{
			equalValue: equalValue?.userId,
			testValue: testValue.userId,
		},
		options
	);
};
