import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

const userModels = models.native.user;

const firstNameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, userModels.firstName, "firstName")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minlength()
    .maxlength();
};

export { firstNameE2eFailTestInitializer };
