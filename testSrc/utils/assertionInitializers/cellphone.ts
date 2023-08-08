import { AssertionInitializer } from '@/types';
import { countryCodeAssertionInitializer } from '@/utils/assertionInitializers/countryCode';
import { countryNameAssertionInitializer } from '@/utils/assertionInitializers/countryName';
import { phoneNumberAssertionInitializer } from '@/utils/assertionInitializers/phoneNumber';

export const cellphoneAssertionInitializer: AssertionInitializer = ({
	equalValue,
	testValue,
}) => {
	countryCodeAssertionInitializer({
		equalValue: equalValue.countryCode,
		testValue: testValue.countryCode,
	});
	countryNameAssertionInitializer({
		equalValue: equalValue.countryName,
		testValue: testValue.countryName,
	});
	phoneNumberAssertionInitializer({
		equalValue: equalValue.phoneNumber,
		testValue: testValue.phoneNumber,
	});
};
