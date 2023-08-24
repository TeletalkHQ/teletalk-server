import { ContactItem } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";

import { cellphoneAssertionInitializer } from "./cellphone";
import { fullNameAssertionInitializer } from "./fullName";
import { userIdAssertionInitializer } from "./userId";

export const oneContactAssertionInitializer: AssertionInitializer<
	ContactItem
> = ({ equalValue, testValue }, options) => {
	fullNameAssertionInitializer({ equalValue, testValue }, options);

	cellphoneAssertionInitializer(
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
