import chai from "chai";
import { Contacts } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { oneContactAssertionInitializer } from "@/utils/assertionInitializers/oneContact";
import { FIELD_TYPE } from "@/variables";

export const contactsAssertionInitializer: AssertionInitializer<Contacts> = (
	{ equalValue, testValue },
	options
) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

	testValue.forEach((item) => {
		oneContactAssertionInitializer({
			testValue: item,
		});
	}, options);

	if (options?.stringEquality) {
		chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);
		chai.expect(testValue.length).to.be.equal(equalValue!.length);

		equalValue!.forEach((item) => {
			const foundContact = testValue.find((c) => c.userId === item.userId);

			chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

			oneContactAssertionInitializer({
				equalValue: item,
				testValue: foundContact!,
			});
		}, options);
	}
};
