import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

const userModels = models.native.user;

const userIdE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, userModels.userId, "userId")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minlength()
    .maxlength();
};

export { userIdE2eFailTestInitializer };
