import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

const userModels = models.native.user;

const phoneNumberE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, userModels.phoneNumber, "phoneNumber")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .minlength()
    .maxlength();
};

export { phoneNumberE2eFailTestInitializer };
