import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "~/models";

import { E2eFailTestInitializer } from "$/types";

const userIdE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.userId, "userId")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minLength()
    .maxLength();
};

export { userIdE2eFailTestInitializer };
