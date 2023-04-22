import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

const usernameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.username, "username")
    .missing()
    .overload()
    .invalidType()
    .minlength()
    .maxlength();
};

export { usernameE2eFailTestInitializer };
