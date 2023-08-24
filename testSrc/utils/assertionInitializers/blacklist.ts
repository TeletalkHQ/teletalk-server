import chai from "chai";
import { BlackList } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { userIdAssertionInitializer } from "@/utils/assertionInitializers/userId";
import { FIELD_TYPE } from "@/variables";

export const blacklistAssertionInitializer: AssertionInitializer<BlackList> = (
	{ equalValue, testValue },
	options
) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

	testValue.forEach((item) => {
		userIdAssertionInitializer(
			{
				testValue: item.userId,
			},
			{ ...options, stringEquality: false }
		);
	});

	if (options?.stringEquality) {
		chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
		chai.expect(testValue.length).to.be.equal(equalValue!.length);

		equalValue!.forEach((item) => {
			const foundBlacklist = testValue.find((i) => i.userId === item.userId);

			chai.expect(foundBlacklist).to.be.an(FIELD_TYPE.OBJECT);

			userIdAssertionInitializer(
				{
					equalValue: item.userId,
					testValue: foundBlacklist!.userId,
				},
				options
			);
		});
	}
};
