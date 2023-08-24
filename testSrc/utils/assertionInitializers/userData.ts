import { UserData } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { bioAssertionInitializer } from "@/utils/assertionInitializers/bio";
import { blacklistAssertionInitializer } from "@/utils/assertionInitializers/blacklist";
import { cellphoneAssertionInitializer } from "@/utils/assertionInitializers/cellphone";
import { contactsAssertionInitializer } from "@/utils/assertionInitializers/contacts";
import { fullNameAssertionInitializer } from "@/utils/assertionInitializers/fullName";
import { userIdAssertionInitializer } from "@/utils/assertionInitializers/userId";
import { usernameAssertionInitializer } from "@/utils/assertionInitializers/username";

export const userDataAssertionInitializer: AssertionInitializer<UserData> = (
	{ equalValue, testValue },
	options
) => {
	bioAssertionInitializer(
		{
			equalValue: equalValue?.bio,
			testValue: testValue.bio,
		},
		options
	);

	blacklistAssertionInitializer(
		{
			equalValue: equalValue?.blacklist,
			testValue: testValue.blacklist,
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

	contactsAssertionInitializer(
		{
			equalValue: equalValue?.contacts,
			testValue: testValue.contacts,
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
			equalValue: equalValue?.userId,
			testValue: testValue.userId,
		},
		options
	);

	usernameAssertionInitializer(
		{
			equalValue: equalValue?.username,
			testValue: testValue.username,
		},
		options
	);
};
