import { models } from "~/models";
import { errors } from "~/variables";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

const countryCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.countryCode, "countryCode")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .minLength()
    .maxLength(
      randomMaker.stringNumber(models.native.countryCode.maxLength + 1)
    )
    .custom(helpers.getWrongCountryCode(), errors.countryCodeNotSupported);
};

export { countryCodeE2eFailTestInitializer };
