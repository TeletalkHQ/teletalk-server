import chai from "chai";
import { isDataHasEqualityWithTargetCellphone } from "utility-store";

import { ContactItemWithCellphone } from "~/types/datatypes";

import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

import { oneContactWithCellphoneAssertionInitializer } from "./oneContactWithCellphone";

export const contactsWithCellphoneAssertionInitializer: AssertionInitializer<
	ContactItemWithCellphone[]
> = ({ equalValue, testValue }, options) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

	testValue.forEach((item) => {
		oneContactWithCellphoneAssertionInitializer(
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
			const foundContact = testValue.find((c) =>
				isDataHasEqualityWithTargetCellphone(item, c)
			);

			chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

			oneContactWithCellphoneAssertionInitializer(
				{
					equalValue: item,
					testValue: foundContact!,
				},
				options
			);
		});
	}
};
