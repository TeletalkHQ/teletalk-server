import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";
import { randomMaker } from "$/classes/RandomMaker";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const userModels = models.native.user;

const countryCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, userModels.countryCode, "countryCode")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .minlength()
    .maxlength(
      randomMaker.stringNumber(userModels.countryCode.maxlength.value + 1)
    )
    .custom(utilities.getWrongCountryCode(), errors.COUNTRY_CODE_NOT_SUPPORTED);
};

export { countryCodeE2eFailTestInitializer };
