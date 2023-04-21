import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

const lastNameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.lastName, "lastName")
    .missing();
  // .overload()
  // .invalidType()
  // .maxlength()
  // .minlength();
};

export { lastNameE2eFailTestInitializer };
