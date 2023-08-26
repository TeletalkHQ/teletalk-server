import { UserPublicData } from "~/types/datatypes";

import { AssertionInitializer } from "@/types";

import { bioAssertionInitializer } from "./bio";
import { fullNameAssertionInitializer } from "./fullName";
import { userIdAssertionInitializer } from "./userId";
import { usernameAssertionInitializer } from "./username";

export const userPublicDataAssertionInitializer: AssertionInitializer<
	UserPublicData
> = ({ equalValue, testValue }, options) => {
	bioAssertionInitializer(
		{
			testValue: testValue.bio,
			equalValue: equalValue?.bio,
		},
		options
	);

	fullNameAssertionInitializer(
		{
			equalValue,
			testValue,
		},
		options
	);

	userIdAssertionInitializer(
		{
			testValue: testValue.userId,
			equalValue: equalValue?.userId,
		},
		options
	);

	usernameAssertionInitializer(
		{ testValue: testValue.username, equalValue: testValue.username },
		options
	);
};
