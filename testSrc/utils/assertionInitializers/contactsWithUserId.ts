import chai from "chai";
import { FullNameWithUserId } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

import { oneContactWithUserIdAssertionInitializer } from "./oneContactWithUserId";

export const contactsWithUserIdAssertionInitializer: AssertionInitializer<
	FullNameWithUserId[]
> = ({ equalValue, testValue }, options) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

	testValue.forEach((item) => {
		oneContactWithUserIdAssertionInitializer(
			{
				testValue: item,
			},
			{ ...options, stringEquality: false }
		);
	});

	if (options?.stringEquality) {
		chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
		chai.expect(testValue.length).to.be.equal(equalValue!.length);

		equalValue!.forEach((item) => {
			const foundContact = testValue.find((c) => c.userId === item.userId);

			chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

			oneContactWithUserIdAssertionInitializer(
				{
					equalValue: item,
					testValue: foundContact!,
				},
				options
			);
		});
	}
};
