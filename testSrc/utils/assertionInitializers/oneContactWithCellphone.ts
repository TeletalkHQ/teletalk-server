import { ContactItemWithCellphone } from "~/types/datatypes";

import { AssertionInitializer } from "@/types";

import { cellphoneAssertionInitializer } from "./cellphone";
import { fullNameAssertionInitializer } from "./fullName";

export const oneContactWithCellphoneAssertionInitializer: AssertionInitializer<
	ContactItemWithCellphone
> = ({ equalValue, testValue }, options) => {
	fullNameAssertionInitializer(
		{
			equalValue,
			testValue,
		},
		options
	);

	cellphoneAssertionInitializer(
		{
			equalValue,
			testValue,
		},
		options
	);
};
