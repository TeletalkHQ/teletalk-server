import chai from "chai";

import { PrivateChats } from "~/types/datatypes";

import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

export const privateChatsAssertionInitializer: AssertionInitializer<
	PrivateChats
> = ({ testValue }) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

	//TODO: add all parts

	// if (options?.stringEquality) {
	// 	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);
	// 	chai.expect(testValue.length).to.be.equal(equalValue!.length);

	// 	equalValue!.forEach((item) => {
	// 		const foundPV = testValue.find((c) => c.chatId === item.chatId);

	// 		chai.expect(foundPV).to.be.an(FIELD_TYPE.OBJECT);

	// 		chatIdAssertionInitializer({
	// 			testValue: item.chatId,
	// 			equalValue: foundPV?.chatId,
	// 		});

	// 		// messageTextAssertionInitializer({ testValue:item.messages, equalValue });
	// 	});
	// }
};
