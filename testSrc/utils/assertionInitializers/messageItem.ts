import chai from "chai";

import { MessageItem } from "~/types/datatypes";

import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

import { messageIdAssertionInitializer } from "./messageId";
import { messageTextAssertionInitializer } from "./messageText";
import { senderAssertionInitializer } from "./sender";

export const messageItemAssertionInitializer: AssertionInitializer<
	MessageItem
> = ({ equalValue, testValue }, options) => {
	chai.expect(testValue).to.be.an(FIELD_TYPE.OBJECT);

	messageIdAssertionInitializer(
		{
			testValue: testValue.messageId,
		},
		options
	);

	messageTextAssertionInitializer(
		{ testValue: testValue.messageText },
		options
	);

	senderAssertionInitializer(
		{
			testValue: testValue.sender,
		},
		options
	);

	if (options.stringEquality) {
		chai.expect(equalValue).to.be.an(FIELD_TYPE.OBJECT);

		messageIdAssertionInitializer(
			{
				equalValue: equalValue!.messageId,
				testValue: testValue.messageId,
			},
			options
		);

		messageTextAssertionInitializer(
			{
				equalValue: equalValue!.messageText,
				testValue: testValue.messageText,
			},
			options
		);

		senderAssertionInitializer(
			{
				equalValue: equalValue!.sender,
				testValue: testValue.sender,
			},
			options
		);
	}
};
