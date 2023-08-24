import { Cellphone } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { countryCodeAssertionInitializer } from "@/utils/assertionInitializers/countryCode";
import { countryNameAssertionInitializer } from "@/utils/assertionInitializers/countryName";
import { phoneNumberAssertionInitializer } from "@/utils/assertionInitializers/phoneNumber";

export const cellphoneAssertionInitializer: AssertionInitializer<Cellphone> = (
	{ equalValue, testValue },
	options
) => {
	countryCodeAssertionInitializer(
		{
			equalValue: equalValue?.countryCode,
			testValue: testValue.countryCode,
		},
		options
	);
	countryNameAssertionInitializer(
		{
			equalValue: equalValue?.countryName,
			testValue: testValue.countryName,
		},
		options
	);
	phoneNumberAssertionInitializer(
		{
			equalValue: equalValue?.phoneNumber,
			testValue: testValue.phoneNumber,
		},
		options
	);
};
