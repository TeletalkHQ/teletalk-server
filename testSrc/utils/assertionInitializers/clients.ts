import chai from "chai";
import { Clients } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

import { clientIdAssertionInitializer } from "./clientId";

export const clientsAssertionInitializer: AssertionInitializer<Clients> = (
	{ equalValue, testValue },
	options
) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

	testValue.forEach((item) => {
		clientIdAssertionInitializer(
			{
				testValue: item.clientId,
			},
			{ ...options, stringEquality: false }
		);
	});

	if (options?.stringEquality) {
		chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
		chai.expect(testValue.length).to.be.equal(equalValue!.length);

		equalValue!.forEach((item) => {
			const foundClient = testValue.find((i) => i.clientId === item.clientId);

			chai.expect(foundClient).to.be.an(FIELD_TYPE.OBJECT);

			clientIdAssertionInitializer(
				{
					equalValue: item.clientId,
					testValue: foundClient!.clientId,
				},
				options
			);
		});
	}
};
