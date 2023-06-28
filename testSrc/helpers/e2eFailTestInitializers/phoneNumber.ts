import { models } from "~/models";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { E2eFailTestInitializer } from "@/types";

const phoneNumberE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data,
  ignores
) => {
  const initializer = e2eFailTestInitializer.create(
    configuredRequester,
    data,
    models.native.phoneNumber,
    "phoneNumber"
  );

  initializer
    .missing()
    .overload()
    .invalidType()
    .numeric()
    .minLength()
    .maxLength();

  if (!ignores?.includes("empty")) {
    initializer.empty();
  }
};

export { phoneNumberE2eFailTestInitializer };
