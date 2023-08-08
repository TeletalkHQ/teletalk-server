import { AssertionInitializer } from '@/types';
import { fullNameAssertionInitializer } from '@/utils/assertionInitializers/fullName';
import { userIdAssertionInitializer } from '@/utils/assertionInitializers/userId';

export const oneContactAssertionInitializer: AssertionInitializer = ({
	equalValue,
	testValue,
}) => {
	fullNameAssertionInitializer({ equalValue, testValue });

	userIdAssertionInitializer({
		equalValue: equalValue.userId,
		testValue: testValue.userId,
	});
};
