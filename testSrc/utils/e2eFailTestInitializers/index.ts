import { bioE2eFailTestInitializer } from "./bio";
import { chatIdE2eFailTestInitializer } from "./chatId";
import { countryCodeE2eFailTestInitializer } from "./countryCode";
import { countryNameE2eFailTestInitializer } from "./countryName";
import { firstNameE2eFailTestInitializer } from "./firstName";
import { inputE2eFailTestInitializer } from "./input";
import { inputMissingE2eFailTestInitializer } from "./inputMissing";
import { inputOverloadE2eFailTestInitializer } from "./inputOverload";
import { lastNameE2eFailTestInitializer } from "./lastName";
import { messageTextE2eFailTestInitializer } from "./messageText";
import { participantIdE2eFailTestInitializer } from "./participantId";
import { phoneNumberE2eFailTestInitializer } from "./phoneNumber";
import { selfStuffE2eFailTestInitializer } from "./selfStuff";
import { targetParticipantIdIdE2eFailTestInitializer } from "./targetParticipantId";
import { userIdE2eFailTestInitializer } from "./userId";
import { usernameE2eFailTestInitializer } from "./username";
import { verificationCodeE2eFailTestInitializer } from "./verificationCode";

export const e2eFailTestInitializers = {
	bio: bioE2eFailTestInitializer,
	chatId: chatIdE2eFailTestInitializer,
	countryCode: countryCodeE2eFailTestInitializer,
	countryName: countryNameE2eFailTestInitializer,
	firstName: firstNameE2eFailTestInitializer,
	input: inputE2eFailTestInitializer,
	inputMissing: inputMissingE2eFailTestInitializer,
	inputOverload: inputOverloadE2eFailTestInitializer,
	lastName: lastNameE2eFailTestInitializer,
	messageText: messageTextE2eFailTestInitializer,
	participantId: participantIdE2eFailTestInitializer,
	phoneNumber: phoneNumberE2eFailTestInitializer,
	selfStuff: selfStuffE2eFailTestInitializer,
	targetParticipantId: targetParticipantIdIdE2eFailTestInitializer,
	userId: userIdE2eFailTestInitializer,
	username: usernameE2eFailTestInitializer,
	verificationCode: verificationCodeE2eFailTestInitializer,
};
