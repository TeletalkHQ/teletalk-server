import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

export const countryCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data,
  ignores
) => {
  const initializer = e2eFailTestInitializer.create(
    configuredRequester,
    data,
    models.native.countryCode,
    "countryCode"
  );

  initializer
    .missing()
    .overload()
    .invalidType()
    .numeric()
    .minLength()
    .maxLength(
      randomMaker.stringNumber(models.native.countryCode.maxLength + 1)
    );

  if (!ignores?.includes("empty")) {
    initializer
      .empty()
      .custom(
        helpers.getWrongCountryCode(),
        errorStore.find("COUNTRY_CODE_NOT_SUPPORTED")
      );
  }
};
