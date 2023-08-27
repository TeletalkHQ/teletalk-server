import { models } from "~/models";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { E2eFailTestInitializer } from "@/types";

const chatModels = models.native;

export const targetParticipantIdIdE2eFailTestInitializer: E2eFailTestInitializer =
	(configuredRequester, data) => {
		e2eFailTestInitializer(
			configuredRequester,
			data,
			chatModels.targetParticipantId,
			"targetParticipantId"
		)
			.missing()
			.overload()
			.invalidType()
			.empty()
			.minLength()
			.maxLength();
	};
