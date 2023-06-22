import { models } from "~/models";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { E2eFailTestInitializer } from "@/types";

const firstNameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.firstName, "firstName")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minLength()
    .maxLength();
};

export { firstNameE2eFailTestInitializer };
